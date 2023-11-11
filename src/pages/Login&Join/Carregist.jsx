import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Nav from "../../components/Nav";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #ffffff;
  -ms-overflow-style: none;

  /* 미디어 쿼리 적용 */
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }
  overflow: auto; /* 스크롤 추가 */
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
  left: 30px;
`;

const Topbar = styled.div`
  display: flex;
  height: 60px;
  padding: 10px;
  align-items: center;

  flex-shrink: 0;

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
  min-height: 100vh; /* 최소 높이를 화면의 전체 높이로 설정합니다. */
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  gap: 20px;
  flex-shrink: 0;
  overflow-y: auto; /* 필요할 때만 스크롤이 나타나도록 설정합니다. */
`;

const RegistMent = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.333px;
  text-align: left;
  margin: 0 auto;
`;

const Logo = styled.div`
  margin: 0 auto;
  flex-shrink: 0;
`;

const InputBox = styled.div`
  display: flex;

  margin: 0 auto;
  width: 320px;
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
  margin-top: 5%;
  margin-bottom: 10%;
  display: flex;
  width: 222px;
  height: 53px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #519a09;

  flex-shrink: 0;
  border-radius: 6px;

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
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%; /* 전체 화면을 덮도록 수정 */

  top: 0;
  left: 0;

  /* 클릭 시 모달 닫기 */
  cursor: pointer;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin: 0 auto;
`;
const BtmBox = styled.div`
  margin: 0 auto;
  margin-top: 15%;

  display: flex;
  width: 145px;
  height: 40px;
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
  onClick: (e) => e.stopPropagation(),
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 90%;
  padding-top: 5%;
  padding-bottom: 30px;
  background-color: #ffffff;
  overflow-y: auto; /* 스크롤을 추가 */
  width: 300px;
  z-index: 2; //뒷 화면 위쪽에 위치해서 뒷 화면 어둡게 만들기 위해 추가함 (11/06)
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

const DrivingLicenseUpload = styled.input`
  /* Add your custom styles for the input element */
  margin: 0 auto;
  position: relative;
  align-items: center;
  width: 175px;
  height: 32px;
  background: #ffffff;
  border-radius: 6px;
  border: none;
  margin: auto;
  margin-top: 10px;
  font-size: 13px;

  &:focus {
    border: none;
    outline: none;
  }
`;

const RegistrationCardUpload = styled.input`
  /* Add your custom styles for the input element */
  margin: 0 auto;
  position: relative;
  align-items: center;
  width: 175px;
  height: 32px;
  background: #ffffff;
  border-radius: 6px;
  border: none;
  margin: auto;
  margin-top: 10px;
  font-size: 13px;
  &:focus {
    border: none;
    outline: none;
  }
`;

const InputBox2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 335px;
  height: 180px;
  padding: 5px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #60716f;
  background: #fff;
`;

const PreviewImage = styled.img`
  width: 100%; /* 이미지의 너비를 100%로 설정하여 부모 요소의 너비에 맞춤 */
  height: 100%; /* 이미지의 높이를 100%로 설정하여 부모 요소의 높이에 맞춤 */
  object-fit: contain; /* 이미지가 잘리지 않고 가로와 세로 비율을 유지하면서 부모 요소에 맞게 조정됨 */
  border-radius: 6px; /* 이미지 주변을 둥글게 처리 */
`;

