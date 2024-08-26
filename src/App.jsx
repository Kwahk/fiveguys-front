import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/common/HeaderComponent";
import Intro from "./components/Intro";
import Join from "./components/Join";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path="/" element={<Intro />}></Route>

          {/* // http://localhost:3000/join */}
          <Route path="/join" element={<Join />}></Route>

          {/* // http://localhost:3000/login */}
          <Route path="/login" element={<Login />}></Route>

          {/* // http://localhost:3000/calendar */}
          <Route path="/calendar" element={<Calendar />}></Route>

          {/* // http://localhost:3000/dashboard */}
          <Route path="/dashboard" element={<Dashboard />}></Route>

          {/* // http://localhost:3000/statistics */}
          <Route path="/statistics" element={<Statistics />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
