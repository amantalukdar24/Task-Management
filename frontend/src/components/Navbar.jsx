import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
function Navbar({login,setLogin}) {
    const navigate=useNavigate();
    const handleLogout=()=>{
     localStorage.removeItem("token");
     setLogin(false);
    }
   
    
  return (
    <div className='sticky flex flex-row justify-between items-center w-full bg-gray-100 border-b-2 px-3 py-2'>
        <h1 className='font-bold '><span className='font-sans text-[1.3rem] sm:text-[1.5rem] text-gray-500'>Task</span><span className='font-[sans] text-[1.6rem] sm:text-[1.9rem] text-orange-500'>Management</span></h1>
      {!login &&  <button className='w-[25vw] sm:w-[20vw] md:w-[15vw] lg:w-[10vw] xl:w-[5vw] h-[5vh] bg-yellow-300 text-[1rem] sm:text-[1.1rem] md:text-[1.3rem] font-mono border-2 cursor-pointer' onClick={()=>{navigate("/sign-in")}}>Login</button>}
       {login &&  <button className='w-[25vw] sm:w-[20vw] md:w-[15vw] lg:w-[10vw] xl:w-[5vw] h-[5vh] bg-orange-300 text-[1rem] sm:text-[1.1rem] md:text-[1.3rem] font-mono border-2 cursor-pointer' onClick={()=>{handleLogout()}}>Logout</button>}
    </div>
  )
}

export default Navbar