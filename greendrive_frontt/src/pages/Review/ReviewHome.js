import React, { useContext, useEffect, useState } from "react";
import { ReviewStateContext } from "../../App";
import styled from "styled-components";

import MyHeader from "../../components/Header";
import HeaderMenu from "../../components/HeaderMenu";
import ReviewList from "../../components/ReviewList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #ffffff;
  -ms-overflow-style: none;
  max-width: 100%;

  @media (hover: hover) {
    width: 100%;
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BodyWrapper = styled.div`
  flex: 1;
  overflow: auto;
`;

const Body = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  margin: 0 auto;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const Home = (props) => {
  const reviewList = useContext(ReviewStateContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `제목`;
  }, []);

  useEffect(() => {
    // 여기에 useEffect 코드를 작성하세요
  }, [reviewList]);

  const TitleLineA = styled.div`
    width: 100%;
    height: 0px;
    top: 125px;
    border: 0.3px solid #DDDDDD;
  `;

  const Logo = styled.h1`
    color: #519A09;
    font-family: 'Righteous', cursive;
    font-size: 30px;
    margin: 0;
  `;

  const Title = styled.div`
    width: 122px;
    height: 22px;
    left: 135px;
    top: 110px;
    bottom: 100px;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 235%;
    display: flex;
    align-items: center;
    color: #000000;
  `;

  return (
    <div>
      <Container>
        <BodyWrapper>
          <Body>
            <MyHeader>
              <Logo>GreenDriver</Logo>
            </MyHeader>
            <TitleLineA />
            <Title>서울역 공영주차장</Title> 
            <HeaderMenu />
            {props.children}
            <ReviewList reviewList={data} />
          </Body>
        </BodyWrapper>
      </Container>
    </div>
  );
};

export default Home;
