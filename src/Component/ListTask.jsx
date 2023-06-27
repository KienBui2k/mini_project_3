import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import About from './About'
export default function ListTask() {
  const [tasks, setTasks] = useState(null)
  useEffect(() => {
    axios.get("http://localhost:3000/tasks")
    .then(resolve => setTasks(resolve.data))
    .catch(error => error(null))
  },[tasks])
  const handleDelete = (taskId) =>{
    window.confirm("Confirm") ? ( 
      axios.delete("http://localhost:3000/tasks/" + taskId)
        .then(resolve => {
          if(resolve.status == 200) {
              setTasks(tasks.filter(task => task.id != taskId))
          }else{
            alert("Delete failed")
          }
        })
        .catch(error => null)
        ) 
        : <div></div>

  }
  return (
    <>
      {tasks?.length > 0 ? (
        tasks.map((task) => (
          <div className='task' key={task.id}>
            {task.checkReminder ? (
              <>
                <div className='task__active'></div>
                <div className='task__info'>
                  <p>{task.task}</p>
                  <p>{task.time}</p>
                </div>
              </>
            ) : (
              <div className='task__info'>
                <p>{task.task}</p>
                <p>{task.time}</p>
              </div>
            )}
            <div className='task__add__btn'>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks to show</p>
      )}
      <div className='footer__about'>
          <p>MiniProject API & Asynchoronous <i class="fa-regular fa-copyright"></i> 2023</p>
          <Link to={"/about"}>About</Link>
      </div>
    </>
  )
}
