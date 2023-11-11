import React,{useState, useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { FaHeart, FaMap } from 'react-icons/fa';

const Container = styled.div`
  overflow: hidden;
  transition: height 0.3s ease;

`
const ReviewStyled = styled.ul`
  margin: 10px auto;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .fadeOff{
    display: none;
  }
  width: auto;
  padding-left: 10px;


`;
const ReviewElements = styled.li`
  width: 90%;
  text-align: left;
  padding: 10px;
  word-break: keep-all;
  cursor: pointer;
  overflow: hidden;
  border-bottom: 1px solid #ddd;

  h5{
    font-size: 14px;
    font-weight: bold;
    margin: 3px;
  }
  p{
    font-size: 13px;
    margin: 3px;
  }
`;
const ImgBox = styled.div`
    width: 50px;
    height: 50px; 
    border-radius: 50%;
    overflow: hidden;
    background-color: lightgreen;
    float: left;
    margin-right: 10px;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ReviewImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Likes = styled.div`
display: flex;
align-items: center;
float: right;
p{
  color: gray;
  margin-left: 5px;
}
`
const BottomInfos = styled.div`
display: flex;
justify-content: space-between;
`

const BACKEND_URL = axios.create({
    baseURL: process.env.REACT_APP_SERVER, //백엔드 서버 주소
});

const MyReview = ({isDropDown, getUserReviewLength}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userReview, setUserReview] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setIsLogin(true);
      getUserId(localStorage.getItem('userId'));
    }
  }, []);

    //즐겨찾기 조회
    const getUserId = async (userId) => {
        try {
            const response = await BACKEND_URL.get(`/reviews/user/${userId}`);
            const items = response.data;
          setUserReview(items);
          getUserReviewLength(items.length);
        } catch (error) {
            console.error("Error:", error.message);
        }
  };
  function gotoBookmarkDetails() {
    // navigate("/bookmarkDetails");
  }
  
    
  return (
      <Container style={{height: isDropDown ? '400px' : '0'}}>
          <ReviewStyled >
            {userReview.map((item, index) => (
                <ReviewElements onClick={gotoBookmarkDetails} key={index} >
                <ImgBox>
                  {item.image.data !== "" ? 
                  <ReviewImg src={`data:image/png;base64,${item.image.data}`} /> :
                  <FaMap/>}
                </ImgBox>
                <h5>{item.content}</h5>
                
                <BottomInfos>
                  <p>{item.date}</p>
                  <Likes><FaHeart size="15" color="green"/><p>{item.likes}</p></Likes>
                </BottomInfos>
                
              </ReviewElements>
            ))}
            
        </ReviewStyled></Container>
  )
}

export default MyReview