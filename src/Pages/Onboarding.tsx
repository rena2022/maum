import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import styled from 'styled-components/native';

const Onboarding = () => {
  return (
    <Container>
      <Contents>
        <Image source={require('../Assets/sumHeart.png')} />
        <GreetText>안녕하세요? 반가워요</GreetText>
        <IntroText>
          마음은 따뜻한 1:1 소셜 통화 앱이에요.{'\n'}
          지금 대화 친구를 만나세요!
        </IntroText>
      </Contents>
      <Footer>
        <StartBtn onPress={() => {}} style={{ paddingVertical: 20 }}>
          <StartText>시작하기</StartText>
        </StartBtn>
        <NoticeText>
          가입 시 이용약관 및 개인정보 취급방침에 동의하게 됩니다.
        </NoticeText>
      </Footer>
    </Container>
  );
};

export default Onboarding;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.View`
  align-items: center;
`;

const GreetText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin: 34px 0 12px 0;
`;

const IntroText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #999999;
  text-align: center;
  line-height: 28.8px;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 60px;
  width: 100%;
  align-items: center;
`;

const StartBtn = styled.Pressable`
  width: 90%;
  background: #ff787e;
  border-radius: 30px;
  margin-bottom: 16px;
`;

const StartText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

const NoticeText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #999999;
  /* letter-spacing: '-0.01'; */
`;
