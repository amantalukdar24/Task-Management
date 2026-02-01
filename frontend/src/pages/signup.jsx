import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router';
import {toast} from "react-hot-toast"
function Signup({setLogin}) {
    const url=import.meta.env.VITE_Backend_URL;
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
      useEffect(()=>{
         if(localStorage.getItem("token")) navigate("/");
         
         },[]); 
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(name.length<3){
            toast.error("Name must have atleast 3 characters");
            return;
        }
         if(password.length<6 || password.length>16){
            toast.error("Password must be atleast length of 6 and maximum length 16");
            return;
        }
        const result=await fetch(`${url}/user/sign-up`,{
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body:new URLSearchParams({name,email,password})
        });
        const data=await result.json();
        if(data.success){
            toast.success(data.mssg);
            localStorage.setItem("token",data.token);
            setLogin(true);
            navigate("/");
        }
        else{
            toast.error(data.mssg);
        }
    }
  return (
    <div className='flex flex-col justify-center items-center w-full '>
     <div className='flex flex-col items-center gap-3 w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] h-[50vh] bg-orange-200 mt-20 px-2 py-3 rounded-xl'>
     <div className='flex items-center w-full '> <button className='w-[5vw] h-[5vh] cursor-pointer text-[1.5rem] font-sans font bold' onClick={()=>{navigate("/")}}>{`<`}</button></div> 
      <h1 className='text-center text-[1.3rem] sm:text-[1.5rem] md:text-[1.8rem] font-sans font-bold w-full'>Sign-Up</h1>
       <form onSubmit={handleSubmit} className='flex flex-col gap-2 justify-center items-center'>
             <input type="text"  value={name} required placeholder='Enter Your Name' className='w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] h-[5vh] bg-white rounded-2 border-2 p-2 text-[1rem] font-serif rounded-xl ' onChange={(e)=>{setName(e.target.value)}} />
            <input type="email" value={email} required placeholder='Enter Your Email' className='w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] h-[5vh] bg-white rounded-2 border-2 p-2 text-[1rem] font-serif rounded-xl ' onChange={(e)=>{setEmail(e.target.value)}} />
             <input type="password"  value={password} required placeholder='Enter Your Password' className='w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] h-[5vh] bg-white rounded-2 border-2 p-2 text-[1rem] font-serif rounded-xl '  onChange={(e)=>{setPassword(e.target.value)}}/>
             <button type="submit" className='w-[30vw] sm:w-[25vw] md:w-[20vw] lg:w-[15vw] xl:w-[10vw] h-[5vh] text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] bg-black text-white rounded-xl mt-5 cursor-pointer'>Submit</button>
        </form>
        <div className='flex flex-row justify-center items-center gap-2'>
          <h4 className='text-[1rem] sm:text-[1.1rem] md:text-[1.3rem] font-serif font-medium '>Already Have an Account?</h4>
          <h4 className='text-[1rem] sm:text-[1.1rem] md:text-[1.3rem] font-serif font-medium cursor-pointer text-blue-500' onClick={()=>{navigate("/sign-in")}} >Sign-in</h4>
        </div>
     </div>
    </div>
  )
}

export default Signup