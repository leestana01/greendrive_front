import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import axios from "axios";

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
  overflow: hidden; /* 스크롤이 있는 경우 내용을 스크롤합니다. */
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
  margin-top: 200px;
`;
const BoxContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center; /* 수평 가운데 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
`;

const LoginBox = styled.div`
  width: 295px;
  height: 60px;
  flex-shrink: 0;

  margin-top: 210px;
  margin-bottom: 30px;
  border-radius: 7px;
  background: #67c00e;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;

const Cariconimg = styled.div`
  width: 44.633px;
  height: 43.181px;
  flex-shrink: 0;
  display: flex;
  margin-left: 20px;
`;

const Logintext = styled.div`
  color: #fff;
  font-family: Noto Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 135%; /* 27px */
  display: flex;
`;

const KakaoLoginBox = styled.div`
  width: 295px;
  height: 60px;
  flex-shrink: 0;

  border-radius: 7px;
  background: #fee500;
  display: flex;
  align-items: center;
  gap: 42px;
  cursor: pointer;
`;

const Kakaoiconimg = styled.div`
  width: 36px;
  height: 34px;
  flex-shrink: 0;
  flex-shrink: 0;
  display: flex;
  margin-left: 20px;
`;

const KakaoLogintext = styled.div`
  color: #000;
  font-family: Noto Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 135%; /* 27px */
  display: flex;
`;

const Firstpage = () => {
  localStorage.setItem("home",true)
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/Login");
  };
  const SERVER = process.env.REACT_APP_SERVER;
  const KAKAO_REST_API = process.env.REACT_APP_KAKAO_REST_API;
  const KAKAO_URI = process.env.REACT_APP_KAKAO_URI;
  const CLIENT = process.env.REACT_APP_CLIENT;
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const [divs, setDivs] = useState([]);
  const [failDivAdded, setFailDivAdded] = useState(false);

  const handleKakaoLogin = () => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API}&redirect_uri=${CLIENT}${KAKAO_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  const BACKEND_URL = SERVER;
  const onClick = async () => {
    const userData = {
      username: loginId,
      password: loginPw,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/login`, userData);
      console.log("로그인성공:", response.data);
      if (response.data.key) {
        // 카카오톡으로부터 받은 userId 정보를 localStorage에 저장
        const { userId } = response.data;
        if (userId) {
          localStorage.setItem("user_id", userId); // 수정된 부분
          localStorage.setItem("Name", response.data.Name); // 사용자 이름도 저장할 수 있습니다
        }
        // 마이페이지로 이동
        navigate("/Mypage");
      }
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
            <LoginBox onClick={navigateToLogin}>
              <Cariconimg>
                <img
                  src={`${process.env.PUBLIC_URL}/images/Mask group.png`}
                  alt="caricon"
                />
              </Cariconimg>
              <Logintext>Green Driver 로그인</Logintext>
            </LoginBox>
            <KakaoLoginBox onClick={handleKakaoLogin}>
              <Kakaoiconimg>
                <img
                  src={`${process.env.PUBLIC_URL}/images/firstpage_kakaologo.png`}
                  alt="caricon"
                />
              </Kakaoiconimg>
              <KakaoLogintext>카카오 로그인</KakaoLogintext>
            </KakaoLoginBox>
          </BoxContainer>
        </Body>
      </BodyWrapper>
    </Container>
  );
};
export default Firstpage;
