import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import {  FaRegBookmark } from 'react-icons/fa';

const BookmarkStyled = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  .fadeOff{
    display: none;
  }
  // overflow-x: auto;
  // overflow-y: visible;
  
`;
const BookmarkElements = styled.div`
  width: 42%;
  min-height: 60px;
  text-align: left;
  border-radius: 10px;
  padding: 10px;
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
            getBookmark();
        }
    }, []);



     //즐겨찾기 조회
    const getBookmark = async () => {
        try {
            const response = await BACKEND_URL.get('/users/favorites?userId=testuser1');
            const items = response.data;
            //사용자 즐겨찾기 조회
            // console.log(items);
            setUserBookmark(items);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

  return (
      <div>
          <BookmarkStyled className={isMapDetail ? "fadeOff" : ""}>
            {userBookmark.map((item, index) => (
              <BookmarkElements onClick={gotoBookmarkDetails} key={index} >
                <FaRegBookmark size="15" color="green" />
                <h5>{item.parkName}</h5>
                <p>{item.address}</p>
              </BookmarkElements>
            ))}
            
        </BookmarkStyled></div>
  )
}

export default Bookmark