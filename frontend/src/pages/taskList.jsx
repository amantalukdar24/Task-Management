import React,{useState,useEffect} from 'react'
import Addtaskform from '../components/addtaskform';
import Edittaskform from '../components/editTaskform';
import {toast} from "react-hot-toast";
function TaskList({login}) {
    const url=import.meta.env.VITE_Backend_URL;
    const [addTaskForm,setAddTaskForm]=useState(false);
    const [editTaskForm,setEditTaskForm]=useState(false);
    const [tasks,setTasks]=useState([]);
    const [tools,setTools]=useState(false);
    const [taskId,setTaskId]=useState("");
    const [filterType,setFilterType]=useState("");
    const [filterTasks,setFilterTasks]=useState([]);
    useEffect(()=>{
     const getAllTasks=async ()=>{
        const results=await fetch(`${url}/task/getalltask`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":localStorage.getItem("token")
            }
        });
        const data=await results.json();
        if(data.success){
            setTasks(data.allTasks);
        }
        
     }
     getAllTasks();
    },[addTaskForm,editTaskForm,tools,login])
    const handleDeleteTask=async ()=>{
        const result=await fetch(`${url}/task/delete`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "authorization":localStorage.getItem("token")
            },
            body:new URLSearchParams({_id:`${taskId}`})
        });
        const data=await result.json();
        if(data.success){
            setTools(false);
            setTaskId("");
            toast.success(data.mssg);

        }
        else{
            toast.error(data.mssg);
        }
    }
    useEffect(()=>{
       const filterData=tasks.filter((task)=>{
        return task.status.includes(filterType)
       });
       setFilterTasks(filterData);
    },[tasks,filterType])
  return (
    <div className=' flex flex-col w-full px-3 py-2'>
     {login && <div className='flex flex-col items-end py-3 '>
        <button className='w-[30vw] sm:w-[20vw] md:w-[16vw] lg:w-[12vw] xl:w-[8vw] h-[5vh] text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] font-mono bg-black text-white rounded-[10px] cursor-pointer' onClick={()=>{setAddTaskForm(true)}}>Add Task</button>
    </div>}
    {addTaskForm && <Addtaskform setAddTaskForm={setAddTaskForm}/>}  
    {editTaskForm && <Edittaskform setEditTaskForm={setEditTaskForm} taskId={taskId}/>}
    <div className='flex flex-row justify-between  items-center bg-gray-200 border-2 w-full p-2 rounded-xl'>
        <h1 className='text-[1.5rem] text-gray-800 font-[cursive] font-bold '>Tasks</h1>
        <div className='flex flex-row items-center gap-2 px-3'>
           <h3 className='text-[1rem] sm:text-[1.1rem] md:text-[1.3rem] font-mono font-semibold text-blue-500'>Filter</h3>
           <select value={filterType} onChange={(e)=>{setFilterType(e.target.value)}} className='w-[30vw] sm:w-[25vw] md:w-[20vw] lg:w-[15vw] xl:w-[10vw] h-[5vh] bg-white font-serif text-[0.9rem] sm:text-[1rem] md:text-[1.2rem]' >
            <option value="">All</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
           </select>
        </div>
</div>

    {
      login &&  tasks.length>0 && <div className='flex fle-row flex-wrap w-full justify-center sm:justify-start  overflow-auto gap-2 px-2 py-3'>
         {
            filterTasks.map((task)=>{
                return(
                    <div key={task._id} className=' flex flex-col gap-2 p-2 w-[42vw] sm:w-[35vw] md:w-[30vw] lg:w-[25vw] xl:w-[20vw] h-[30vh] border-2 odd:rounded-tr-3xl odd:rounded-bl-3xl even:rounded-tl-3xl even:rounded-br-3xl even:bg-yellow-300 odd:bg-sky-300 '>
                       <div className=' flex flex-row justify-end items-center w-full '>
                        <button className='text-[1.5rem] w-[3vw] h-[5vh] font-bold cursor-pointer' onClick={()=>{setTools(!tools); setTaskId(task._id)}}>⁝</button>
                        </div> 
                     <div className='flex flex-row w-full border-b-2 border-dashed h-[4vh] overflow-auto'>
                        <h1 className='text-[0.9rem] sm:text-[1.1rem] md:text-[1.2rem] font-sans font-semibold '>Title: {task.title}</h1>
                     </div>
                     <div className='flex flex-row w-full h-[12vh] overflow-auto border-b-2 border-dashed  '>
                        <p className='text-[0.8rem] sm:text-[1rem] md:text-[1.1rem] font-serif font-medium'>Description: {task.description}</p>
                     </div>
                     <div className='flex flex-row'>
                        <h3 className='text-[0.7rem] sm:text-[0.9rem] md:text-[1rem] font-[cursive] text-gray-800 '>Status: {task.status}</h3>
                     </div>
                    </div>
                )
            })
         }
        </div>
    }
    {
        tasks.length>0 && login && filterTasks.length===0 && <div className='w-full flex flex-row justify-center items-center py-3'>
            <h1 className='text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-mono font-bold text-orange-600'>No Tasks Found😔</h1>
        </div>
    }
    {
        tasks.length===0 && login && <div className='w-full flex flex-row justify-center items-center py-3'>
            <h1 className='text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-mono font-bold text-orange-600'>You haven't add any tasks😔</h1>
        </div>
    }
    {
        tasks.length===0 && !login && <div className='w-full flex flex-row justify-center items-center py-3'>
            <h1 className='text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-mono font-bold text-green-600'>Login to add Tasks😊</h1>
        </div>
    }
    {
        tools && <div className='absolute top-1/2 left-1/2 translate-[-50%] flex flex-col items-center gap-2 px-2 py-3 w-[40vw] sm:w-[35vw] md:w-[30vw] lg:w-[25vw] xl:w-[20vw] h-[20vh] bg-gray-700 rounded-xl' >
           <div className='w-full flex flex-row items-center justify-start'><button className='w-[5vw] h-[5vh] cursor-pointer text-[1.5rem] font-serif font bold text-white' onClick={()=>{setTools(false)}}>{`<`}</button></div>
            <h1 className=" text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] text-green-200  border-white cursor-grab" onClick={()=>{setEditTaskForm(true); setTools(false)}}>Edit</h1>
            <h1 className="text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] text-red-200 cursor-grab " onClick={()=>{handleDeleteTask()}}>Delete</h1>
        </div>
    }

    </div>
  )
}

export default TaskList