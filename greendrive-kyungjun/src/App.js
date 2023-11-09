import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
// import Nav from "./components/Nav";
// import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Header /> */}
        {/* <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/Join" element={<Join />} />
          <Route path="/Login" element={<Login />} />
        </Routes> */}
        <LandingPage />
        {/* <Nav /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
