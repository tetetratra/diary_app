import SortableTree, { addNodeUnderParent, removeNode, walk, changeNodeAtPath } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';

const getNodeKey = ({ treeIndex }) => treeIndex

const Tree = ({date, treeData, setTreeData, edit, setEdit}) => {
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
    const newNode = { name: "", status: 0, expanded: true }
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
  const statusToIcomClass = ({
    0: 'fas fa-xs fa-circle',
    1: 'far fa-square',
    2: 'far fa-check-square'
  })
  return (
    <div
      className={'task-tree'}
      style={{ height: (treeSize() === 0 ? 62 : treeSize() * 62) + 40 }}
      onClick={() => setEdit(true)}
    >
      {edit && <i onClick={() => addChild(undefined)} className={'fas fa-plus'} />}
      <SortableTree
        key={date}
        treeData={treeData}
        theme={FileExplorerTheme}
        canDrag={edit}
        onChange={treeData => setTreeData(treeData)}
        generateNodeProps={({ node, path, treeIndex }) => ({
          buttons: [
            (edit && <i onClick={() => addChild(treeIndex)} className={'fas fa-plus'}>&nbsp;</i>),
            (edit && <i onClick={() => deleteSelf(path)} className={'fas fa-minus'}>&nbsp;</i>),
          ],
          title: (
            edit ? <>
              <i
                className={statusToIcomClass[node.status]}
                onClick={ () =>
                  setTreeData(treeDataOld => (
                    changeNodeAtPath({
                      treeData: treeDataOld,
                      path,
                      getNodeKey,
                      newNode: { ...node, status: (node.status + 1) % 3 }
                    })
                  ))
                }
              >&nbsp;&nbsp;</i>
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
            </> : (
              <p>{node.status !== 0 && <i className={statusToIcomClass[node.status]} />}&nbsp;&nbsp;{node.name}</p>
            )
          )
        })}
      />
    </div>
  )
}

export default Tree
