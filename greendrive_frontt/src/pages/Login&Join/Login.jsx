import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import KakaoLogin from "react-kakao-login";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #ffffff;
  overflow: auto; /* 화면 스크롤 기능 유지 */
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤 바를 숨김 */

  /* 미디어 쿼리 적용 */
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }
  &::-webkit-scrollbar {
    display: none; /* 스크롤 바를 숨김 */
  }
`;

const BodyWrapper = styled.div`
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const HeadBox = styled.div`
  display: flex;

  width: 345px;
  height: 50px;
  padding: 10px;
  flex-shrink: 0;
  background-color: #fff;
  justify-content: center;
  margin: 0 auto;
`;

const Logo = styled.div`
  display: flex;
  margin: auto 0;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 가운데 정렬 */
  margin: auto;
  margin-top: 50px;
`;
const Body = styled.div`
  margin: 0 auto;
  display: flex;
  height: 650px;
  padding-top: 30px;
  gap: 20px;
  flex-direction: column;
  align-items: flex-start;

  flex-shrink: 0;
`;

const InputBox = styled.div`
  display: flex;

  margin: 0 auto;
  margin-top: 10px;
  width: 335px;
  height: 45px;
  padding: 5px;
  align-items: center;

  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #60716f;
  background: #fff;
  margin-bottom: 40px;
`;

const Input = styled.input`
  position: relative;
  align-items: center;
  width: 800px;
  height: 32px;
  background: #ffffff;
  border-radius: 6px;
  border: none;
  margin: auto;
  font-size: 17px;
  &::placeholder {
    color: #60716f;
    padding-left: 10px;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;
const FindLinks = styled.div`
  margin-top: px;
  margin: 0 auto;
`;

const Findidment = styled.div`
  color: #000;
  font-family: Noto Sans;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.333px;
  text-decoration-line: underline;
  cursor: pointer;
  margin-top: 50px;
`;

const LoginBox = styled.div`
  margin: auto;
  margin-top: 3%;
  display: flex;
  width: 328px;
  height: 45px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #519a09;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const KakaoLoginBox = styled.div`
  margin: auto;
  margin-top: 3%;
  display: flex;
  width: 328px;
  height: 45px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border: 1px solid #519a09; /* 테두리에만 색을 적용 */
  border-radius: 6px;
  background: #ffdc3c;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const LoginText = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const KakaoLoginText = styled.div`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Memberq = styled.div`
  color: #320f0a;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 50px;
`;

const Signup = styled.div`
  margin-top: -15%;
  color: #e02d11;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;
`;
const Subtitle = styled.div`
  color: #211f1f;
  font-family: Noto Sans;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.333px;
  text-align: left;
  width: 340px;
  margin: 0 auto; /* 화면 중앙에 위치하도록 수정 */
  max-width: 950px; /* 최대 너비를 설정하여 화면 크기가 커져도 너무 넓어지지 않도록 함 */
  padding: 0 20px; /* 좌우 여백을 추가하여 너비 조정 */
`;

const Kakaoimg = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 15px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;

  display: flex;
`;
const Login = () => {
  const navigate = useNavigate();

  const navigateToJoin = () => {
    navigate("/Join");
  };
  const navigateTofindid = () => {
    navigate("/Findid");
  };
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const [divs, setDivs] = useState([]);
  const [failDivAdded, setFailDivAdded] = useState(false);

  const handleKakaoLogin = () => {
    const Rest_api_key = "키 값"; // REST API KEY
    const redirect_uri = "http://localhost:3000/login/oauth2/callback/kakao"; // Redirect URI
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.href = kakaoURL;
  };

  const BACKEND_URL = `서버 주소`;
  const onClick = async () => {
    const userData = {
      username: loginId,
      password: loginPw,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/login/`, userData);
      console.log("로그인성공:", response.data);
      if (response.data.key) {
        localStorage.setItem("access_token", response.data.key);
        console.log("저장 성공");
      }
      navigate("/Signup2");
    } catch (error) {
      console.error("로그인 실패:", error);

      if (!failDivAdded) {
        const newFailDiv = (
          <div key={divs.length} className="failDiv" style={failStyle}>
            로그인에 실패했습니다. <br />
            아이디와 비밀번호를 다시 한 번 확인해주세요.
          </div>
        );
        setDivs([...divs, newFailDiv]);
        setFailDivAdded(true);
      }
    }
  };

  const failStyle = {
    color: "red",
    textAlign: "left",
    margin: "0 auto",
    marginTop: "30px",
  };

  //kakao oauth 구현 임시 코드

  const code = new URL(window.location.href).searchParams.get("code");

  const SocialKakao = () => {
    const Rest_api_key = "REST API KEY"; //REST API KEY
    const redirect_uri = "http://localhost:3000/auth"; //Redirect URI
    // oauth 요청 URL

    return (
      <>
        <button onClick={handleKakaoLogin}>카카오 로그인</button>
      </>
    );
  };

  return (
    <Container>
      <BodyWrapper>
        <Body>
          <HeadBox>
            <Logo>
              <img
                src={`${process.env.PUBLIC_URL}/images/LogoGreenver.png`}
                alt="logo"
              />
            </Logo>
          </HeadBox>
          <BoxContainer>
            <Subtitle>아이디를 입력해주세요</Subtitle>
            <InputBox>
              <Input
                type="text"
                placeholder="아이디 (이메일)"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </InputBox>
            <Subtitle>비밀번호를 입력해주세요</Subtitle>
            <InputBox>
              <Input
                type="password"
                placeholder="비밀번호"
                value={loginPw}
                onChange={(e) => setLoginPw(e.target.value)}
              />
            </InputBox>
            <KakaoLoginBox onClick={handleKakaoLogin}>
              <Kakaoimg>
                <img
                  src={`${process.env.PUBLIC_URL}/images/kakao.png`}
                  alt="kakaologo"
                />
              </Kakaoimg>
              <KakaoLoginText>카카오톡으로 로그인하기</KakaoLoginText>
            </KakaoLoginBox>
            <LoginBox onClick={onClick}>
              <LoginText>로그인</LoginText>
            </LoginBox>
            <FindLinks>
              <Findidment onClick={navigateTofindid}>아이디 찾기</Findidment>
            </FindLinks>
            {divs}
            <div>
              <Memberq>아직 회원이 아니신가요?</Memberq>
              <br />
              <Signup onClick={navigateToJoin}>회원가입</Signup>
            </div>
          </BoxContainer>
        </Body>
      </BodyWrapper>
    </Container>
  );
};
export default Login;
