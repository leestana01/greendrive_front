import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import bwipjs from "bwip-js";

// 임포트(설치)한 라이브러리 목록
// bwip-js , react-icons

const NavigationBar = styled.nav`
  background: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-top: 4px solid #f5f5f5;
  z-index: 0;
`;

const BarcodeContainer = styled.div`
  background: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  top: ${(props) => (props.isOpen ? "-142px" : "0px")};
  width: ${(props) => (props.isOpen ? "100%" : "0px")};
  height: ${(props) => (props.isOpen ? "auto" : "0px")};
  padding: ${(props) =>
    props.isOpen ? "0" : "2px"}; // 약간 꼼수인데 접히는거 부드럽게 하려고 함
  overflow: hidden;

  z-index: -1;
`;

const Barcode = styled.div`
  height: 50px;
  width: 200px;
  // background-image: url("여기에 바코드 이미지 삽입");
  // background-repeat: no-repeat;
  // background-size: cover;
`;

const BarcodeIcon = styled(IoWalletOutline)`
  background: white;
  color: green;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const NavItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NavLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: Black;
  cursor: pointer;
  padding: 0px 10px 0px 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const NavBar = ({ getIsMapDetail }) => {
  const [isBarcodeOpen, setBarcodeOpen] = useState(false);
  const barcodeCanvasRef = useRef(null);
  const [barcodeText, setBarcodeText] = useState("");

  useEffect(() => {
    // 로컬 스토리지에서 username을 읽음 -> 바코드로 출력할 예정
    const storedUsername = localStorage.getItem("username") || "NOUSER";
    setBarcodeText();
  }, []);

  useEffect(() => {
    if (barcodeCanvasRef.current && barcodeText) {
      const uppercaseText = barcodeText.toUpperCase();
      bwipjs.toCanvas(
        barcodeCanvasRef.current,
        {
          bcid: "code39",
          text: uppercaseText,
          scale: 2,
          height: 10,
        },
        function (error) {
          if (error) {
            console.error("Barcode generation error:", error);
          }
        }
      );
    }
  }, [barcodeText]);

  const setIsMapDetail = () => {
    getIsMapDetail(false);
  };

  return (
    <NavigationBar>
      <BarcodeContainer isOpen={isBarcodeOpen}>
        <p>구독권 사용을 원하시면 바코드를 스캔하세요</p>
        <canvas
          ref={barcodeCanvasRef}
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
        <p></p>
      </BarcodeContainer>

      <BarcodeIcon size="60" onClick={() => setBarcodeOpen(!isBarcodeOpen)} />
      <NavItems>
        <NavLink onClick={setIsMapDetail}>
          <FaHome size="40" color="green" />홈
        </NavLink>
        <NavLink>
          <FaUserCircle size="40" color="green" />
          마이페이지
        </NavLink>
      </NavItems>
    </NavigationBar>
  );
};

export default NavBar;
