import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Short from "./pages/Short";
import Photographer from "./pages/Photographer";
import Processing from "./pages/Processing"; // 📌 추가
import Result from "./pages/Result";
import MyPage from "./pages/Mypage";
import Main from "./pages/Main";
import Onboard from "./components/Onboard";
import axios from "./axios/axios";

const getUserData = async () => {
  const res = await axios.get('/members')
  const UserData = res.data
  
  if (UserData) {
    console.log(UserData, "wefwefwefe")
    return UserData
  } else {
    console.log("망했다")
  }
}

export const livsiFunctionContext = createContext();
export const livsistateContext = createContext();

function App() {
  const [isOn, setIson] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState(null);

  const [Videos, setVideos] = useState([]);

  const onLoad = async () => {
    let Data = [];
    try {
      const res = await axios.get("/videos/sido?sido=서울시");
      Data = res.data;
      setVideos(Data);
      setIsloading(true)
    } catch (error) {
      console.log("error");
    }
    console.log(Data);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const setSkip = () => {
    setIson(false);
  };

  const handleLogin = async (username, password, id) => {
    let users = await getUserData()
    console.log(username, users, password)

    const foundUser = users.find((u) => u.memberName === username && u.password === password);
    if (foundUser) {
      const userData = { memberId: foundUser.memberId, memberName: foundUser.memberName };
      setIsLogin(true);
      setLoginInfo(userData);
      return userData;
    }
    return null;
  };

  if (!isLoading) {
    return <div>로딩중</div>
  }

  return (
    <livsistateContext.Provider value={{ loginInfo, isLogin, Videos }}>
      <livsiFunctionContext.Provider value={{ setSkip, handleLogin }}>
        {/* {isOn ? <Onboard /> : null} */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/short" element={<Short />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/photographer/:id" element={<Photographer />} />
          <Route path="/processing/:id" element={<Processing />} /> {/* 📌 추가 */}
          <Route path="/result/:id" element={<Result />} />
          <Route
            path="/mypage/:id"
            element={isLogin ? <MyPage /> : <Navigate to="/signin" />}
          />
          <Route path="/mypage" element={<Navigate to="/signin" />} />
        </Routes>
      </livsiFunctionContext.Provider>
    </livsistateContext.Provider>
  );
}

export default App;
