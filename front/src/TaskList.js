import React, { useState, useRef, useContext, createContext } from 'react';
import './TaskList.css';

const MyContext = createContext(() => {})

const TaskList = props => {
  const [edit, setEdit] = useState(false)
  const changeEdit = e => {
    setEdit(prev => !prev)
  }
  return (
    <div>
      <MyContext.Provider value={edit}>
        <button onClick={changeEdit}>{edit ? 'save' : 'edit'}</button>
        <Task isRoot key={0}/>
      </MyContext.Provider>
    </div>
  )
}


const Task = ({isRoot}) =>{
  const [deleted, setDeleted] = useState(false)
  const [text, setText] = useState(isRoot ? 'TODO' : '')
  const [children, setChildren] = useState([])
  const [status, setStatus] = useState(0)
  const addTask = () => {
    setChildren(prevChildren => [...prevChildren, <Task key={prevChildren.length}/>])
  }
  const deleteTask = () => {
    setDeleted(true)
  }
  const changeText = e => {
    setText(e.target.value)
  }
  const changeStatus = e => {
    setStatus(prevStatus => (prevStatus + 1) % 3)
  }
  const edit = useContext(MyContext)
  return (!deleted &&
    <ul>
      {
        <li>{
          edit
          ? <>
            <button onClick={addTask}>+</button>
            {!isRoot && <button onClick={deleteTask}>-</button>}
            <button onClick={changeStatus}>{status}</button>
            <input type='text' value={text} onChange={changeText}></input>
          </>
          : `[${status}] ${text}`
        }</li>
      }
      {children}
    </ul>
  )
}

export default TaskList;
