import {  Suspense, lazy } from 'react';
// import { SuspenseLoader } from "./components/SuspenseLoader";
import Main from "./pages/Main"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import View from "./components/View"
import Sum from "./components/Sum"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/view" element={<View />} />
            <Route exact path="/sum" element={<Sum/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


