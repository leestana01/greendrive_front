import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
    width: 390px;
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BodyWrapper = styled.div`
  flex: 1; /* 남은 공간을 채우도록 설정 */
  overflow: hidden; /* 스크롤이 있는 경우 내용을 스크롤합니다. */
`;

const Back = styled.div`
  width: 30px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  top: 30px;
  left: 10px;
`;

const Topbar = styled.div`
  display: flex;
  height: 60px;
  padding: 10px;
  align-items: center;

  flex-shrink: 0;
  background-color: #fffff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  justify-content: center;
`;

const Toptitle = styled.div`
  color: #081c19;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  margin: 0; /* Modify the margin property */
  position: absolute; /* Add this line */
  left: 50%; /* Add this line */
  transform: translateX(-50%); /* Add this line */
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

const Logo = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 50px;
  flex-shrink: 0;
`;

const InputBox = styled.div`
  display: flex;

  margin: 0 auto;
  width: 335px;
  height: 45px;
  padding: 5px;
  align-items: center;

  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #60716f;
  background: #fff;
`;

const Input = styled.input`
  margin: 0 auto;
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

const GreenBox = styled.div`
  margin: 0 auto;
  margin-top: 10%;
  display: flex;
  width: 222px;
  height: 53px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
  border-radius: 6px;
  background: #519a09;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const FindText = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

const ModalBackdrop1 = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);

  width: 100%;
  margin: 0 auto;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CmtxtBox = styled.div`
  display: flex;
  content-align: center;
  flex-direction: column;
  margin: 0 auto;
`;
const Cmtextemph = styled.div`
  font-weight: 700;
  margin: 0 auto;
`;

const Cmtext = styled.div`
  display: flex;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin: 0 auto;
`;
const BtmBox = styled.div`
  margin: 0 auto;
  margin-top: 6%;

  display: flex;
  width: 145px;
  height: 53px;
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
const Btmtext = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Plus = styled.div``;

const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 90%;
  padding-top: 7%;
  padding-bottom: 30px;
  background-color: #ffffff;
  overflow-y: auto; /* 스크롤을 추가 */
  width: 300px;

  div.desc {
    margin: 50px;
    font-size: 20px;
    color: var(--coz-purple-600);
  }
`;

const Findid = () => {
  const SERVER = process.env.REACT_APP_SERVER;
  const KAKAO_REST_API = process.env.REACT_APP_KAKAO_REST_API;
  const KAKAO_URI = process.env.REACT_APP_KAKAO_URI;
  const CLIENT = process.env.REACT_APP_CLIENT;
  const navigate = useNavigate();
  const BACKEND_URL = SERVER;
  const navigateToLogin = () => {
    navigate("/Login");
  };
  const [loginId, setLoginId] = useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  //스크롤 방지
  useEffect(() => {
    if (isOpen1) {
      // 모달 창이 열려 있는 경우에는 스크롤 방지
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    } else {
      // 모달 창이 닫혀 있는 경우에는 스크롤 가능하도록 설정
      document.body.style.cssText = "";
    }

    return () => {
      if (isOpen1) {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    };
  }, [isOpen1]);

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen1(!isOpen1);
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [divs, setDivs] = useState([]);
  const [failDivAdded, setFailDivAdded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");

    const requestData = {
      name: name,
      phone: phone,
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/users/forgot`,
        requestData
      );
      console.log("이메일(아이디) 찾음");
      setEmail(response.data.userId);
      openModalHandler();
    } catch (error) {
      console.error("실패:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        setError(error.response.data.non_field_errors[0]);
      } else {
        setError("An error occurred.");
      }

      if (!failDivAdded) {
        const newFailDiv = (
          <div key={divs.length} className="failDiv" style={failStyle}>
            아이디 찾기에 실패했습니다. <br />
            이름과 휴대폰 번호를 다시 한 번 확인해주세요.
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
  };

  return (
    <Container>
      <BodyWrapper>
        <Topbar>
          <Back>
            <img
              src={`${process.env.PUBLIC_URL}/images/backbutton.png`}
              alt="back"
              onClick={() => navigate(-1)}
            />
          </Back>
          <Toptitle>아이디 찾기</Toptitle>
        </Topbar>
        <Body>
          <Logo>
            <img
              src={`${process.env.PUBLIC_URL}/images/LogoGreenver.png`}
              alt="logo"
            />
          </Logo>
          <InputBox>
            <Input
              type="text"
              placeholder="이름"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <Input
              type="text"
              placeholder="휴대폰 번호 입력"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputBox>
          {divs}

          <GreenBox
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            <FindText>아이디 찾기</FindText>
          </GreenBox>
          {isOpen1 ? (
            <ModalBackdrop1 onClick={openModalHandler}>
              <ModalView onClick={(e) => e.stopPropagation()}>
                <CmtxtBox>
                  <Cmtext>
                    <Cmtextemph>{name}</Cmtextemph>
                    님의 아이디는
                  </Cmtext>
                </CmtxtBox>

                <CmtxtBox>
                  <Cmtext>
                    <Cmtextemph> {email && <div>{email}</div>}</Cmtextemph>
                    <Plus>입니다.</Plus>
                  </Cmtext>
                </CmtxtBox>
                <BtmBox>
                  <Btmtext onClick={navigateToLogin}>로그인 하러가기</Btmtext>
                </BtmBox>
              </ModalView>
            </ModalBackdrop1>
          ) : null}
        </Body>
      </BodyWrapper>
    </Container>
  );
};
export default Findid;
