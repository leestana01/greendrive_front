import React, { useReducer, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Firstpage from "./pages/Login&Join/Firstpage";
import Join from "./pages/Login&Join/Join";
import Login from "./pages/Login&Join/Login";
import Findid from "./pages/Login&Join/Findid";
import Carregist from "./pages/Login&Join/Carregist";
import KakaoCode from "./pages/Login&Join/KakaoCode";
import ReviewHome from "./pages/Review/ReviewHome";
import ReviewNew from "./pages/Review/ReviewNew";
import ReviewEdit from "./pages/Review/ReviewEdit";
import ReviewReview from "./pages/Review/ReviewReview";

import "./pages/Review/Review.css";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("review", JSON.stringify(newState));
  return newState;
};

export const ReviewStateContext = React.createContext();
export const ReviewDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("review");
    if (localData) {
      const reviewList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (reviewList.length >= 1) {
        dataId.current = parseInt(reviewList[0].id) + 1;
        dispatch({ type: "INIT", data: reviewList });
      }
    }
  }, []);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <ReviewStateContext.Provider value={data}>
      <ReviewDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Firstpage />} />
              <Route path="/Join" element={<Join />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Findid" element={<Findid />} />
              <Route path="/Carregist" element={<Carregist />} />
              <Route
                path="/login/oauth2/callback/kakao"
                element={<KakaoCode />}
              />
              <Route path="/ReviewHome" element={<ReviewHome />} />
              <Route path="/New" element={<ReviewNew />} />
              <Route path="/edit/:id" element={<ReviewEdit />} />
              <Route path="/review/:id" element={<ReviewReview />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ReviewDispatchContext.Provider>
    </ReviewStateContext.Provider>
  );
}

export default App;
