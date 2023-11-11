import React,{useState, useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components';


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

const My_bookmark = ({gotoBookmarkDetails}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userBookmark, setUserBookmark] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('userId')) {
          setIsLogin(true);
          getBookmark(localStorage.getItem('userId'));
        }
    }, [])
    

    //즐겨찾기 조회
    const getBookmark = async (userId) => {
        try {
            const response = await BACKEND_URL.get(`/users/favorites?userId=${userId}`);
            const items = response.data;
            setUserBookmark(items);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }; 
  return (
      <div>
          <BookmarkStyled>
            {userBookmark.map((item, index) => (
              <BookmarkElements onClick={gotoBookmarkDetails} key={index} >
                <h5>{item.parkName}</h5>
                <p>{item.address}</p>
              </BookmarkElements>
            ))}
            
        </BookmarkStyled></div>
  )
}

export default My_bookmark