import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {Routes,Route} from "react-router";
import Signup from './pages/signup';
import { Toaster } from 'react-hot-toast';
import Signin from './pages/signin';
import TaskList from './pages/taskList';
import ResetPass from './pages/resetPass';
function App() {
 const [login,setLogin]=useState(false);
 useEffect(()=>{
     if(localStorage.getItem("token")) setLogin(true);
     else setLogin(false);
    },[login]);
  return (
    <div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Navbar login={login} setLogin={setLogin}/>
    <Routes>
      <Route index element={<TaskList login={login}/>}/>
      <Route path="/sign-up" element={<Signup  setLogin={setLogin}/>}/>
      <Route path="/sign-in" element={<Signin  setLogin={setLogin}/>}/>
       <Route path="/reset-pass" element={<ResetPass/>}/>
       <Route path="/*" element={<div className='flex justify-center items-center text-[1.5rem] font-mono font-bold text-gray-700'>404 Page Not Found</div>}/>
    </Routes>
  
    </div>
  )
}

export default App
