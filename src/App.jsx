import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./store/states";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";

function App() {
  const token = JSON.parse(localStorage.getItem('token'));
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUpOrLoginRoute = location.pathname === '/sign-up' || location.pathname === '/login';

  useEffect(() => {
    if (token === null && !isSignUpOrLoginRoute) {
      navigate('/login');
    }
  });
  
  return (
   <div>
      <UserProvider>
          {!isSignUpOrLoginRoute && <Layout />}
        <Routes>
          <Route path="/sign-up" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Dashboard/>}  />
        </Routes>
      </UserProvider>
   </div>
  );
}

export default App;
