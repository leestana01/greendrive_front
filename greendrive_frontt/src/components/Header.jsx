import React from "react";
import styled from "styled-components";

// Header 컨테이너 스타일링
const HeaderContainer = styled.div`
  background: #fff;
  text-align: center;
  padding: 20px 0;
`;

// Logo 텍스트 스타일링
const Logo = styled.h1`
  color: #519a09;
  font-family: "Righteous", cursive;
  font-size: 30px;
  margin: 0;
`;

// Header 컴포넌트 정의
const Header = () => {
  return (
    <HeaderContainer>
      <Logo>GreenDriver</Logo>
    </HeaderContainer>
  );
};

export default Header;
