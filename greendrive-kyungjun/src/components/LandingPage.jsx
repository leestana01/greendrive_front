import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Kakao from "../Kakao";
import Nav from "./Nav";
import Header from "./Header";

//css
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #fffff;
  -ms-overflow-style: none;
  border: 1px solid black;

  /* 미디어 쿼리 적용 */
  @media (hover: hover) {
    width: 393px;
    height: 852px;
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BodyWrapper = styled.div`
  flex: 1;
  overflow: auto;
  transition: padding 0.3s ease;
  padding-top: 0;
  .fadeOff{
    display: none;
  }

`;
const InputForm = styled.form`
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  input{
    height: 30px;
    width: 80%;
    padding: 5px;
    padding-left: 10px;
    border-radius: 7px;
    border: none;
    outline: none;
    box-shadow: 3px 3px 5px rgb(226, 231, 244) inset;
    right: 0;
  }
  button{
    background: none;
    border: none;
    position: absolute;
    right: 30px;
  }
`;
const Bookmark = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
`;
const BookmarkElements = styled.div`
  width: 42%;
  height: 60px;
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
    padding-top: 15px;
    margin: 0;
  }
  p{
    margin: 0;
    font-size: 10px;
  }
`;
const Logo = styled.div`
  border-radius: 50%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 60px;
  height: 60px;
  img{
    width: 100%;
    height: 100%;
  }
`;

const BACKEND_URL = axios.create({
    baseURL: "http://localhost:4000/records" //백엔드 서버 주소
});
  
// function
function LandingPage() {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");
  const [bookmarkList, setBookmarkList] = useState([]);
  const [isMapDetail, setIsMapDetail] = useState(false);

  //데이터 불러오기
  const initBookmark = async () => {
    try {
      const response = await BACKEND_URL.get("");
      const items = response.data;
      setBookmarkList(items.slice(0, 2));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    initBookmark();
  }, []);

  const onChange = (e) => {
    setInputText(e.target.value);
  };
  
  const navigate = useNavigate();
  const gotoBookmarkDetails = () => {
    navigate('/');
  }
  const gotoMapDetail = () => {
    setIsMapDetail(!isMapDetail);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText("");
  };


  return (
    <Container>
      <BodyWrapper style={{
        paddingLeft: isMapDetail ? '0px' : '30px',
        paddingRight: isMapDetail ? '0px' : '30px',
        paddingBottom: isMapDetail ? '0px' : '30px',
      }}>

        <div className={isMapDetail ? "fadeOff" : ""}
          
        ><Header /></div>
        <div style={{
          position: isMapDetail ? 'absolute' : 'static',
          zIndex: 1,
          width: '100%' }}>
          <InputForm onSubmit={handleSubmit}
            style={{
              justifyContent: isMapDetail ? 'space-evenly' : 'space-between',
              marginRight: isMapDetail ? '10px' : '0',
            }}
          >
          <Logo className={isMapDetail ? "" : "fadeOff"}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
                  alt="logo"
                />
              </Logo>
            <input
              placeholder="주소를 입력하세요"
              onChange={onChange}
              value={InputText}
              style={{
                width: isMapDetail ? '60%' : '80%',
                height: isMapDetail ? '40px' : '30px',
              }}
            />
            <button type="submit"
              style={{
                position: isMapDetail ? 'absolute' : 'static' }}
            ><FaSearch size={isMapDetail ? "25":"30"} color="green" /></button>
          </InputForm>
        </div>
        <Bookmark className={isMapDetail ? "fadeOff" : ""}>
            {bookmarkList.map((item, index) => (
              <BookmarkElements onClick={gotoBookmarkDetails} key={index} >
                <FaRegBookmark size="15" color="green" />
                <h5>{item.주차장명}</h5>
                <p>{item.소재지도로명주소}</p>
              </BookmarkElements>
            ))}
        </Bookmark>
        
        <div onClick={gotoMapDetail}
          style={{
            overflow: "hidden",
            height: isMapDetail? "90vh": "auto"
          }}>
          <Kakao searchPlace={Place} isMapDetail={isMapDetail} />
        </div >
      </BodyWrapper>
      <Nav />
    </Container>
  );
}

export default LandingPage;
