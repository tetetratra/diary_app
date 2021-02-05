import { useState } from 'react';
import { walk } from 'react-sortable-tree';

import './Diary.css';
import Tree from './Tree.js';
import Note from './Note.js';

const getNodeKey = ({ treeIndex }) => treeIndex

const Diary = props => {
  const date = props.date
  const [edit, setEdit] = useState(false)
  const [treeData, setTreeData] = useState([])
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
      <Tree treeData={treeData} setTreeData={setTreeData} edit={edit} setEdit={setEdit} />
      <div className={'note'} onClick={!edit && setEdit}>
        <Note edit={edit}/>
      </div>
    </div>
  )
}

export default Diary;
