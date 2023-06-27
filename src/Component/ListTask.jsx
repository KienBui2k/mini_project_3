import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

export default function ListTask() {
  const [tasks, setTasks] = useState(null)
  const dispatch = useDispatch();
  const commonStore = useSelector((store) => store.commonStore)

  useEffect(() => {
    axios.get("http://localhost:3000/tasks")
    .then(resolve => setTasks(resolve.data))
    .catch(error => error(null))
  },[commonStore.reload])

  
  const handleDelete = (taskId) =>{
    window.confirm("Confirm") ? ( 
      axios.delete("http://localhost:3000/tasks/" + taskId)
        .then(resolve => {
          if(resolve.status === 200) {
              alert("Delete sucess")
              dispatch({
                type: "REDLOAD"
              })
          }else{
            alert("Delete failed")
          }
        })
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
          <p>MiniProject API & Asynchoronous <i className="fa-regular fa-copyright"></i> 2023</p>
          <Link to={"/about"}>About</Link>
      </div>
    </>
  )
}
