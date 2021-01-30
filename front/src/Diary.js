import React, { Component, useState, useContext, createContext} from 'react';
import SortableTree, { addNodeUnderParent, removeNode } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';

const MyContext = createContext(() => {})

const Diary = props => {
  const today = new Date()
  const [edit, setEdit] = useState(false)
  const [treeData, setTreeData] = useState([])
  const changeEdit = e => {
    setEdit(prev => !prev)
    if(edit){
      console.log(treeData)
    }
  }
  const addChild = rowInfo => {
    const newNode = {
      title: <TaskInput/>,
      expanded: true
    }
    setTreeData(addNodeUnderParent({
      treeData: treeData,
      newNode: newNode,
      parentKey: rowInfo ? rowInfo.treeIndex : undefined,
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
      <button onClick={changeEdit}>{edit ? 'save' : 'edit'}</button>
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

const TaskInput = props => {
  const [name, setName] = useState('new')
  const edit = useContext(MyContext)
  return (
    edit ? <input type="text" value={name} onChange={e => setName(e.target.value)}></input> : name
  )
}


export default Diary;
