import {useState} from 'react'
import {toast} from "react-hot-toast"
function Addtaskform({setAddTaskForm}) {
    const url=import.meta.env.VITE_Backend_URL;
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [status,setStatus]=useState("");
    const handleAddTask=async ()=>{
        if(title.length===0 || status.length===0) {
            toast.error("Title & Status Cannot be empty");
            return;
        }
        const result=await fetch(`${url}/task/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "authorization":localStorage.getItem("token")
            },
            body:new URLSearchParams({title,description,status})
        });
        const data=await result.json();
        if(data.success){
            toast.success(data.mssg);
            setAddTaskForm(false);
        }
        else{
            toast.error(data.mssg)
        }
    }
  return (
    <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] h-[55vh] bg-gray-800 rounded-xl px-2 py-3 flex flex-col items-center gap-2'>
     <div className='w-full flex flex-row items-center justify-start'><button className='w-[5vw] h-[5vh] cursor-pointer text-[1.5rem] font-serif font bold text-white' onClick={()=>{setAddTaskForm(false)}}>{`<`}</button></div>
     <h1 className='text-[1.3rem] sm:text-[1.5rem] md:text-[1.8rem] font-mono font-bold text-white'>Create Task</h1>
     <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Add Title' className="w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] h-[5vh] bg-white border-2 text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] rounded-xl p-2"/>
     <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Add Description' className="w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] h-[15vh] bg-white border-2 text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] rounded-xl p-2"/>
     <select value={status} onChange={(e)=>{setStatus(e.target.value)}} className="w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] h-[5vh] bg-white border-2 text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] rounded-xl ">
        <option value="" disabled selected>Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Ongoing">Ongoing</option>
     </select>
     <button onClick={()=>{handleAddTask();}} className='mt-5 w-[30vw] sm:w-[25vw] md:w-[20vw] lg:w-[15vw] xl:w-[10vw] h-[5vh] bg-blue-500 text-white rounded-xl text-[1rem] sm:text-[1.2rem] md:text-[1.3rem] font-mono font-semibold cursor-pointer'>Submit</button>
    </div>
  )
}

export default Addtaskform