import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/Join" element={<Join />} />
          <Route path="/Login" element={<Login />} />
        </Routes> */}
        <LandingPage />
      </div>
    </BrowserRouter>
  );
}

export default App;
