import React, { useState, useContext, createContext, createRef} from 'react';
import SortableTree, { addNodeUnderParent, removeNode, walk } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import { TextField } from '@material-ui/core';
import './Diary.css';

const EditContext = createContext(() => {})

const Diary = props => {
  const date = props.date
  const [edit, setEdit] = useState(false)
  const [treeData, setTreeData] = useState([])
  const addChild = rowInfo => {
    const parentKey = rowInfo ? rowInfo.treeIndex : undefined
    const ref = createRef(null)
    const newNode = {
      title: <TaskInput ref={ref}/>,
      expanded: true
    }
    const newTree = addNodeUnderParent({
      treeData: treeData,
      newNode: newNode,
      parentKey: parentKey,
      getNodeKey: ({ treeIndex }) => treeIndex
    })
    setTreeData(newTree.treeData)
  }
  const deleteSelf = rowInfo => {
    setTreeData(removeNode({
      treeData: treeData,
      path: rowInfo.path,
      getNodeKey: ({ treeIndex }) => treeIndex
    }).treeData)
  }
  const toggleEdit = () => {
    if (edit){
      walk({
        treeData: treeData,
        getNodeKey: ({ treeIndex }) => treeIndex,
        callback: n => {console.log(n)}
      })
    }
    setEdit(e => !e)
  }
  const treeSize = () => {
    let count = 0
    walk({
      treeData: treeData,
      getNodeKey: ({ treeIndex }) => treeIndex,
      callback: n => {count += 1}
    })
    return count
  }
  return (
    <div>
      <h2>{date.month() + 1}月{date.date()}日</h2>
      <button onClick={toggleEdit}>{edit ? 'save' : 'edit'}</button>
      {edit && <button onClick={addChild}>+</button>}
      <div
        className={'task-tree'}
        style={{ height: (treeSize() === 0 ? 62 : treeSize() * 62) + 60 }}
        onClick={!edit && setEdit}
      >
        <EditContext.Provider value={edit}
          children={<SortableTree
            treeData={treeData}
            onChange={treeData => setTreeData(treeData)}
            theme={FileExplorerTheme}
            generateNodeProps={rowInfo => ({
              buttons: [
                (edit && <button onClick={e => addChild(rowInfo)}>+</button>),
                (edit && <button onClick={e => deleteSelf(rowInfo)}>-</button>)
              ]
            })}
            canDrag={edit}
          />}
        />
      </div>
      <div className={'note'} onClick={!edit && setEdit}>
        <Note edit={edit}/>
      </div>
    </div>
  )
}

const statusToCheckBox = (status, edit) => (
  {
    0: <span>{edit ? '・' : ''}</span>,
    1: <input type='checkbox'></input>,
    2: <input type='checkbox' checked></input>
  }[status]
)

const TaskInput = React.forwardRef((props, ref) => {
  const [name, setName] = useState('new')
  const [status, setStatus] = useState(0)
  const edit = useContext(EditContext)
  return (
    <span ref={ref}>
      <span onClick={() => edit && setStatus(s => (s + 1) % 3)}>{statusToCheckBox(status, edit)}</span>
      {edit ? <input type="text" value={name} onChange={e => setName(e.target.value)}></input> : name}
    </span>
  )
})

const Note = ({edit}) => {
  const [value, setValue] = React.useState('new');
  const handleChange = e => {
    setValue(e.target.value)
  }
  return (
    edit ? <TextField
      id="outlined-multiline-static"
      multiline
      rows={value.split("\n").length + 1}
      value={value}
      variant="outlined"
      onChange={handleChange}
    /> : (
      value.split("\n\n").map(str => <p dangerouslySetInnerHTML={{__html: str.replace("\n", '<br />')}}></p>)
    )
  )
}

export default Diary;
