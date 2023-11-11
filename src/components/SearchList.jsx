import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaRegBookmark } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  text-align: center;
  background-color: #ffffff;
  -ms-overflow-style: none;
  z-index: 3;
  transition: width 0.3s ease;
  padding-top: 50px;
  padding-left: 5%;
  padding-right: 5%;
  overflow: auto;
  width: 90%;
  height: 80%;

  /* 미디어 쿼리 적용 */
  @media (hover: hover) {
    margin: 0 auto;
  }
  .fadeOff{
    width: 0;
  }
  .fadeOn{
    width: 80%;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
const SearchListUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
  height: 70%;
  width: 100%;
  overflow: scroll;
`
const SearchListLi = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  :hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
  svg{
    float: right;
    cursor: pointer;
    padding-right: 10px;
  }
`

const BACKEND_URL = axios.create({
    baseURL: process.env.REACT_APP_SERVER, //백엔드 서버 주소
});

const SearchList = ({mark, searchPlace, isSearch}) => { //props를 둘 이상 받을 때는 중괄호로 묶기{}
  // const navigate = useNavigate();
  const [searchArea, setSearchArea] = useState([]);


  useEffect(() => {
    setSearchArea(prevSearchArea => []);
    if (searchPlace) {
      handleSearchArea(searchPlace);
    }
  }, [searchPlace]);
  

  const getNearLocation = async (search) => {
        try {
          const response = await BACKEND_URL.get(`/spaces/search?keyword=${search}`);
          const items = response.data;
          setSearchArea(items);
        } catch (error) {
            console.error("Error:", error.message);
        }
  };
  function handleSearchArea(searchPlace) {
    getNearLocation(searchPlace);
    console.log(searchArea);
  }

  function gotoParkingDetails() {
    // console.log(searchArea);
  }
  //즐겨찾기 추가
  const setBookmark = async (spaceId) => {
      try {
        const response = await BACKEND_URL.post('/users/favorites',
          {
            "userId": `${localStorage.getItem("userId")}`,
            "spaceId": `${spaceId}`
          }
        );
        console.log("Success post bookmark"); 
      } catch (error) {
          console.error("Error:", error.message);
      }
    };

  return (
    <Container className={isSearch ? "fadeOn" : "fadeOff"}>
      
        <h2>{searchPlace} 근처 주차장</h2>
        <SearchListUl>
        {searchArea.map((item, index) => (
          <SearchListLi onClick={gotoParkingDetails} key={index} >
            <h4>주차장명: {item.parkName}<FaRegBookmark size="15" color="green"  onClick={() => setBookmark(item.id)} /></h4>
                <p>도로명 주소: {item.address}</p>
              </SearchListLi>
          ))}
        </SearchListUl>
      
    </Container>
  )
}

export default SearchList