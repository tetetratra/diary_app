import React, { useState, useContext, createContext, createRef} from 'react';
import SortableTree, { addNodeUnderParent, removeNode, walk, changeNodeAtPath } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import { TextField } from '@material-ui/core';
import './Diary.css';

const EditContext = createContext(() => {})

const getNodeKey = ({ treeIndex }) => treeIndex

const Diary = props => {
  const date = props.date
  const [edit, setEdit] = useState(false)
  const [treeData, setTreeData] = useState([
    {name: "1"},
    {name: "2"},
    {name: "3"}
  ])
  // const getNodeKey = ({ node }) => node.id
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
  const treeSize = () => {
    let count = 0
    walk({
      treeData: treeData,
      getNodeKey: getNodeKey,
      callback: n => {count += 1}
    })
    return count
  }
  const addChild = treeIndex => {
    const newNode = { name: "" }
    const newTree = addNodeUnderParent({
      treeData: treeData,
      newNode: newNode,
      parentKey: treeIndex,
      getNodeKey: getNodeKey
    })
    setTreeData(newTree.treeData)
  }
  return (
    <div>
      <h2>{date.month() + 1}月{date.date()}日</h2>
      <button onClick={toggleEdit}>{edit ? 'save' : 'edit'}</button>
      {edit && <button onClick={() => addChild(undefined)}>+</button>}
      <div
        className={'task-tree'}
        style={{ height: (treeSize() === 0 ? 62 : treeSize() * 62) + 60 }}
        onClick={!edit && setEdit}
      >
        <EditContext.Provider value={edit}
          children={
            <Tree treeData={treeData} setTreeData={setTreeData}/>
          }
        />
      </div>
      <div className={'note'} onClick={!edit && setEdit}>
        <Note edit={edit}/>
      </div>
    </div>
  )
}

const Tree = ({treeData, setTreeData}) => {
  return (
    <SortableTree
      treeData={treeData}
      onChange={treeData => setTreeData(treeData)}
      generateNodeProps={({ node, path, treeIndex }) => ({
        title: (
          <form>
            <input
              value={node.name}
              onChange={event => {
                const name = event.target.value;
                setTreeData(treeDataOld => (
                  changeNodeAtPath({
                    treeData: treeDataOld,
                    path,
                    getNodeKey,
                    newNode: { ...node, name }
                  })
                ))
              }}
            />
          </form>
        )
      })}
    />
  )
}



  // const Tree = props => { // 元のコード
  //   return (
  //     <SortableTree
  //       treeData={treeData}
  //       onChange={treeData => setTreeData(treeData)}
  //       theme={FileExplorerTheme}
  //       generateNodeProps={rowInfo => ({
  //         buttons: [
  //           (edit && <button onClick={e => addChild(rowInfo)}>+</button>),
  //           (edit && <button onClick={e => deleteSelf(rowInfo)}>-</button>)
  //         ]
  //       })}
  //       canDrag={edit}
  //     />
  //   )
  // }

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
