import React, { useContext, useEffect, useState } from "react";
import { ReviewStateContext } from "../../App";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "../../components/Nav";
import MyHeader from "../../components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #ffffff;
  -ms-overflow-style: none;
  max-width: 100%;
  justify-content: center;
  align-items: center;

  @media (hover: hover) {
    width: 100%;
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Body = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
  flex-shrink: 0;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const BodyWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  width: 393px;
  height: 852px;
`;

const Logo = styled.h1`
  color: #519a09;
  font-family: "Righteous", cursive;
  font-size: 30px;
  margin: 0;
`;

const Title = styled.div`
  width: 122px;
  height: 70px;
  left: 135px;
  top: 110px;
  bottom: 100px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 235%;
  display: flex;
  align-items: center;
  color: #000000;
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
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const Icon = styled.img`
  width: 20px; // adjust the size as needed
  height: 20px;
  margin-right: 5px; // adjust the spacing as needed
`;

const ReviewHome = (props) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [isReviewSelected, setIsReviewSelected] = useState(false);
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [publicSpaceName, setPublicSpaceName] = useState("");
  const [publicSpaceId, setPublicSpaceId] = useState(id);
  const [publicSpaceType, setPublicSpaceType] = useState("");
  const [publicSpaceTime, setPublicSpaceTime] = useState("");
  const [publicPhoneNumber, setPublicPhoneNumber] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [publicBasicTime, setPublicBasicTime] = useState("");
  const [publicBasicCharge, setPublicBasicCharge] = useState("");
  const [publicAddUnitTime, setPublicAddUnitTime] = useState("");
  const [publicAddUnitCharge, setPublicAddUnitCharge] = useState("");
  const [publicDayTicketTime, setPublicDayTicketTime] = useState("");
  const [publicDayTicketCharge, setPublicDayTicketCharge] = useState("");
  const [publicMonthTicketCharge, setPublicMonthTicketCharge] = useState("");
  const [publicPlusInfo, setPublicPlusInfo] = useState("");

  const PUBLIC_DATA_KEY = process.env.REACT_APP_PUBLIC_DATA_KEY;

  const handleReviewIconClick = () => {
    setIsReviewSelected(true);
    setIsBookmarkSelected(false);
    navigate(`/ReviewShow/${id}`);
  };

  const handleBookmarkIconClick = () => {
    setIsBookmarkSelected(true);
  };
  const handleLicenseBoxClick = () => {
    navigate("/ReviewList");
  };

  const fetchData = async () => {
    try {
      setError(null);
      setData(null);
      setLoading(true);
      await axios
        .get(`http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api`, {
          params: {
            serviceKey: decodeURIComponent(PUBLIC_DATA_KEY),
            pageNo: 1,
            numOfRows: 10,
            type: "JSON",
            prkplceNo: publicSpaceId,
          },
        })
        .then((response) => {
          // 디버그용 출력문
          console.log("공공데이터 포털 데이터 정상 응답 :", response.data);
          setData(response.data);

          const publicData = response.data.response.body.items[0];
          console.log("주차장 기반 응답 : ", publicData);

          const today = new Date();
          const dayOfWeek = today.getDay();
          if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            // 주중
            setPublicSpaceTime(
              `주중 운영 시간: ${publicData.weekdayOperOpenHhmm} ~ ${publicData.weekdayOperColseHhmm}`
            );
          } else if (dayOfWeek === 6) {
            // 토요일
            setPublicSpaceTime(
              `토요일 운영 시간: ${publicData.satOperOperOpenHhmm} ~ ${publicData.satOperCloseHhmm}`
            );
          } else {
            // 공휴일 (=일요일)
            setPublicSpaceTime(
              `공휴일 운영 시간: ${publicData.holidayOperOpenHhmm} ~ ${publicData.holidayCloseOpenHhmm}`
            );
          }
          setPublicSpaceName(publicData.prkplceNm); // 주차장 이름
          setPublicSpaceType(publicData.prkplceSe); // 주차장 유형 (공영, 민영)
          setPublicPhoneNumber(publicData.phoneNumber); // 전화번호
          setPublicAddress(
            publicData.rdnmadr !== "" ? publicData.rdnmadr : publicData.lnmadr
          ); // 주차장 주소 (도로명 우선)
          setPublicBasicTime(publicData.basicTime); // 주차 기본 시간
          setPublicBasicCharge(publicData.basicCharge); // 주차 기본 요금
          setPublicAddUnitTime(publicData.addUnitTime); // 추가 단위 시간
          setPublicAddUnitCharge(publicData.addUnitCharge); // 추가 단위 요금
          setPublicDayTicketTime(publicData.dayCmmtktAdjTime); // 1일주차권 요금적용시간
          setPublicDayTicketCharge(publicData.dayCmmtkt); // 1일주차권 요금
          setPublicMonthTicketCharge(publicData.monthCmmtkt); // 월 정기권 요금
          setPublicPlusInfo(publicData.spcmnt); // 특이사항 (할인 관련 추가정보)
        });
    } catch (error) {
      console.error("공공데이터 포털 응답 오류:", error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (!data) return null;
  return (
    <div>
      <Container>
        <BodyWrapper>
          <Body>
            <MyHeader>
              <Logo>GreenDriver</Logo>
            </MyHeader>
            {/* <TitleLineA /> */}
            <Title>{publicSpaceName}</Title>

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
            <IconWrapper>
              <Icon
                src={`${process.env.PUBLIC_URL}/images/icon_marker.png`}
                alt="icon_marker"
              />
              <p>주소 : {publicAddress}</p>
            </IconWrapper>

            <IconWrapper>
              <Icon
                src={`${process.env.PUBLIC_URL}/images/icon_clock.png`}
                alt="icon_clock"
              />
              <p>시간 : {publicSpaceTime}</p>
            </IconWrapper>

            <IconWrapper>
              <Icon
                src={`${process.env.PUBLIC_URL}/images/icon_phone.png`}
                alt="icon_phone"
              />
              <p>전화번호 : {publicPhoneNumber}</p>
            </IconWrapper>

            <IconWrapper>
              <Icon
                src={`${process.env.PUBLIC_URL}/images/icon_coin.png`}
                alt="icon_coin"
              />
              <p>요금: {publicBasicCharge}</p>
            </IconWrapper>

            <IconWrapper>
              <Icon
                src={`${process.env.PUBLIC_URL}/images/icon_globe.png`}
                alt="icon_globe"
              />
              <p>특이사항 : {publicPlusInfo}</p>
            </IconWrapper>
          </Body>
          <Nav />
        </BodyWrapper>
      </Container>
    </div>
  );
};

export default ReviewHome;
