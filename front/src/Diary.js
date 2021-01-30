import React, { Component, useState, useContext, createContext} from 'react';
import SortableTree, { addNodeUnderParent, removeNode } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';

const Diary = props => {
  const today = new Date()
  const [edit, setEdit] = useState(false)
  const [treeData, setTreeData] = useState([
    {
      title: 'Chicken',
      children: [
        {
          title: 'Egg'
        }
      ]
    },
    { title: 'Fish',
      children: [
        {
          title: 'fingerline'
        }
      ]
    },
  ])
  const changeEdit = e => {
    setEdit(prev => !prev)
    if(edit){
      console.log(treeData)
    }
  }
  const addChild = rowInfo => {
    const newNode = {
      title: 'new',
      expanded: true
    }
    const newTree = addNodeUnderParent({
      treeData: treeData,
      newNode: newNode,
      parentKey: rowInfo ? rowInfo.treeIndex : undefined,
      getNodeKey: ({ treeIndex }) => treeIndex
    })
    setTreeData(newTree.treeData)
  }
  const deleteSelf = rowInfo => {
    const newTree = removeNode({
      treeData: treeData,
      path: rowInfo.path,
      getNodeKey: ({ treeIndex }) => treeIndex
    })
    setTreeData(newTree.treeData)
  }
  const initTree = () => {
    setTreeData([
      { title: 'root', expanded: true },
    ])
  }
  return (
    <div>
      <h2>{today.getDate()}日</h2>
      <button onClick={changeEdit}>{edit ? 'save' : 'edit'}</button>
      {treeData.length === 0 && <button onClick={initTree}>init task tree</button>}
      <div style={{ height: 800 }}>
        <SortableTree
          treeData={treeData}
          onChange={treeData => setTreeData(treeData)}
          theme={FileExplorerTheme}
          generateNodeProps={rowInfo => ({
            buttons: [
              <button onClick={e => addChild(rowInfo)}>+</button>,
              <button onClick={e => deleteSelf(rowInfo)}>-</button>
            ]
          })}
        />
      </div>
    </div>
  )
}

export default Diary;
