import React,{useState, useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
  transition: height 0.3s ease;

`
const BookmarkStyled = styled.ul`
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
const BookmarkElements = styled.li`
  width: 90%;
  text-align: left;
  border-radius: 10px;
  padding: 10px;
  word-break: keep-all;
  cursor: pointer;
  overflow: hidden;

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
    background-color: lightgray;
    float: left;
    margin-right: 10px;
    user-select: none;
`
const UserProfileImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const BACKEND_URL = axios.create({
    baseURL: process.env.REACT_APP_SERVER, //백엔드 서버 주소
});

const MyBookmark = ({gotoBookmarkDetails, isDropDown, getUserBookmarkLength}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userBookmark, setUserBookmark] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setIsLogin(true);
      getBookmark(localStorage.getItem('userId'));
    }
  }, []);

    //즐겨찾기 조회
    const getBookmark = async (userId) => {
        try {
            const response = await BACKEND_URL.get(`/users/favorites?userId=${userId}`);
            const items = response.data;
          setUserBookmark(items);
          getUserBookmarkLength(items.length);
        } catch (error) {
            console.error("Error:", error.message);
        }
  };
  
    
  return (
      <Container style={{height: isDropDown ? '400px' : '0'}}>
          <BookmarkStyled >
            {userBookmark.map((item, index) => (
                <BookmarkElements onClick={gotoBookmarkDetails} key={index} >
                <ImgBox>
                    <UserProfileImg/>
                </ImgBox>
                <h5>{item.parkName}</h5>
                <p>{item.address}</p>
              </BookmarkElements>
            ))}
            
        </BookmarkStyled></Container>
  )
}

export default MyBookmark