import { BrowserRouter, Route, Routes } from "react-router-dom";
import Firstpage from "./pages/Login&Join/Firstpage";
import Join from "./pages/Login&Join/Join";
import Login from "./pages/Login&Join/Login";
import Findid from "./pages/Login&Join/Findid";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/Join" element={<Join />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Findid" element={<Findid />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
