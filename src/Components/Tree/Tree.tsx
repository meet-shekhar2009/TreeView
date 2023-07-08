import { useRef, useState } from 'react';
import { TreeProps } from './types';
import { v4 as uuidv4 } from 'uuid';
import TreeNode from './TreeNode';

const Tree = <T extends {}>({
  root,
  parentNode,
  nodeLevel,
  setParent,
  isEditable,
  render,
  onSave,
}: TreeProps<T>) => {
  const [data, setData] = useState(() => {
    if (!root) return [];
    return root.map((k) => ({ ...k }));
  });

  return (
    <>
      <ul className="tree-ul">
        {data.map((k) => (
          <li className="node-li" key={k.id}>
            <TreeNode<T>
              currentNode={k}
              data={data}
              key={'n-' + k.id}
              nodeLevel={nodeLevel + 1}
              onSave={onSave}
              parentNode={parentNode || null}
              setData={setData}
              setParent={setParent}
              isEditable={isEditable}
              render={render}
            ></TreeNode>
          </li>
        ))}
        <li key={uuidv4()} className="display-flex add-li">
          <TreeNode<T>
            data={data}
            key={uuidv4()}
            nodeLevel={nodeLevel}
            onSave={onSave}
            setParent={setParent}
            parentNode={parentNode}
            setData={setData}
            isEditable={false}
            render={render}
          ></TreeNode>
        </li>
      </ul>
    </>
  );
};

export default Tree;
