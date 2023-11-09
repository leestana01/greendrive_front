import React, { useState, useEffect } from "react";
import axios from "axios";

const failStyle = {
  color: "red",
  fontWeight: "bold",
};

const KakaoLoginRedirectHandler = () => {
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const SERVER = process.env.REACT_APP_SERVER;

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        try {
          const BACKEND_URL = `${SERVER}`;
          const response = await axios.get(
            `${BACKEND_URL}/login/oauth2/callback/kakao?code=${code}`
          );
          console.log(response.data);
          // 성공적인 처리 로직 추가 (예: 상태 업데이트, 리디렉션 등)
        } catch (error) {
          console.error("로그인 실패:", error);
          setLoginError(true);
          setErrorMessage(
            "로그인에 실패했습니다. 아이디와 비밀번호를 다시 한 번 확인해주세요."
          );
        }
      }
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
