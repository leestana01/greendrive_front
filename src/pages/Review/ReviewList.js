// import React, { useContext, useEffect, useState } from "react";
// import { ReviewStateContext } from "../../App";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';


// import MyHeader from "../../components/Header";
// // import HeaderMenu from "../../components/HeaderMenu";
// import ReviewList from "../../components/ReviewList";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   position: relative;
//   text-align: center;
//   background-color: #ffffff;
//   -ms-overflow-style: none;
//   max-width: 100%;
//   justify-content: center;
//   align-items: center;

//   @media (hover: hover) {
//     width: 100%;
//     margin: 0 auto;
//   }

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const Body = styled.div`
//   display: flex;
//   gap: 10px;
//   flex-direction: column;
//   align-items: center; /* Center horizontally */
//   justify-content: center; /* Center vertically */
//   flex-shrink: 0;
//   margin: 0 auto;
//   margin-top: 10px;
// `;

// const BodyWrapper = styled.div`
//   flex: 1;
//   overflow: hidden;
//   width: 393px;
//   height: 852px;
  
// `;

//   // const TitleLineA = styled.div`
//   //   width: 100%;
//   //   height: 0px;
//   //   top: 125px;
//   //   border: 0.1px solid #DDDDDD;
//   // `;

//   const Logo = styled.h1`
//     color: #519A09;
//     font-family: 'Righteous', cursive;
//     font-size: 30px;
//     margin: 0;
//   `;

//   const Title = styled.div`
//     width: 122px;
//     height: 70px;
//     left: 135px;
//     top: 110px;
//     bottom: 100px;
//     font-style: normal;
//     font-weight: 700;
//     font-size: 16px;
//     line-height: 235%;
//     display: flex;
//     align-items: center;
//     color: #000000;
//   `;

//   const Iconbox = styled.div`
//   display: flex;
//   gap: 130px;
//   position: relative;
// `;

// const Reviewicon = styled.div`
//   width: 24px;
//   height: 24px;
//   flex-shrink: 0;
//   cursor: pointer;

//   img {
//     transition: filter 0.3s;
//   }

//   &:hover {
//     img {
//       filter: brightness(1.2);
//     }
//   }
// `;

// const Bookmarkicon = styled.div`
//   width: 40px;
//   height: 40px;
//   margin-top: -10px;
//   flex-shrink: 0;
//   cursor: pointer;

//   img {
//     transition: filter 0.3s;
//   }

//   &:hover {
//     img {
//       filter: brightness(1.2);
//     }
//   }
// `;
// const Separator1 = styled.div`
//   position: absolute;
//   bottom: 0;
//   height: 1px;
//   width: 100%;
//   left: -50%;
//   background-color: #c4c4c4;
//   transition: background-color 0.3s;

//   ${Iconbox}:hover & {
//     background-color: ${(props) => (props.isSelected ? "#519a09" : "#c4c4c4")};
//   }
// `;

// const Separator2 = styled.div`
//   position: absolute;
//   bottom: 0;
//   height: 1px;
//   width: 100%;
//   background-color: #c4c4c4;
//   left: 50%;
//   transition: background-color 0.3s;

//   ${Iconbox}:hover & {
//     background-color: ${(props) => (props.isSelected ? "#519a09" : "#c4c4c4")};
//   }
// `;

// const ReviewHome = (props) => {
//   const navigate = useNavigate();

//   // const reviewList = useContext(ReviewStateContext);
//   // const [data, setData] = useState([]);
  
//   const [isReviewSelected, setIsReviewSelected] = useState(false);
//   const [isBookmarkSelected, setIsBookmarkSelected] = useState(true);

//   const handleReviewIconClick = () => {
//     setIsReviewSelected(true);
//   };

//   const handleBookmarkIconClick = () => {
//     setIsBookmarkSelected(true);
//   };
//   const handleLicenseBoxClick = () => {
//     navigate("/ReviewShow");
//   };

//   // useEffect(() => { 
//   //   const titleElement = document.getElementsByTagName("title")[0];
//   //   titleElement.innerHTML = `제목`;
//   // }, []);

//   // useEffect(() => {
//   //   // 여기에 useEffect 코드를 작성하세요
//   // }, [reviewList]);


// // const [loading, setLoading] = useState<boolean>(true);
// //   const [items, setItems] = useState<IlistWithMemo[]>([]);
// //   const [page, setPage] = useState<number>(1);
// //   const SERVICE_KEY = process.env.REACT_APP_PUBLIC_DATA_KEY;

//   const URL = "http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api";

// const response = axios.get(URL, {
//     params: {
//       serviceKey: process.env.EACT_APP_PUBLIC_DATA_KEY,
//       numOfRows: 1,
//       pageNo: 10
//     }
// });
// const fetchData = async () => {
//   try {
//     setError(null);
//     setData(null);
//     setLoading(true);

//     const response = await axios.get(URL, {
//       params: {
//         serviceKey: process.env.REACT_APP_API_KEY,
//         numOfRows: 1,
//         pageNo: 10
//       }
//     });

//     setData(response.data);
//   } catch(e) {
//     setError(e);
//   }
//   setLoading(false);
// };

// useEffect(() => {
//   fetchData();
// }, []);

// if(loading) return <div>Loading...</div>;
// if(error)   return <div>Error...</div>;
// if(!data)   return null;


//   return (
//     <div>
//       <Container>
//         <BodyWrapper>
//           <Body>
//             <MyHeader>
//               <Logo>GreenDriver</Logo>
//             </MyHeader>
//             {/* <TitleLineA /> */}
//             <Title>{prkplceNm}</Title> 

//             <Iconbox>
//             <Reviewicon
//               onClick={() => {
//                 handleReviewIconClick();
//                 setIsBookmarkSelected(false);
//               }}
//             >
//               <img
//                 src={`${process.env.PUBLIC_URL}/images/reviewicon${
//                   isReviewSelected ? "_green" : ""
//                 }.png`}
//                 alt="reviewicon"
//               />
//             </Reviewicon>
//             <Bookmarkicon
//               onClick={() => {
//                 handleBookmarkIconClick();
//                 setIsReviewSelected(false);
//               }}
//             >
//               <img
//                 src={`${process.env.PUBLIC_URL}/images/bookmarkicon${
//                   isBookmarkSelected ? "_green" : ""
//                 }.png`}
//                 alt="bookmarkicon"
//               />
//             </Bookmarkicon>
//             <Separator1 isSelected={isReviewSelected} />
//             <Separator2 isSelected={isBookmarkSelected} />
//           </Iconbox>
//           <p>주소 : { data.response.body.items.item.rdnmadr }</p>
//           <p>시간 : { data.response.body.items.item.operDay }</p>
//         <p>전화번호 : { data.response.body.items.item.parkingchrgeInfo }</p>
//        <p>요금: { data.response.body.items.item.phoneNumber }</p>
//         <p>특이사항 : { data.response.body.items.item.spcmnt }</p>

//           </Body>
//         </BodyWrapper>
//       </Container>
//     </div>
//   );
// };

// export default ReviewHome;
