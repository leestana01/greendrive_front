import React, { useContext, useState, useEffect } from "react";
import { ReviewStateContext } from "../../App";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ReviewList from "../../components/ReviewList";
import MyHeader from "../../components/Header";
import Nav from "../../components/Nav";
import axios from 'axios';

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
`;

const BodyWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  width: 393px;
  height: 852px;
`;

const Logo = styled.h1`
  color: #519A09;
  font-family: 'Righteous', cursive;
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

const ReviewShow = (props) => {
  const navigate = useNavigate();
  const reviewList = useContext(ReviewStateContext);
  const [isReviewSelected, setIsReviewSelected] = useState(false);
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [publicSpaceName, setPublicSpaceName] = useState('');
  const [publicSpaceId, setPublicSpaceId] = useState("100-1-000004");


  const PUBLIC_DATA_KEY = process.env.REACT_APP_PUBLIC_DATA_KEY;

  const handleReviewIconClick = () => {
    setIsReviewSelected(true);
    setIsBookmarkSelected(false);
    navigate("/ReviewShow");
  };

  const handleBookmarkIconClick = () => {
    setIsBookmarkSelected(true);
  };
  const handleLicenseBoxClick = () => {
    navigate("/ReviewList");
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://api.greendrive.kro.kr/reviews/user/testuser1', {
          params: {
            userId: 'testuser1',
          },
        });

        // API 응답이 리뷰 배열을 포함한다고 가정
        setData(response.data);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []); 
  return (
    <div>
      <Container>
        <BodyWrapper>
          <Body>
            <MyHeader>
              <Logo>GreenDriver</Logo>
            </MyHeader>
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
            <ReviewList reviewList={reviewList} />
          </Body>
          <Nav />
        </BodyWrapper>
      </Container>
    </div>
  );
};

export default ReviewShow;
