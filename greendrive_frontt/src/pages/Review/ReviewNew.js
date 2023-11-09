import { useEffect } from "react";
import ReviewEditor from "../../components/ReviewEditor";
import styled from "styled-components";
import MyHeader from "../../components/Header";
import HeaderMenu from "../../components/HeaderMenu";

const ReviewNew = (props) => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `장소제목 - 새 리뷰`;
  }, []);

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

 const Logo = styled.h1`
    color: #519A09;
    font-family: 'Righteous', cursive;
    font-size: 30px;
    margin: 0;
  `;
  return (

<div>
<Container>
  <BodyWrapper>
    <Body>
      <MyHeader>
        <Logo>GreenDriver</Logo>
      </MyHeader>
      <HeaderMenu />
      {props.children}
      <ReviewEditor />
    </Body>
  </BodyWrapper>
</Container>
</div>
  );
};

export default ReviewNew;