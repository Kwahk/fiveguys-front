import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/common/HeaderComponent";
import Intro from "./components/Intro";
import Join from "./components/Join";
import CalendarPage from "./components/CalendarPage";
import Statistics from "./components/Statistics";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import MyPage from "./components/mypage";
import PWSearch from "./components/PWSearch";
import ChangePassword from "./components/ChangePassword";
import Profile from "./components/Profile";

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

          {/* // http://localhost:3000/pwsearch */}
          <Route path="/pwsearch" element={<PWSearch />}></Route>

          {/* // http://localhost:3000/calendar */}
          <Route path="/calendar" element={<CalendarPage />}></Route>

          {/* // http://localhost:3000/dashboard */}
          <Route path="/dashboard" element={<Dashboard />}></Route>

          {/* // http://localhost:3000/statistics */}
          <Route path="/statistics" element={<Statistics />}></Route>

          {/* // http://localhost:3000/mypage */}
          <Route path="/mypage" element={<MyPage />}></Route>

          {/* // http://localhost:3000/change-password */}
          <Route path="/change-password" element={<ChangePassword />}></Route>

          {/* // http://localhost:3000/profile */}
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
