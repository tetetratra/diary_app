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

const Tree = ({treeData, setTreeData, edit, setEdit}) => {
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
    const newNode = { name: "", expanded: true }
    const newTree = addNodeUnderParent({
      treeData: treeData,
      newNode: newNode,
      parentKey: treeIndex,
      getNodeKey: getNodeKey
    })
    setTreeData(newTree.treeData)
  }
  const deleteSelf = path => {
    const newTree = removeNode({
      treeData: treeData,
      path: path,
      getNodeKey: getNodeKey
    })
    setTreeData(newTree.treeData)
  }
  return (
    <div
      className={'task-tree'}
      style={{ height: (treeSize() === 0 ? 62 : treeSize() * 62) + 60 }}
      onClick={!edit && setEdit}
    >
      {edit && <button onClick={() => addChild(undefined)}>+</button>}
      <SortableTree
        treeData={treeData}
        theme={FileExplorerTheme}
        canDrag={edit}
        onChange={treeData => setTreeData(treeData)}
        generateNodeProps={({ node, path, treeIndex }) => ({
          buttons: [
            (edit && <button onClick={() => addChild(treeIndex)}>+</button>),
            (edit && <button onClick={() => deleteSelf(path)}>-</button>)
          ],
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
    </div>
  )
}

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
