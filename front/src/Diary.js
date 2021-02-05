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
      console.log(treeData)
      console.log(value)
      // いい感じにapiに投げる(POST)。通知があると良いかも
    }
    setEdit(e => !e)
  }
  return (
    <div className={"container"}>
      <div className={"row"}>
        <div className={"col-lg-8 col-md-10 mx-auto"}>
          <div className={"post-preview"}>
            <h2 className={"post-title"}>
              {date.month() + 1}月{date.date()}日&nbsp;
              {edit ? (
                <i onClick={toggleEdit} className={"far fa-save"}></i>
              ) : (
                <i onClick={toggleEdit} className={"fas fa-edit"}></i>
              )}
            </h2>
          </div>
          <Tree date={date} treeData={treeData} setTreeData={setTreeData} edit={edit} setEdit={setEdit} />
          <Note edit={edit} setEdit={setEdit} value={value} setValue={setValue} />
          <hr />
        </div>
      </div>
    </div>
  )
}

export default Diary;
