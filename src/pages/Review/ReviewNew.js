// import { useEffect, useState } from "react";
// import { Navigate } from 'react-router-dom';  // Redirect 대신에 Navigate 사용
// import ReviewEditor from "../../components/ReviewEditor";
// import styled from "styled-components";
// import MyHeader from "../../components/Header";
// import HeaderMenu from "../../components/HeaderMenu";

// const BASE_URL = 'http://api.greendrive.kro.kr';

// const postReview = async (userId, reviewData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/reviews/user/${userId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(reviewData),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to post review');
//     }

//     return response.json();
//   } catch (error) {
//     console.error('Error posting review:', error);
//     throw error;
//   }
// };

// const ReviewNew = (props) => {
//   const [redirect, setRedirect] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.title = '장소제목 - 새 리뷰';  // titleElement.innerHTML 대신에 document.title 사용
//   }, []);

//   const handleReviewSubmit = async () => {
//     try {
//       // 리뷰를 서버에 직접 전송
//       const reviewData = {
//         reviewImage: 'reviewImage',
//         content: 'Content',
//         // 다른 리뷰 데이터 추가
//       };

//       await postReview('testuser1', reviewData);

//       setRedirect(true);
//     } catch (error) {
//       // 에러 처리 로직 추가
//       console.error('Error submitting review:', error);
//     }
//   };

//   const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     min-height: 100vh;
//     position: relative;
//     text-align: center;
//     background-color: #ffffff;
//     -ms-overflow-style: none;
//     max-width: 100%;

//     @media (hover: hover) {
//       width: 100%;
//       margin: 0 auto;
//     }

//     &::-webkit-scrollbar {
//       display: none;
//     }
//   `;

//   const BodyWrapper = styled.div`
//     flex: 1;
//     overflow: auto;
//   `;

//   const Body = styled.div`
//     display: flex;
//     gap: 10px;
//     flex-direction: column;
//     align-items: flex-start;
//     flex-shrink: 0;
//     margin: 0 auto;
//     margin-top: 10px;
//     align-items: center;
//     justify-content: center;
//   `;

//   const Logo = styled.h1`
//     color: #519A09;
//     font-family: 'Righteous', cursive;
//     font-size: 30px;
//     margin: 0;
//   `;

//   return (
//     <div>
//       {redirect && <Navigate to="/review-complete" />}  {/* Redirect 대신에 Navigate 사용 */}
//       <Container>
//         <BodyWrapper>
//           <Body>
//             <MyHeader>
//               <Logo>GreenDriver</Logo>
//             </MyHeader>
//             <HeaderMenu />
//             {props.children}
//             <ReviewEditor onSubmit={handleReviewSubmit} />
//           </Body>
//         </BodyWrapper>
//       </Container>
//     </div>
//   );
// };

// export default ReviewNew;
