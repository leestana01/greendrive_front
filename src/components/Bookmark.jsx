import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import {  FaBookmark,FaWindowClose } from 'react-icons/fa';

const BookmarkStyled = styled.div`
  margin: 10px auto;
  margin-bottom: 0;
  display: flex;
  .fadeOff{
    display: none;
  }
  width: auto;
  overflow-x: auto;
  padding-bottom: 20px;
  
  
`;
const BookmarkElements = styled.div`
  min-width: 42%;
  min-height: 60px;
  text-align: left;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
  word-break: keep-all;
  cursor: pointer;
  svg{
    float: right;
  }
  h5{
    padding-top: 10px;
    padding-bottom: 5px;
    margin: 0;
  }
  p{
    margin: 0;
    font-size: 10px;
  }
`;

const BACKEND_URL = axios.create({
    baseURL: process.env.REACT_APP_SERVER, //백엔드 서버 주소
});

const Bookmark = ({isMapDetail, gotoBookmarkDetails}) => {
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
            //사용자 즐겨찾기 조회
            // console.log(items);
            setUserBookmark(items);
        } catch (error) {
            console.error("Error:", error.message);
        }
  };
  
  const deleteBookmark = async (spaceId) => {
  try {
    const response = await BACKEND_URL.delete('/users/favorites', {
      data: {
        userId: localStorage.getItem("userId"),
        spaceId: spaceId
      }
    });
    console.log("Success delete bookmark", response.data);
    const updatedItems = userBookmark.filter(item => item.id !== spaceId);
    // 새로운 배열을 상태로 설정
    setUserBookmark(updatedItems);
  } catch (error) {
    console.error("Error:", error.message);
  }
};


  return (
      <div>
          <BookmarkStyled className={isMapDetail ? "fadeOff" : ""}>
            {userBookmark.map((item, index) => (
              <BookmarkElements key={index} >
                <FaWindowClose size="15" color="red" onClick={() => deleteBookmark(item.id)} />
                <FaBookmark size="15" color="green" />
                <div onClick={gotoBookmarkDetails}>
                  <h5>{item.parkName}</h5>
                  <p>{item.address}</p>
                </div>
              </BookmarkElements>
            ))}
            
        </BookmarkStyled></div>
  )
}

export default Bookmark