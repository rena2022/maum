import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { t } from 'i18next';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import { RootStackParamList } from '../../App';
import Typography from '../Components/Typography';
import { getToken } from '../Utils/keychain';
import {
  connectSocket,
  disconnectSocket,
} from '../Utils/Webrtc/socketConnection';
import { SocketError } from '../Utils/Webrtc/SocketError';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Sending `peerConnectionOnRenegotiationNeeded` with no listeners registered.',
]);

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Call'>;

const Call = ({ route }: Props) => {
  const socketRef = useRef<SocketIOClient.Socket>();
  const peerConnectionRef = useRef<any>();
  const localChannelRef = useRef<any>();
  const localReceiveChannelRef = useRef<any>();
  const remoteChannelRef = useRef<any>();
  const remoteReceiveChannelRef = useRef<any>();
  const audioStream = useRef<any>();
  const localUser = useRef<string>();
  const userInfoRef = useRef<string>();
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
    socketRef.current.on('connected', handleConnected);
    socketRef.current.on('exit', handleExit);
  }, []);

  function handleConnected() {
    navigation.reset({
      routes: [
        {
          name: 'Calling',
          params: {
            socket: socketRef.current as SocketIOClient.Socket,
            userInfo: userInfoRef.current as string,
          },
        },
      ],
    });
  }

  function handleExit() {
    peerConnectionRef.current?.close();
    localChannelRef?.current?.close();
    remoteChannelRef?.current?.close();
    socketRef.current?.emit('leave');
    disconnectSocket(socketRef.current as SocketIOClient.Socket);
    navigation.reset({ routes: [{ name: 'Home' }] });
  }

  function makeOffer() {
    console.log(socketRef.current?.id, 'I will make offer');

    peerConnectionRef.current = configPeer();
    peerConnectionRef.current.onaddstream = gotRemoteStream;
    peerConnectionRef.current.ondatachannel = handleRemoteChannelCallback;
    localChannelRef.current =
      peerConnectionRef.current.createDataChannel('local-dataChannel');
    localChannelRef.current.onopen = handleLocalChannelOpen;
    localChannelRef.current.onerror = handleLocalChannelError;
  }

  const handleLocalChannelOpen = function () {
    localChannelRef.current.send(userInfo());
  };

  const handleLocalReceiveChannelMessageReceived = function (event: any) {
    console.log('local get message');
    userInfoRef.current = event.data;
    socketRef.current?.emit('connected');
  };

  const handleRemoteChannelOpen = function () {
    remoteChannelRef.current.send(userInfo());
  };

  const handleRemoteReceiveChannelMessageReceived = function (event: any) {
    console.log('remotes get message');
    userInfoRef.current = event.data;
  };

  const handleLocalChannelError = function (error: any) {
    console.log('LocalChannel.OnError:', error);
  };

  const handleRemoteChannelError = function (error: any) {
    console.log('RemoteChannel.OnError:', error);
  };

  const handleRemoteChannelCallback = function (event: any) {
    localReceiveChannelRef.current = event.channel;
    localReceiveChannelRef.current.onmessage =
      handleLocalReceiveChannelMessageReceived;
  };

  const handleLocalChannelCallback = function (event: any) {
    remoteReceiveChannelRef.current = event.channel;
    remoteReceiveChannelRef.current.onmessage =
      handleRemoteReceiveChannelMessageReceived;
  };

  function userInfo() {
    const userInfo = route.params.userInfo;
    return JSON.stringify(userInfo);
  }

  function configPeer() {
    const configuration = {
      iceServers: [{ url: 'stun:stun4.l.google.com:19302' }],
    };
    const peerConnection = new RTCPeerConnection(configuration);
    peerConnection.addStream(audioStream.current!);
    peerConnection.onnegotiationneeded = handleNegotiationEvent as any;
    peerConnection.onicecandidate = handleIceCandidateEvent;

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
    // local?????? ??????????????? ??????
  }

  async function handleIncomingOffer(sdp: string) {
    if (!localUser.current) {
      console.log(socketRef.current?.id, 'I got offer');
      const configuration = {
        iceServers: [{ url: 'stun:stun4.l.google.com:19302' }],
      };
      peerConnectionRef.current = new RTCPeerConnection(configuration);
      peerConnectionRef.current.addStream(audioStream.current!);
      peerConnectionRef.current.onaddstream = gotRemoteStream;

      console.log(socketRef.current?.id, 'I will make answer');
      const sdpType = { sdp, type: 'offer' };
      const desc = new RTCSessionDescription(sdpType);
      await peerConnectionRef.current.setRemoteDescription(desc);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      peerConnectionRef.current.ondatachannel = handleLocalChannelCallback;
      remoteChannelRef.current =
        peerConnectionRef.current.createDataChannel('remote-dataChannel');
      remoteChannelRef.current.onopen = handleRemoteChannelOpen;
      remoteChannelRef.current.onerror = handleRemoteChannelError;

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
      console.log(socketRef.current?.id, 'I got answer');

      const sdpType = { sdp, type: 'answer' };
      const desc = new RTCSessionDescription(sdpType);
      await peerConnectionRef.current?.setRemoteDescription(desc);
    }
  }

  function gotRemoteStream(event: any) {
    return;
  }

  function handleDisconnection() {
    disconnectSocket(socketRef.current as SocketIOClient.Socket);
    navigation.reset({ routes: [{ name: 'Home' }] });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Typography
        value={t('CALL.title')}
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
