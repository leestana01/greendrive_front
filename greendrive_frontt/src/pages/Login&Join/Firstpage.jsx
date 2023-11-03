import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";

//반응형 혹시나 쓸까봐 container 자체에 먹이는 소스입니다
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #fffff;
  -ms-overflow-style: none;

  /* 미디어 쿼리 적용 */
  @media (hover: hover) {
    width: 393px;
    height: 852px;
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BodyWrapper = styled.div`
  flex: 1; /* 남은 공간을 채우도록 설정 */
  overflow: auto; /* 스크롤이 있는 경우 내용을 스크롤합니다. */
  background: #519a09;
`;

const Body = styled.div`
  display: flex;
  background: #519a09;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  margin: 0 auto;
`;

const Logoimg = styled.div`
  color: #fff;
  font-family: Righteous;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 40.5px */
  margin-top: 260px;
`;
const BoxContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center; /* 수평 가운데 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
`;
const Box1 = styled.div`
  display: inline-flex;

  justify-content: center;
  align-items: center;
  margin-top: 120px;

  background: #519a09;
  cursor: pointer;
`;
const Jointext = styled.div`
  color: #fff;
  font-family: Noto Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.333px;
  display: flex;
  margin-left: 15px;
`;

const Kakaoimg = styled.div`
  width: 62px;
  height: 62px;
  flex-shrink: 0;
  border-radius: 15px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;

  display: flex;
`;

const Box2 = styled.div`
  display: inline-flex;

  justify-content: center;
  align-items: center;
  margin-top: 20px;

  background: #519a09;
  margin-bottom: 100px;
  cursor: pointer;
`;
const JoinLogoimg = styled.div`
  width: 62px;
  height: 62px;
  flex-shrink: 0;
  border-radius: 15px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;

  display: flex;
`;

const Firstpage = () => {
  const navigate = useNavigate();

  const navigateTojoin = () => {
    navigate("/Join");
  };

  const kakaoClientId = "YOUR_KAKAO_JAVASCRIPT_KEY"; // 여기에 실제 카카오 JavaScript 키를 할당해야 합니다.

  const kakaoOnSuccess = (result) => {
    console.log(result);
    navigate("/Join"); // 카카오 로그인 성공 시 실행할 로직을 구현합니다.
  };

  const kakaoOnFailure = (error) => {
    console.log(error); // 카카오 로그인 실패 시 실행할 로직을 구현합니다.
  };
  return (
    <Container>
      <BodyWrapper>
        <Body>
          <BoxContainer>
            <Logoimg>
              <img
                src={`${process.env.PUBLIC_URL}/images/Logo.png`}
                alt="logo"
                width="300px"
              />
            </Logoimg>
            <KakaoLogin
              token={kakaoClientId}
              onSuccess={kakaoOnSuccess}
              onFailure={kakaoOnFailure}
              getProfile={true}
              buttonText="카카오 아이디로 가입하기"
              render={(props) => (
                <Box1 onClick={props.onClick}>
                  <Kakaoimg>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/kakao.png`}
                      alt="kakaologo"
                    />
                  </Kakaoimg>
                  <Jointext>카카오 아이디로 가입하기</Jointext>
                </Box1>
              )}
            />

            <Box2 onClick={() => navigateTojoin()}>
              <JoinLogoimg>
                <img
                  src={`${process.env.PUBLIC_URL}/images/joinlogo.png`}
                  alt="joinlogo"
                />
              </JoinLogoimg>
              <Jointext>새로운 아이디로 시작하기</Jointext>
            </Box2>
          </BoxContainer>
        </Body>
      </BodyWrapper>
    </Container>
  );
};
export default Firstpage;
