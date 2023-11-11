import React,{useState, useEffect} from 'react'
import axios from 'axios';

const BACKEND_URL = axios.create({
    baseURL: process.env.REACT_APP_SERVER, //백엔드 서버 주소
});

const My_bookmark = () => {
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
    <div>My_bookmark</div>
  )
}

export default My_bookmark