const Carregist = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [registrationLicense, setRegistrationLicense] = useState("");
  const [registrationLicensePreview, setRegistrationLicensePreview] = useState("");
  const [drivingLicensePreview, setDrivingLicensePreview] = useState("");

  const [isOpen1, setIsOpen1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputFilled, setIsInputFilled] = useState(false);
  
  const [divs, setDivs] = useState([]);
  const [failDivAdded, setFailDivAdded] = useState(false);

  const SERVER = process.env.REACT_APP_SERVER;

  //등록하기 버튼 활성화 검사
  useEffect(() => {
    if (name && drivingLicense && registrationLicense) {
      setIsInputFilled(true);
    } else {
      setIsInputFilled(false);
    }
  }, [name, drivingLicense, registrationLicense]);

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

  // 모달 창을 열거나 닫기 위한 메소드
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModal = () => {
    setIsOpen1(true);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", localStorage.getItem("userId"));

    try {
      const response = await axios.post(
        `${SERVER}/users/judge`,
        formData,
      );

      console.log("성공적으로 등록되었습니다! : ", response.data);
    } catch (error) {
      console.error("등록 실패 : ", error);

      if (!failDivAdded) {
        const newFailDiv = (
          <div key={divs.length} className="failDiv" style={failStyle}>
            등록에 실패했습니다. 다시 시도해주세요.
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
        <Body>
          <Logo>
            <img
              src={`${process.env.PUBLIC_URL}/images/LogoGreenver.png`}
              alt="logo"
            />
          </Logo>
          <Topbar>
            <Back>
              <img
                src={`${process.env.PUBLIC_URL}/images/backbutton.png`}
                alt="back"
                onClick={() => navigate(-1)}
              />
            </Back>
            <Toptitle>자동차 등록</Toptitle>
          </Topbar>

          <RegistMent>
            친환경 자동차 인증을 위한 <br />
            자동차 등록증과 운전면허를 등록해주세요! <br />
            7일 이내에 운영자의 승인을 거치고 인증됩니다
          </RegistMent>
          <Subtitle>성명</Subtitle>
          <InputBox>
            <Input
              type="text"
              placeholder="홍길동"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputBox>
          <Subtitle>운전면허증</Subtitle>
          <InputBox2>
            {drivingLicensePreview ? (
              <PreviewImage
                src={drivingLicensePreview}
                alt="운전면허증 미리보기"
              />
            ) : (
              <label htmlFor="drivingLicense" className="custom-file-upload">
                <span>운전면허 등증을 스캔 후 첨부해주세요.</span>
                <br />
                <DrivingLicenseUpload
                  type="file"
                  id="drivingLicense"
                  accept="image/*"
                  value={drivingLicense}
                  onChange={(e) => {
                    setDrivingLicense(e.target.value);
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setDrivingLicensePreview(reader.result);
                    };
                    if (file) {
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            )}
          </InputBox2>

          <Subtitle>자동차 등록증</Subtitle>
          <InputBox2>
            {registrationLicensePreview ? (
              <PreviewImage
                src={registrationLicensePreview}
                alt="자동차 등록증 미리보기"
              />
            ) : (
              <label
                htmlFor="registrationLicense"
                className="custom-file-upload"
              >
                <span>자동차 등록증을 스캔 후 첨부해주세요.</span>
                <br />
                <RegistrationCardUpload
                  type="file"
                  id="registrationLicense"
                  accept="image/*"
                  value={registrationLicense}
                  onChange={(e) => {
                    setRegistrationLicense(e.target.value);
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setRegistrationLicensePreview(reader.result);
                    };
                    if (file) {
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            )}
          </InputBox2>
          {divs}

          <GreenBox
            onClick={(e) => {
              if (isInputFilled) {
                handleSubmit(e);
                handleModal();
              }
            }}
            style={{ backgroundColor: isInputFilled ? "#519a09" : "#a0a0a0" }}
          >
            <FindText>등록하기</FindText>
          </GreenBox>
          {isOpen1 ? (
            <ModalBackdrop1 onClick={openModalHandler}>
              <ModalView onClick={(e) => e.stopPropagation()}>
                <CmtxtBox>
                  <Cmtext>
                    <Cmtextemph>{name}</Cmtextemph>
                    님의 자동차가
                    <br />
                  </Cmtext>
                  <Cmtext>정상적으로 등록되었습니다!</Cmtext>
                </CmtxtBox>

                <BtmBox>
                  <Btmtext onClick={navigate("/Mypage")}>마이페이지로 이동</Btmtext>
                </BtmBox>
              </ModalView>
            </ModalBackdrop1>
          ) : null}
        </Body>
      </BodyWrapper>
      <style>
        {`
          .custom-file-upload {
            display: inline-block;
            padding: 6px 12px;
            cursor: pointer;
            margin: 0 padding;
            align-items: center;
            width: 280px;
          }
        `}
      </style>
      <Nav />
    </Container>
  );
};
export default Carregist;
