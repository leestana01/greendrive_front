import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Add this line
import ReviewEditor from "../../components/ReviewEditor";
import styled from "styled-components";
import MyHeader from "../../components/Header";
import HeaderMenu from "../../components/HeaderMenu";
import { Navigate } from 'react-router-dom';
import Nav from "../../components/Nav";

const BASE_URL = 'http://api.greendrive.kro.kr';

const postReview = async (userId, reviewData) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews/user/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error('Failed to post review');
    }

    return response.json();
  } catch (error) {
    console.error('Error posting review:', error);
    throw error;
  }
};

const ReviewNew = (props) => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '장소제목 - 새 리뷰';  // titleElement.innerHTML 대신에 document.title 사용
  }, []);

  const handleReviewSubmit = async () => {
    try {
      // 리뷰를 서버에 직접 전송
      const reviewData = {
        reviewImage: 'reviewImage',
        content: 'Content',
        // 다른 리뷰 데이터 추가
      };

      await postReview('testuser1', reviewData);

      setRedirect(true);
    } catch (error) {
      // 에러 처리 로직 추가
      console.error('Error submitting review:', error);
    }
  };

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

  return (
    <div>
      {redirect && <Navigate to="/review-complete" />}  {/* Redirect 대신에 Navigate 사용 */}
      <Container>
        <BodyWrapper>
          <Body>
            <MyHeader>
              <Logo>GreenDriver</Logo>
            </MyHeader>
 
            {props.children}
            <ReviewEditor onSubmit={handleReviewSubmit} />
          
          </Body>
          <Nav/>
        </BodyWrapper>
      </Container>
    </div>
  );
};

export default ReviewNew;
