import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";

//반응형 혹시나 쓸까봐 container 자체에 먹이는 소스입니다
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #fffff;
  -ms-overflow-style: none;

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
  flex: 1; /* 남은 공간을 채우도록 설정 */
  overflow: auto; /* 스크롤이 있는 경우 내용을 스크롤합니다. */
  background: #519a09;
`;

const Body = styled.div`
  display: flex;
  background: #519a09;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  margin: 0 auto;
`;
const ReviewShow = () => {
    const navigate = useNavigate();
  
return (
    <Container>
      <BodyWrapper>
        <Body>

        </Body>
      </BodyWrapper>
    </Container>
  );

};
export default ReviewShow;
