import React, { Component, useState, useContext, createContext, useRef, createRef} from 'react';
import SortableTree, { addNodeUnderParent, removeNode } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import useStateWithCallback from 'use-state-with-callback';
import { TextField, Checkbox } from '@material-ui/core';
import './Diary.css';

const MyContext = createContext(() => {})

const Diary = props => {
  const today = new Date()
  const [edit, setEdit] = useStateWithCallback(false, () => {
    console.log(nodes.map((n, i) => [n.ref.current, n.parentKey, i]))
  })
  const [treeData, setTreeData] = useState([])
  const [nodes, setNodes] = useState([])
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
    const node = { ref: ref, parentKey: parentKey, treeIndex: newTree.treeIndex }
    setNodes(prevNodes => [...prevNodes, node])
  }
  const deleteSelf = rowInfo => {
    setNodes(prevNodes => prevNodes.filter(n => n.treeIndex === rowInfo.treeIndex))
    setTreeData(removeNode({
      treeData: treeData,
      path: rowInfo.path,
      getNodeKey: ({ treeIndex }) => treeIndex
    }).treeData)
  }
  return (
    <div>
      <h2>{today.getDate()}日</h2>
      <button onClick={e => setEdit(e => !e)}>{edit ? 'save' : 'edit'}</button>
      {edit && <button onClick={addChild}>+</button>}
      <div className={'task-tree'} style={{ height: (nodes.length === 0 ? 62 : nodes.length * 62) + 50 }}>
        <MyContext.Provider value={edit}
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
      <Note/>
    </div>
  )
}

const statusToCheckBox = status => (
  {
    0: <span>・</span>,
    1: <input type='checkbox'></input>,
    2: <input type='checkbox' checked></input>
  }[status]
)

const TaskInput = React.forwardRef((props, ref) => {
  const [name, setName] = useState('new')
  const [status, setStatus] = useState(0)
  const edit = useContext(MyContext)
  return (
    <span ref={ref}>
      <span onClick={() => setStatus(s => (s + 1) % 3)}>{statusToCheckBox(status)}</span>
      {edit ? <input type="text" value={name} onChange={e => setName(e.target.value)}></input> : name}
    </span>
  )
})

const Note = props => {
  return (
    <TextField
      id="outlined-multiline-static"
      label="Multiline"
      multiline
      rows={6}
      defaultValue="Default Value"
      variant="outlined"
    />
  )
}

export default Diary;
