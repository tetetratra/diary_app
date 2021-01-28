import React, {useState, useContext, createContext} from 'react';

const MyContext = createContext(() => {})

const Diary = props => {
  const today = new Date()
  const [edit, setEdit] = useState(false)
  const changeEdit = e => {
    setEdit(prev => !prev)
    if(edit){
      alert('saved!')
    }
  }
  return (
    <div>
      <h2>{today.getDate()}日</h2>
      <MyContext.Provider value={edit}>
        <button onClick={changeEdit}>{edit ? 'save' : 'edit'}</button>
        <Task isRoot key={0}/>
        <Note />
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

const Note = props => {
  const [text, setText] = useState('')
  const changeText = e => {
    setText(e.target.value)
  }
  const edit = useContext(MyContext)
  return (
    edit
    ? <textarea value={text} onChange={changeText}></textarea>
    : <p>{text}</p>
  )
}

export default Diary;
