import { useState, useEffect } from 'react';
import { walk } from 'react-sortable-tree';

import './Diary.css';
import Tree from './Tree.js';
import Note from './Note.js';

const getNodeKey = ({ treeIndex }) => treeIndex

const Diary = ({date, initialTreeData, initialValue}) => {
  const [edit, setEdit] = useState(false)
  const [treeData, setTreeData] = useState(initialTreeData)
  const [value, setValue] = useState(initialValue)
  const toggleEdit = () => {
    if (edit){
      walk({
        treeData: treeData,
        getNodeKey: getNodeKey,
        callback: n => {console.log(n)}
      })
    }
    setEdit(e => !e)
  }
  return (
    <div>
      <h2>{date.month() + 1}月{date.date()}日</h2>
      <button onClick={toggleEdit}>{edit ? 'save' : 'edit'}</button>
      <Tree date={date} treeData={treeData} setTreeData={setTreeData} edit={edit} setEdit={setEdit} key={date}/>
      <Note edit={edit} setEdit={setEdit} value={value} setValue={setValue} key={date}/>
    </div>
  )
}

export default Diary;
