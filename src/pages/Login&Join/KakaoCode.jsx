import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const failStyle = {
  color: "red",
  fontWeight: "bold",
};

const KakaoLoginRedirectHandler = () => {
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const SERVER = process.env.REACT_APP_SERVER;
  const KAKAO_URI = process.env.REACT_APP_KAKAO_URI;
  const CLIENT = process.env.REACT_APP_CLIENT;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        try {
          const BACKEND_URL = `${SERVER}`;
          await axios
            .get(`${SERVER}${KAKAO_URI}?code=${code}`)
            .then((response) => {
              console.log("로그인성공:", response.data);
              console.log(response.data.userId);
              console.log(response.data.name);

              localStorage.setItem("userId", response.data.userId);
              localStorage.setItem("name", response.data.name);

              navigate(`/users/info?userId=${response.data.userId}`);
              navigate(`/users/info?userId=${response.data.name}`);

              //navigate("/Mypage");
            });
        } catch (error) {
          console.error("로그인 실패:", error);
          setLoginError(true);
          setErrorMessage(
            "로그인에 실패했습니다. 아이디와 비밀번호를 다시 한 번 확인해주세요."
          );
        }
      }

      /*
      useEffect(() => {
    const fetchToken = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        try {
          const BACKEND_URL = `${SERVER}`;
          const response = await axios.get(`${BACKEND_URL}${KAKAO_URI}?code=${code}`);
          console.log("로그인 성공:", response.data);
          
          // Save userId to localStorage
          localStorage.setItem("userId", response.data.userId);

          // Navigate to "/users/info" with userId as a parameter
          navigate(`/users/info?userId=${response.data.userId}`);
        } catch (error) {
          console.error("로그인 실패:", error);
          setLoginError(true);
          setErrorMessage(
            "로그인에 실패했습니다. 아이디와 비밀번호를 다시 한 번 확인해주세요."
          );
        }
      }
      */
    };

    fetchToken();
  }, []);

  return (
    <div>
      {loginError && (
        <div className="failDiv" style={failStyle}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default KakaoLoginRedirectHandler;
