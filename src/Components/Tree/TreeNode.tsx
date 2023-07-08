import TextBox from './Textbox';
import Icons from './Icons';
import { NodeProps } from './types';
import { useState } from 'react';
import Tree from './Tree';
import { validateFieldAndRenderValues } from './validations';

const TreeNode = <T extends {}>(props: NodeProps<T>) => {
  validateFieldAndRenderValues(props);

  let {
    currentNode,
    nodeLevel,
    render,
    onSave,
    isEditable,
    data,
    setData,
    setParent,
  } = props;
  const [showTextbox, setShowTextbox] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);

  function ShowNodeContent() {
    if (render) {
      //TODO
      return render(props);
    } else {
      if (isEditable) {
        return (
          <TextBox<T>
            {...props}
            setShowTextbox={setShowTextbox}
            showTextbox={showTextbox}
          />
        );
      } else {
        return <span className="node-text">{currentNode?.field}</span>;
      }
    }
  }

  return (
    <>
      <Icons
        {...{
          showTextbox,
          setShowTextbox,
          isCollapsed,
          setCollapsed,
          currentNode,
          setParent,
          setData,
          data,
          onSave,
        }}
      ></Icons>
      <ShowNodeContent />
      <TextBox<T>
        {...props}
        isEditable={false}
        setShowTextbox={setShowTextbox}
        showTextbox={showTextbox}
      />

      {!isCollapsed && currentNode?.Children && (
        <Tree
          parentNode={currentNode}
          root={currentNode?.Children}
          nodeLevel={nodeLevel + 1}
          isEditable={isEditable}
          setParent={setData}
          onSave={onSave}
          render={render}
        />
      )}
    </>
  );
};

export default TreeNode;
