import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch, FaRegBookmark } from 'react-icons/fa';
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
  padding: 30px;
`;
const InputFrom = styled.form`
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input{
    height: 30px;
    width: 80%;
    padding: 5px;
    padding-left: 10px;
    border-radius: 7px;
    border: none;
    outline: none;
    box-shadow: 3px 3px 5px rgb(226, 231, 244) inset;
  }
  button{
    background: none;
    border: none;
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

const BACKEND_URL = axios.create({
    baseURL: "http://localhost:4000/records" //백엔드 서버 주소
});
  
// function
function LandingPage() {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");
  const [bookmarkList, setBookmarkList] = useState([]);

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
  const gotoBookmarkDetails = () => {
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText("");
  };


  return (
    <Container>
      <BodyWrapper>
        <Header />
        <InputFrom onSubmit={handleSubmit}>
          <input
            placeholder="주소를 입력하세요"
            onChange={onChange}
            value={InputText}
          />
          <button type="submit"><FaSearch size="30" color="green"/></button>
        </InputFrom>
        <Bookmark>
            {bookmarkList.map((item, index) => (
              <BookmarkElements onClick={gotoBookmarkDetails} key={index} >
                <FaRegBookmark size="15" color="green" />
                <h5>{item.주차장명}</h5>
                <p>{item.소재지도로명주소}</p>
              </BookmarkElements>
            ))}
          </Bookmark>
        <Kakao searchPlace={Place} />
      </BodyWrapper>
      <Nav />
    </Container>
  );
}

export default LandingPage;
