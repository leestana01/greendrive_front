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
  overflow-x: hidden; /* 가로 스크롤 숨기기 */

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
  margin-left: -60px;
  padding-right: 45px;
`;

const Topbox = styled.div`
  width: 393px;
  height: 194px;
  flex-shrink: 0;
  background: #519a09;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  display-items: flex;
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
  display: flex;
  width: 168px;
  height: 21px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: var(--White_sub, #fff);
  text-align: center;

  /* Header/h4 */
  font-family: Noto Sans CJK KR;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 142%; /* 24.14px */
`;

const Settingicon = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  margin-left: 30px;
  margin-right: -70px;
`;

const Profileicon = styled.div`
  display: flex;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  padding-left: 60px;
  padding-top: 10px;
  z-index: 1;
  position: relative;
`;

const Cameraicon = styled.div`
  position: absolute;
  top: 135px;
  margin-left: 105px;
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  z-index: 2;
`;

const Licensebox = styled.div`
  display: flex;
  margin-left: 150px;
  margin-top: -80px;
`;
const Licenseicon = styled.div`
  width: 23px;
  height: 23px;
  flex-shrink: 0;
`;

const Licensetext = styled.div`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 5px;
  padding-top: 5px;
`;

const Namebox = styled.div`
  display: flex;
  margin-left: 152px;
  padding-top: 5px;
`;

const Username = styled.div`
  color: #fff;
  font-family: Noto Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.333px;
`;

const Usertext = styled.div`
  color: #fff;
  font-family: Noto Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.333px;
`;
const Infotext = styled.div`
  padding-top: 7px;
  color: #fff;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left; // 수정된 부분
  margin-left: 152px;
`;

const Body = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100vh; /* 최소 높이를 화면의 전체 높이로 설정합니다. */
  flex-direction: column;
  align-items: center;

  gap: 20px;
  flex-shrink: 0;
  overflow-y: auto; /* 필요할 때만 스크롤이 나타나도록 설정합니다. */
`;
const Iconbox = styled.div`
  display: flex;
  gap: 130px;
  position: relative;
`;

const Reviewicon = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;

  img {
    transition: filter 0.3s;
  }

  &:hover {
    img {
      filter: brightness(1.2);
    }
  }
`;

const Bookmarkicon = styled.div`
  width: 40px;
  height: 40px;
  margin-top: -10px;
  flex-shrink: 0;
  cursor: pointer;

  img {
    transition: filter 0.3s;
  }

  &:hover {
    img {
      filter: brightness(1.2);
    }
  }
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

// Separator 컴포넌트를 아이콘 상자 안에 위치시킵니다.
const Separator1 = styled.div`
  position: absolute;
  bottom: 0;
  height: 1px;
  width: 100%;
  left: -50%;
  background-color: #c4c4c4;
  transition: background-color 0.3s;

  ${Iconbox}:hover & {
    background-color: ${(props) => (props.isSelected ? "#519a09" : "#c4c4c4")};
  }
`;

const Separator2 = styled.div`
  position: absolute;
  bottom: 0;
  height: 1px;
  width: 100%;
  background-color: #c4c4c4;
  left: 50%;
  transition: background-color 0.3s;

  ${Iconbox}:hover & {
    background-color: ${(props) => (props.isSelected ? "#519a09" : "#c4c4c4")};
  }
`;
const Mypage = () => {
  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate("/Main");
  };

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [drivingLicense, setDrivingLicense] = useState("");
  const [registrationLicense, setRegistrationLicense] = useState("");
  const [registrationLicensePreview, setRegistrationLicensePreview] =
    useState("");
  const [drivingLicensePreview, setDrivingLicensePreview] = useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputFilled, setIsInputFilled] = useState(false);
  //reviewicon, bookmarkicon 선택시 색상 변화 함수
  const [isReviewSelected, setIsReviewSelected] = useState(false);
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(true);

  const SERVER = process.env.REACT_APP_SERVER;

  const handleReviewIconClick = () => {
    setIsReviewSelected(true);
  };

  const handleBookmarkIconClick = () => {
    setIsBookmarkSelected(true);
  };
  const handleLicenseBoxClick = () => {
    navigate("/Carregist");
  };

  useEffect(() => {
    // 로컬스토리지에서 userId 가져오기
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const fetchToken = async () => {
      try {
        await axios
          .get(`${SERVER}/users/info?userId=${userId}`)
          .then((response) => {
            // 디버그용 출력문
            console.log("유저 정보 정상 호출:", response.data);
            setName(response.data.name);
            setProfileImage(response.data.profileImage);

            navigate("/Mypage");
          });
      } catch (error) {
        console.error("계정 정보를 불러올 수 없음:", error);
      }
    };

    fetchToken();
  }, []);

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

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [divs, setDivs] = useState([]);
  const [failDivAdded, setFailDivAdded] = useState(false);

  const BACKEND_URL = "" || "";
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCameraIconClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  const handleModal = () => {
    setIsOpen1(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");

    const drivingLicenseFile =
      document.getElementById("drivingLicense")?.files[0];
    const registrationCardFile = document.getElementById("registrationLicense")
      ?.files[0];

    if (!drivingLicenseFile || !registrationCardFile) {
      console.error("Please upload both files.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("drivingLicense", drivingLicenseFile);
    formData.append("registrationCard", registrationCardFile);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/register-car/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registration successful:", response.data);
      // Add any necessary logic here for a successful registration
    } catch (error) {
      console.error("Registration failed:", error);
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
          <Topbox>
            <Topbar>
              <Back>
                <img
                  src={`${process.env.PUBLIC_URL}/images/whitebackbtn.png`}
                  alt="back"
                  onClick={() => navigate(-1)}
                />
              </Back>
              <Toptitle>MY PAGE</Toptitle>
              <Settingicon>
                <img
                  src={`${process.env.PUBLIC_URL}/images/setting2_white.png`}
                  alt="setting"
                  onClick={() => navigate(-1)}
                />
              </Settingicon>
            </Topbar>
            <Profileicon>
              {selectedImage ? (
                <ProfileImage src={selectedImage} alt="selected" />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/images/profileicon.png`}
                  alt="profile"
                />
              )}
            </Profileicon>
            <Cameraicon onClick={handleCameraIconClick}>
              <img
                src={`${process.env.PUBLIC_URL}/images/camera_mypage.png`}
                alt="cameraicon"
              />
            </Cameraicon>
            <Licensebox onClick={handleLicenseBoxClick}>
              <Licenseicon>
                <img
                  src={`${process.env.PUBLIC_URL}/images/license_icon.png`}
                  alt="licenseicon"
                />
              </Licenseicon>
              <Licensetext>친환경 자동차 등록하기</Licensetext>
            </Licensebox>
            <Namebox>
              <Username>{name}</Username>
              <Usertext>드라이버님</Usertext>
            </Namebox>
            <Infotext>
              구독권 이용을 원하신다면
              <br />
              친환경 자동차 인증이 필요해요!
            </Infotext>
          </Topbox>
          <Iconbox>
            <Reviewicon
              onClick={() => {
                handleReviewIconClick();
                setIsBookmarkSelected(false);
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/reviewicon${
                  isReviewSelected ? "_green" : ""
                }.png`}
                alt="reviewicon"
              />
            </Reviewicon>
            <Bookmarkicon
              onClick={() => {
                handleBookmarkIconClick();
                setIsReviewSelected(false);
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/bookmarkicon${
                  isBookmarkSelected ? "_green" : ""
                }.png`}
                alt="bookmarkicon"
              />
            </Bookmarkicon>
            <Separator1 isSelected={isReviewSelected} />
            <Separator2 isSelected={isBookmarkSelected} />
          </Iconbox>
        </Body>
      </BodyWrapper>

      <Nav />
    </Container>
  );
};
export default Mypage;
