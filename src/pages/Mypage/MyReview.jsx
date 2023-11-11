import React,{useState, useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { FaHeart, FaMap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
    width: 130px;
    height: 90px; 
    overflow: hidden;
    background-color: #70CA16;
    float: left;
    margin-right: 10px;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
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
p{
  color: gray;
}
`
const InfoDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 90px;

`
const IconImg = styled.img`
width: 60%;
`

const BACKEND_URL = axios.create({
    baseURL: process.env.REACT_APP_SERVER, //백엔드 서버 주소
});

const MyReview = ({isDropDown, getUserReviewLength}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userReview, setUserReview] = useState([]);
    const navigate = useNavigate();

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
  function gotoBookmarkDetails(id) {
    navigate(`/review/${id}`);
  }
  
    
  return (
      <Container style={{height: isDropDown ? '400px' : '0'}}>
          <ReviewStyled >
            {userReview.map((item, index) => (
                <ReviewElements onClick={() => gotoBookmarkDetails(item.id)} key={index} >
                <ImgBox>
                  {item.image.data !== "" ?
                    <ReviewImg src={`data:image/png;base64,${item.image.data}`} /> :
                    <IconImg src={`${process.env.PUBLIC_URL}/images/greenDrive_Icon.png`}
                    alt="logo_icon"/>}
                  {/* <FaMap size="30" color="#eeeeee"/>} */}
                </ImgBox>
               <InfoDiv>
                  <h5>{item.content}</h5>
                  
                  <BottomInfos>
                    <p>{item.date}</p>
                    <Likes><FaHeart size="15" color="#519A09"/><p>{item.likes}</p></Likes>
                  </BottomInfos>
               </InfoDiv>
                
              </ReviewElements>
            ))}
            
        </ReviewStyled></Container>
  )
}

export default MyReview