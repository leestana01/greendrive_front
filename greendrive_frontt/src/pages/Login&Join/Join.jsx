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
  max-width: 100%; /* 페이지가 화면보다 넓어지지 않도록 최대 너비를 100%로 설정합니다. */

  /* 미디어 쿼리 적용 */
  @media (hover: hover) {
    width: 100%; /* 가로 스크롤을 제거하기 위해 너비를 100%로 설정합니다. */
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
const BodyWrapper = styled.div`
  flex: 1; /* 남은 공간을 채우도록 설정 */
  overflow: auto; /* 스크롤이 있는 경우 내용을 스크롤합니다. */
`;

const Body = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;

  flex-shrink: 0;
  margin: 0 auto;
  margin-top: 10px;
`;

const HeadBox = styled.div`
  display: flex;

  width: 345px;
  height: 80px;
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

const Jointext = styled.div`
  color: #211f1f;
  font-family: Noto Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.333px;

  margin: 0 auto;
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
const PasswordMismatchMessage = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fffff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  height: 20px;
`;
const GrayBox = styled.div`
  display: flex;
  width: 145px;
  height: 43px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  border-radius: 6px;
  background: linear-gradient(0deg, #625856 0%, #625856 100%), #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const Graytext = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const GreenBox = styled.div`
  display: flex;
  width: 145px;
  height: 43px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
  border-radius: 6px;
  background: #519a09;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
const Greentext = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 100px;
  margin: auto;
`;

const Ment = styled.div`
  width: 270px;
  margin: 0 auto;
  display: flex;
  color: #000;
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Mentmint = styled.div`
  cursor: pointer;

  margin: 0 auto;
  text-align: center;
  cursor: pointer;
  display: flex;
  color: #05bba2;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 15px;
  margin: 0 auto;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

const CheckboxText = styled.div`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const PhoneNumberContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const PhoneNumberSelect = styled.select`
  margin-right: 10px;
  width: 100px;
  height: 50px;
  border-radius: 6px;
`;

const PhoneNumberInput = styled.input`
  width: 230px;
  height: 50px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #60716f;
  margin: auto;

  font-size: 17px;
  &::placeholder {
    color: #60716f;
    padding-left: 10px;
  }
  &:focus {
    outline: none;
    border-color: #60716f; /* 클릭 시 테두리 색상을 원래 테두리 색상으로 설정 */
  }
`;

const CarSelect = styled.select`
  width: 345px; /* 휴대폰 번호 드롭박스와 동일한 너비로 설정 */
  height: 55px; /* 휴대폰 번호 드롭박스와 동일한 높이로 설정 */
  border: 1px solid #60716f; // 드롭다운 박스의 테두리를 추가합니다.
  border-radius: 6px;
  appearance: none;
  padding: 0 10px;
  font-size: 17px;
  background: #ffffff;
  margin: auto;
  &:focus {
    outline: none;
    border-color: #60716f;
  }
`;

const StyledOption = styled.option`
  color: #60716f;
`;

const Join = () => {
  const navigate = useNavigate();
  const navigateToFirstpage = () => {
    navigate("/");
  };
  const navigateToSignupcard = () => {
    navigate("/Login");
  };

  const carOptions = [
    "전기차",
    "수소전기차",
    "하이브리드차",
    "플러그인 하이브리드차",
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_check, setPassword_check] = useState("");
  const [name, setName] = useState("");
  //const [nickname, setNickName] = useState("");
  const [car, setCar] = useState("");
  const [phone, setPhone] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [divs, setDivs] = useState([]);
  const [failDivAdded, setFailDivAdded] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [phoneFirst, setPhoneFirst] = useState("010");
  const [phoneNumberAPIResponse, setPhoneNumberAPIResponse] = useState("");

  const [emailError, setEmailError] = useState(false); // 이메일 형식 에러 상태
  const [emailErrorMessage, setEmailErrorMessage] = useState(""); // 이메일 에러 메시지
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태를 추적합니다.
  const validateEmail = (email) => {
    // 이메일 형식 검증을 위한 정규식
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
      setEmailError(false); // 올바른 형식인 경우 에러 상태 해제
      setEmailErrorMessage("");
    } else {
      setEmailError(true); // 올바르지 않은 형식인 경우 에러 상태 설정
      setEmailErrorMessage("올바른 이메일 형식이 아닙니다.");
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // 이메일 형식 검증 실행
    validateEmail(newEmail);
  };

  const handlePhoneFirstChange = (e) => {
    setPhoneFirst(e.target.value);
  };

  const onClick = async () => {
    // 사용자 입력 데이터를 서버로 전송하는 로직을 추가합니다.
    const userData = {
      name: name,
      userId: email,
      password: password,
      carType: car,
      phoneNo: phone,
    };

    const BACKEND_URL = `백엔드 URL`;
    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, userData);
      console.log("회원가입 성공:", response.data);
      navigate("/Login");
    } catch (error) {
      console.log("회원가입 실패:");
      errorHandler(error);
    }
  };

  const savePhoneNumberToAPI = async () => {
    const phoneNumberData = {
      phoneNo: phoneFirst + phone,
    };

    const PHONE_NUMBER_API_URL = "API_ENDPOINT_URL"; // 실제 API 엔드포인트로 대체

    try {
      const response = await axios.post(PHONE_NUMBER_API_URL, phoneNumberData);
      console.log("휴대폰 번호가 성공적으로 저장되었습니다:", response.data);
      setPhoneNumberAPIResponse("휴대폰 번호가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("휴대폰 번호 저장 실패:", error);
      setPhoneNumberAPIResponse("휴대폰 번호 저장에 실패했습니다.");
    }
  };
  const errorHandler = (error) => {
    if (error.response) {
      if (error.response.data) {
        console.log("에러 응답:", error.response.data);
        let errorMessage = "";
        if (
          error.response.data.email === "이미 등록된 이메일입니다." ||
          error.response.data.phone === "이미 등록된 휴대폰 번호입니다."
        ) {
          errorMessage = "이미 가입된 회원입니다.";
        } else {
          errorMessage = "입력을 확인하세요.";
        }
        setErrorText(errorMessage);
      }
    } else {
      console.error("네트워크 에러:", error.message);
      // 네트워크 관련 에러 메시지를 콘솔에 출력합니다.
    }
  };

  const failStyle = {
    color: "red",
    textAlign: "left",
    margin: "0 auto",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // 비밀번호 일치, 회원가입 로직 실행
      console.log("회원가입 성공");
      await savePhoneNumberToAPI(); // 네비게이션 전에 API에 휴대폰 번호 저장
      navigateToSignupcard();
    } else {
      // 비밀번호 불일치
      console.log("비밀번호가 일치하지 않습z니다.");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password !== newConfirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  // 모든 입력 상태를 추적하는 상태 변수
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  // 모든 입력란이 채워져 있는지 확인하는 함수
  const checkAllFieldsFilled = () => {
    if (
      email &&
      password &&
      password_check &&
      name &&
      //nickname &&
      car &&
      phone &&
      isChecked
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  // useEffect를 사용하여 모든 입력 상태가 변경될 때마다 checkAllFieldsFilled 함수를 실행합니다.
  useEffect(() => {
    checkAllFieldsFilled();
  }, [email, password, password_check, name, car, phone, isChecked]); //nickname

  const url1 =
    "https://harvest-machine-d20.notion.site/77980ca8efd3435e9915e88b830a5ca4";
  const url2 =
    "https://harvest-machine-d20.notion.site/d76bf5b332524288a9db8d1857c6bc19";

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
          <Jointext>회원가입</Jointext>
          <Subtitle>이름</Subtitle>
          <InputBox>
            <Input
              type="text"
              placeholder="이름을 입력해주세요"
              onChange={(e) => setName(e.target.value)}
            />
          </InputBox>
          <Subtitle>이메일 (ID)</Subtitle>
          <InputBox>
            <Input
              type="text"
              placeholder="이메일 주소를 입력해주세요"
              onChange={handleEmailChange}
              style={emailError ? { borderColor: "red" } : null} // 에러 시 스타일 변경
            />
          </InputBox>
          {/* 에러 메시지 표시 */}
          {emailError && (
            <div style={{ color: "red", fontSize: "16px", margin: "auto" }}>
              {emailErrorMessage}
            </div>
          )}
          {/*
          <Subtitle>닉네임</Subtitle>

          <InputBox>
            <Input
              type="text"
              placeholder="닉네임을 입력해주세요"
              onChange={(e) => setNickName(e.target.value)}
            />
          </InputBox>
          */}
          <Subtitle>비밀번호</Subtitle>
          <InputBox>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
          </InputBox>

          <InputBox>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={password_check}
              onChange={(e) => {
                handleConfirmPasswordChange(e);
                setPassword_check(e.target.value);
              }}
              placeholder="비밀번호 재입력"
            />
          </InputBox>

          {!passwordMatch && (
            <PasswordMismatchMessage>
              비밀번호가 일치하지 않습니다.
            </PasswordMismatchMessage>
          )}

          <Subtitle>친환경 자동차 종류</Subtitle>

          <CarSelect value={car} onChange={(e) => setCar(e.target.value)}>
            <StyledOption value="">
              친환경 자동차 종류를 선택해주세요
            </StyledOption>
            {carOptions.map((option, index) => (
              <StyledOption key={index} value={option}>
                {option}
              </StyledOption>
            ))}
          </CarSelect>

          <Subtitle>휴대폰 번호</Subtitle>
          <PhoneNumberContainer>
            <PhoneNumberSelect
              value={phoneFirst}
              onChange={handlePhoneFirstChange}
            >
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="080">080</option>
              {/* 필요한 다른 전화번호 앞 세 자리를 추가하세요 */}
            </PhoneNumberSelect>
            <PhoneNumberInput
              type="phone"
              placeholder="전화번호를 입력해주세요"
              onChange={(e) => setPhone(e.target.value)}
            />
          </PhoneNumberContainer>
          <div className="failDiv" style={failStyle}>
            {errorText}
          </div>
          <CheckboxContainer>
            <CheckboxInput type="checkbox" onChange={handleCheckboxChange} />
            <CheckboxText>
              <Ment>
                계속 진행시 GreenDriver의{" "}
                <Mentmint
                  onClick={() => {
                    window.open(url1);
                  }}
                >
                  서비스 이용약관
                </Mentmint>
                에 동의하고
              </Ment>

              <Ment>
                <Mentmint
                  onClick={() => {
                    window.open(url2);
                  }}
                >
                  개인정보 처리방침
                </Mentmint>
                을 읽었음을 인정하는 것으로 간주됩니다.
              </Ment>
            </CheckboxText>
          </CheckboxContainer>
          <ButtonContainer>
            <GrayBox onClick={navigateToFirstpage}>
              <Graytext>처음으로</Graytext>
            </GrayBox>
            <GreenBox
              onClick={onClick}
              style={{
                pointerEvents: allFieldsFilled ? "auto" : "none",
                opacity: allFieldsFilled ? 1 : 0.5,
              }}
            >
              <Greentext>확인</Greentext>
            </GreenBox>
          </ButtonContainer>
        </Body>
      </BodyWrapper>
    </Container>
  );
};
export default Join;
