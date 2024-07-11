import { useState } from 'react';
import { Tree as TreeCompProps } from '../types';
import { v4 as uuidv4 } from 'uuid';
import TreeNode from './TreeNode';

const Tree = (props: TreeCompProps) => {
  const [data, setData] = useState(() => {
    if (!props.root) return [];
    return props.root.map((k) => ({ ...k }));
  });
  const RenderHeader = props.renderHeader;
  return (
    <>
      <ul className="tree-ul">
        {RenderHeader && (
          <li className="node-li">
            <span className="node-container editable">
              <RenderHeader />
            </span>
          </li>
        )}
        {props.root.map((k) => (
          <li className="node-li" key={k.id}>
            <TreeNode
              currentNode={k}
              data={data}
              key={'n-' + k.id}
              nodeLevel={props.nodeLevel + 1}
              onSave={props.onSave}
              parentNode={props.parentNode || null}
              setData={setData}
              setParent={props.setParent}
              isEditable={props.isEditable}
              render={props.render}
              showAddButton={props.showAddButton}
              showDeleteButton={props.showDeleteButton}
              addIcon={props.addIcon}
              removeIcon={props.removeIcon}
              expandIcon={props.expandIcon}
              collapseIcon={props.collapseIcon}
            ></TreeNode>
          </li>
        ))}

        {props.showAddButton && (
          <li key={uuidv4()} className="display-flex add-li">
            <TreeNode
              data={data}
              key={uuidv4()}
              nodeLevel={props.nodeLevel}
              onSave={props.onSave}
              setParent={props.setParent}
              parentNode={props.parentNode}
              setData={setData}
              isEditable={props.isEditable}
              render={props.render}
              isAddNewNode={true}
              showAddButton={props.showAddButton}
              showDeleteButton={props.showDeleteButton}
              addIcon={props.addIcon}
              removeIcon={props.removeIcon}
              expandIcon={props.expandIcon}
              collapseIcon={props.collapseIcon}
            ></TreeNode>
          </li>
        )}
      </ul>
    </>
  );
};

export default Tree;
