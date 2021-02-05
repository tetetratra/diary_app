import SortableTree, { addNodeUnderParent, removeNode, walk, changeNodeAtPath } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';

const getNodeKey = ({ treeIndex }) => treeIndex

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
            edit ? (
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
            ) : (
              node.name
            )
          )
        })}
      />
    </div>
  )
}

export default Tree
