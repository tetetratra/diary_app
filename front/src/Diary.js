import React, { Component, useState, useContext, createContext, useRef, createRef} from 'react';
import SortableTree, { addNodeUnderParent, removeNode } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import useStateWithCallback from 'use-state-with-callback';

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
    const node = { ref: ref, parentKey: parentKey }
    setNodes(prevNodes => [...prevNodes, node])
    const newNode = {
      title: <TaskInput ref={ref}/>,
      expanded: true
    }
    setTreeData(addNodeUnderParent({
      treeData: treeData,
      newNode: newNode,
      parentKey: parentKey,
      getNodeKey: ({ treeIndex }) => treeIndex
    }).treeData)
  }
  const deleteSelf = rowInfo => {
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
      <div style={{ height: 800 }}>
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
          />}
        />
      </div>
    </div>
  )
}

const TaskInput = React.forwardRef((props, ref) => {
  const [name, setName] = useState('new')
  const edit = useContext(MyContext)
  return (
    <p ref={ref}>{
      edit
      ? <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
      : name
    }</p>
  )
})


export default Diary;
