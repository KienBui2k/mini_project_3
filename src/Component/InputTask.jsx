import React, { useEffect, useState } from 'react'
import ListTask from './ListTask'
import axios from 'axios'


export default function InputTask() {
  const [tasks, setTasks] = useState(null)
  const [reminder, setReminder] = useState(false)
  const [addTask, setAddTask] = useState("")
  const [addTime, setAddTime] = useState("")
  const [AddBtn, setAddBtn] = useState(false)
  useEffect(() => {
    axios.get("http://localhost:3000/tasks")
    .then(resolve => setTasks(resolve.data))
    .catch(error => error(null))
  },[])
  const handleAddTask = (task,time,reminder) =>{
    axios.post("http://localhost:3000/tasks", {
      "task": task,
      "time": time,
      "checkReminder":reminder
    })
     .then(resolve => setTasks([...tasks, resolve.data]))
     .catch(error => alert("Add Task không thành công vui lòng kiểm tra lại! "))
     setAddTask("")
     setAddTime("")
     setReminder(false);
  }
  const handleCheckReminder = () => {
    setReminder(!reminder)
  }

  return (
    <> 
     <div>
        <div className='header__container'>
              <div className='header__title'>
                <h1>Task Tracker</h1>
              </div>
              <div className='header__btn'> 
              {
                AddBtn ? ( <button className='header__btn__two' onClick={() => setAddBtn(!AddBtn)} >Add</button>)
                :
                (<button className='header__btn__one' onClick={() => setAddBtn(!AddBtn)}>CLOSE</button>)
              } 
              </div>
        </div>
        {
          !AddBtn ? (        <div className='addTask__container'>
            <label htmlFor="add_task"> Task
            <br></br>
                <input className='input__add__task' type="text" id='add_task' placeholder='Add task' value={addTask} onChange={(e) => setAddTask(e.target.value)}/>
            </label>
            <br></br>
            <label htmlFor="add_time"> Date & Time
            <br></br>
                <input className='input__add__task' type="text" id='add_time' placeholder='Add Day & Time' value={addTime} onChange={(e) => setAddTime(e.target.value)}/>
            </label>
            <br></br>
            <div className='input__checkbox'> 
                <label> Set Reminder
                <input type='checkbox' checked={reminder} onClick={ handleCheckReminder} ></input>
            </label>
            </div>
            <br></br>
            <button className="Add__btn" onClick={() => {addTask==="" || addTime==="" ? (alert("Please input task and time!")) :(handleAddTask(addTask,addTime,reminder))} }>Save Task</button>
        </div>) : (<div></div>)
        }
         <ListTask></ListTask>
    </div>
    </>
  )
}
