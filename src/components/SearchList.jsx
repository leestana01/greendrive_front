import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: absolute;
  text-align: center;
  background-color: #ffffff;
  -ms-overflow-style: none;
  z-index: 1;
  transition: width 0.3s ease;
  padding-top: 50px;

  /* 미디어 쿼리 적용 */
  @media (hover: hover) {
    width: 363px;
    margin: 0 auto;
  }
  .fadeOff{
    width: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BACKEND_URL = axios.create({
    baseURL: process.env.REACT_APP_SERVER, //백엔드 서버 주소
});

const SearchList = (Mark, searchPlace) => {
  // const navigate = useNavigate();
  const [searchArea, setSearchArea] = useState([]);
  const allLocation = [];

  useEffect(() => {
    console.log(Mark.Mark.length);
    for (let i = 0; i < Mark.Mark.length; i++){
      console.log(Mark.Mark[i].id);
      handleAllLocation(Mark.Mark[i].id); 
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < allLocation.length; i++) {
      if (allLocation[i].address.includes(searchPlace)) {
        handleSearchArea(allLocation[i]);
      }
    }
  }, [searchPlace]);
  

  const getNearLocation = async (id) => {
        try {
          const response = await BACKEND_URL.get(`/spaces/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

  function handleSearchArea(near) {
    setSearchArea(prevSearchArea => [...prevSearchArea, near]);
    console.log(searchArea);
  }
  function handleAllLocation(location) {
    allLocation.push(getNearLocation(location));
  }

  function gotoParkingDetails() {
    
  }

  return (
    <Container>
      <div>
        <h1>Hello</h1>
        <ul>
          {searchArea.map((item, index) => (
              <li onClick={gotoParkingDetails} key={index} >
                <h5>{item.parkName}</h5>
                <p>{item.address}</p>
              </li>
            ))}
        </ul>
      </div>
    </Container>
  )
}

export default SearchList