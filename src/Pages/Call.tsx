import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Typography from '../Components/Typography';
import { SocketError } from '../Utils/Webrtc/SocketError';
import {
  RTCPeerConnection,
  mediaDevices,
  MediaStream,
  RTCSessionDescription,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';
import {
  connectSocket,
  disconnectSocket,
} from '../Utils/Webrtc/socketConnection';
import { getToken } from '../Utils/keychain';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Call'>;

const Call = () => {
  const socketRef = useRef<SocketIOClient.Socket>();
  const peerConnectionRef = useRef<RTCPeerConnection>();
  // const sendChannelRef = useRef<void>();
  const audioStream = useRef<MediaStream>();
  const localUser = useRef<string>();
  const navigation = useNavigation<Props['navigation']>();

  async function getMedia() {
    const sources = await mediaDevices.enumerateDevices();
    const stream = await mediaDevices.getUserMedia({
      audio: true,
    });
    if (stream) {
      audioStream.current = stream;
    }
  }

  useEffect(() => {
    getMedia();
    socketRef.current = connectSocket(socketRef.current);
    // event
    socketRef.current.on(
      'connection',
      async (roomInfo: { roomID: number; roomName: string }) => {
        console.log(
          `Client ${socketRef.current?.id} is connected : ROOM INFO =>`,
          roomInfo,
        );
        if (roomInfo) {
          socketRef.current?.emit('join', {
            accessToken: await getToken('accessToken'),
            roomID: roomInfo.roomID,
            roomName: roomInfo.roomName,
          });
        }
      },
    );

    socketRef.current.on('joined', () => {
      console.log(`Client ${socketRef.current?.id} is joined Room 1`);
    });

    socketRef.current.on('ready', async (readyMsg: string) => {
      console.log(`Client ${socketRef.current?.id} is ${readyMsg}`);
      localUser.current = "I'm offerer";
      makeOffer();
    });

    socketRef.current.on('error', (error: SocketError) => {
      console.log(error);
    });

    socketRef.current.on('offer', handleIncomingOffer);
    socketRef.current.on('answer', handleIncomingAnswer);
  }, []);

  function makeOffer() {
    peerConnectionRef.current = configPeer();
    // sendChannelRef.current =
    //   peerConnectionRef.current.createDataChannel('sendDataChannel');
  }

  function configPeer() {
    const configuration = {
      iceServers: [{ url: 'stun:stun4.l.google.com:19302' }],
    };
    const peerConnection = new RTCPeerConnection(configuration);

    peerConnection.addStream(audioStream.current!);

    peerConnection.onnegotiationneeded = handleNegotiationEvent as any;
    // peerConnection.onicecandidate = handleIceCandidateEvent;

    return peerConnection;
  }

  async function handleNegotiationEvent() {
    if (peerConnectionRef.current && socketRef.current) {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socketRef.current.emit('offer', {
        accessToken: await getToken('accessToken'),
        sdp: peerConnectionRef.current.localDescription.sdp,
        room: {
          roomID: 1,
          roomName: 'room',
        },
      });
    }
  }

  function handleIceCandidateEvent(event: any) {
    // local에서 동작하므로 생략
  }

  async function handleIncomingOffer(sdp: string) {
    if (!localUser.current) {
      const configuration = {
        iceServers: [{ url: 'stun:stun4.l.google.com:19302' }],
      };
      peerConnectionRef.current = new RTCPeerConnection(configuration);
      // sendChannelRef.current = peerRef.current.createDataChannel('sendChannel', {
      //   ordered: true,
      // });
      peerConnectionRef.current.onaddstream = gotRemoteStream;
      const sdpType = { sdp, type: 'offer' } as RTCSessionDescriptionType;
      const desc = new RTCSessionDescription(sdpType);
      await peerConnectionRef.current.setRemoteDescription(desc);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socketRef.current?.emit('answer', {
        accessToken: await getToken('accessToken'),
        sdp: peerConnectionRef.current.localDescription.sdp,
        room: {
          roomID: 1,
          roomName: 'room',
        },
      });
    }
  }

  async function handleIncomingAnswer(sdp: string) {
    if (localUser.current) {
      const sdpType = { sdp, type: 'answer' } as RTCSessionDescriptionType;
      const desc = new RTCSessionDescription(sdpType);
      await peerConnectionRef.current?.setRemoteDescription(desc);
    }
  }

  function gotRemoteStream(event: any) {
    console.log(event.stream);
  }

  function handleDisconnection() {
    disconnectSocket(socketRef.current as SocketIOClient.Socket);
    navigation.reset({ routes: [{ name: 'Home' }] });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Typography
        value="대화 친구를 찾고 있어요"
        type="title"
        textStyle={textStyle.callingText}
      />
      <LottieView
        source={require('../Assets/Lotties/callButton.json')}
        autoPlay
        loop
      />
      <Image
        source={require('../Assets/Images/Call/questionMarkText.png')}
        style={styles.callBtnMark}
      />
      <Pressable style={styles.exitBtnWrap} onPress={handleDisconnection}>
        <Image
          source={require('../Assets/Images/exitDoorBtn.png')}
          style={styles.exitBtn}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default Call;

const textStyle = StyleSheet.create({
  callingText: {
    fontSize: 24,
    marginTop: 115,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  callFriendWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  callBtnMark: {
    width: 34,
    height: 70,
    position: 'absolute',
    top: height / 2 - 35,
    left: width / 2 - 17,
  },
  exitBtnWrap: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  exitBtn: {
    width: 32,
    height: 32,
  },
});
