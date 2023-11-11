import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Nav from "../../components/Nav";
import MyBookmark from "./MyBookmark";
import MyReview from "./MyReview";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
  overflow-x: hidden;
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
const ShowContents = styled.div`
  width: 100%;
`;
const ListDropDown = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  p {
    margin: 0;
  }
`;

const Mypage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [resLength, setLength] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [isOpen1, setIsOpen1] = useState(false);
  const [isReviewSelected, setIsReviewSelected] = useState(true);
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isJudged, setIsJudged] = useState(localStorage.getItem("isJudged"));
  const [subMessage, setSubMessage] = useState("로딩 중 에러가 발생했습니다.");

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
    const fetchToken = async () => {
      try {
        await axios
          //.get(`${SERVER}/users/info?userId=${userId}`)
          .all([
            axios.get(`${SERVER}/users/info?userId=${userId}`),
            axios.get(`${SERVER}/subscriptions/${userId}`),
          ])
          .then(
            axios.spread((response, res2) => {
              setName(response.data.name);
              setSelectedImage(response.data.profileImage);
              setIsJudged(response.data.isJudged);
              setLength(res2.data.length);
              console.log(isJudged);
              console.log("구독어쩌고 : ", res2.data.length);
            })
          );

        // .then((response) => {
        //   console.log("유저 정보 정상 호출:", response.data);

        // });
      } catch (error) {
        console.error("계정 정보를 불러올 수 없음:", error);
      }
    };

    fetchToken();
  }, [userId]);

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

  const handleCameraIconClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("image", file);

        try {
          console.log(file);
          const response = await axios.patch(
            `${SERVER}/users/profile-image`,
            formData
          );
          setSelectedImage(response.data.profileImage);
          console.log("전송 후 반환된 값 : ", response.data);
        } catch (error) {
          // 에러 로그 출력
          console.error("Upload failed", error);
        }
      }
    };
    input.click(); // 입력 요소 클릭 이벤트 실행
  };

  useEffect(() => {
    function changeMessage() {
      switch (isJudged) {
        case 1:
          setSubMessage("구독 잔여 횟수 : " + resLength);
          break;
        case 2:
          setSubMessage("등록한 자동차 인증 진행중입니다");
          break;
        default:
          setSubMessage("구독이 필요합니다!");
      }
    }
    changeMessage();
  }, [isJudged]);

  const [isDropDown, setIsDropDown] = useState(true);
  function handleDropDown() {
    setIsDropDown(!isDropDown);
  }
  const [userBookmarkLength, getUserBookmarkLength] = useState(0);
  const handleUserBookmarkLength = (isSearch) => {
    getUserBookmarkLength(isSearch);
  }
  const [userReviewLength, getUserReviewLength] = useState(0);
  const handleUserReviewLength = (isSearch) => {
    getUserReviewLength(isSearch);
  }
  const [nowSelectedContents, setNowSelectedContents] = useState(0);
  

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
                <ProfileImage
                  src={`data:image/png;base64,${selectedImage}`}
                  alt="selected"
                />
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
            <Infotext>{subMessage}</Infotext>{" "}
          </Topbox>
          <Iconbox>
            <Reviewicon
              onClick={() => {
                handleReviewIconClick();
                setIsBookmarkSelected(false);
                setNowSelectedContents(0);
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
                setNowSelectedContents(1);
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
          <ListDropDown >
            <p>{nowSelectedContents ? `즐겨찾기 ${userBookmarkLength}개`:`내가 쓴 리뷰 ${userReviewLength}개`}</p>
            <div onClick={handleDropDown}>{isDropDown ? <FaChevronDown/> : <FaChevronUp/>}</div>
          </ListDropDown>
          <ShowContents>{nowSelectedContents  ?
            <MyBookmark isDropDown={isDropDown} getUserBookmarkLength={handleUserBookmarkLength} /> :
            <MyReview isDropDown={isDropDown} getUserReviewLength={handleUserReviewLength} />}</ShowContents>
        </Body>
      </BodyWrapper>

      <Nav />
    </Container>
  );
};
export default Mypage;
