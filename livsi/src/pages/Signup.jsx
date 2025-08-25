import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    // const users = 
    const newUser = {
      id: Date.now(),
      username,
      password,
    };

    alert("회원가입 성공!");
    navigate(`/mypage/${newUser.id}`);
  };

  return (
    <div>
      <Header />
    <div className="auth-container">
      <h2 className="title">회원가입</h2>
      <div className="form-box">
        <input
          type="text"
          placeholder="아이디 입력"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" onClick={handleSignup}>
          회원가입
        </button>
      </div>
      <footer className="footer">© Livsi Corp. \ 고객센터</footer>
    </div>
    </div>
  );
}

export default Signup;
