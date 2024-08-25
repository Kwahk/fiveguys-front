import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import HeaderComponent from "./components/common/HeaderComponent";
import Intro from "./components/Intro";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path="/" element={<Intro />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
