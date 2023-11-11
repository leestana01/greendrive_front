import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Kakao from "../Kakao";
import Kakao from "../Kakao_test";
import Nav from "./Nav";
import Header from "./Header";
import Bookmark from "./Bookmark";
import SearchList from "./SearchList";

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
  padding-bottom: 0;
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
  // background-color: white;
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
  z-index: 3;
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
    baseURL: process.env.REACT_APP_SERVER, //백엔드 서버 주소
});
  
// function
function LandingPage() {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");
  const [dataType, setDataType] = useState(null);
  const [mark, setMark] = useState([]);
  const [isMapDetail, setIsMapDetail] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  //데이터 불러오기
  const initBookmark = async (data) => {
    try {
      const response = await BACKEND_URL.get(`/spaces${data}`);
      const items = response.data;
      setMark(items);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    initBookmark("");
  }, []);

  const onChange = (e) => {
    setInputText(e.target.value);
  };
  
  const navigate = useNavigate();
  
  const gotoBookmarkDetails = () => {
    // navigate('/');
  }
  const gotoMapDetail = () => {
    setIsMapDetail(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (InputText.includes('공영')) {
      initBookmark("/search?keyword=공영");
      setDataType(0);
    }
    else if (InputText.includes('민영')) {
      initBookmark("/search?keyword=민영");
      setDataType(1);
    }
    else {
      // initBookmark("");
      setDataType(null);
      setPlace(InputText);
      setIsSearch(true);
    }
    setInputText("");
  };

  const handleIsMapDetail = (isMapDetail) => {
    setIsMapDetail(isMapDetail);
  }
  const handleIsSearch = (isSearch) => {
    setIsSearch(isSearch);
  }


  return (
    <Container>
      <BodyWrapper style={{
        paddingLeft: isMapDetail ? '0px' : '30px',
        paddingRight: isMapDetail ? '0px' : '30px',
        paddingBottom: isMapDetail ? '0px' : '30px',
      }}>
        <div className={isMapDetail ? "fadeOff" : ""}>
          <Header /></div>
        <div style={{
          position: isMapDetail ? 'absolute' : 'static',
          zIndex: 1,
          width: '100%'
        }}>
          <SearchList mark={mark} searchPlace={Place} isSearch={isSearch}/>
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
              placeholder="지역을 입력하세요"
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
        <Bookmark isMapDetail={isMapDetail} 
        
          gotoBookmarkDetails={gotoBookmarkDetails}
        />

        
        <div onClick={gotoMapDetail}
          style={{
            overflow: "hidden",
            height: isMapDetail? "90vh": "auto"
          }}>
          <Kakao searchPlace={Place}
            isMapDetail={isMapDetail}
            Mark={mark}
            dataType={dataType}
          />
        </div >
      </BodyWrapper>
      <Nav getIsMapDetail={handleIsMapDetail} getIsSearch={handleIsSearch} />
    </Container>
  );
}

export default LandingPage;
