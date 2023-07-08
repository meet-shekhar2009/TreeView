import { NodeTextBoxProps, Node } from './types';

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import classNames from 'classnames';
import { EnumAction } from './constant';
import { mapObjects } from './utility';
const TextBox = <T extends {}>({
  currentNode,
  data,
  nodeLevel,
  isEditable,
  onSave,
  parentNode,
  setParent,
  setData,
  setShowTextbox,
  showTextbox,
}: NodeTextBoxProps<T>) => {
  const [text, setText] = useState(() => currentNode?.field || '');

  const handleEnterPress = (e: any) => {
    if (e.keyCode !== 13) return;
    setShowTextbox(false);
    const newNode = {
      field: e.target.value.toString(),
      id: uuidv4(),
    } as Node<T>;

    if (isEditable && currentNode) {
      mapObjects(newNode, currentNode, ['id', 'Children']);
      setData([...data]);
    } else {
      if (currentNode) {
        currentNode.Children = [newNode];
        setData([...data]);
      } else {
        setData([...data, newNode]);
        if (setParent) {
          setParent((k) => {
            return k.map((m) => {
              if (m.id === parentNode?.id) {
                m.Children?.push(newNode);
              }
              return m;
            });
          });
        }
      }
    }

    const action = isEditable ? EnumAction.UPDATE : EnumAction.ADD;
    if ((parentNode === null || nodeLevel > 1) && currentNode && onSave) {
      onSave(currentNode, newNode, action);
    } else if (onSave) {
      onSave(parentNode, newNode, action);
    }

    e.target.value = '';
  };

  return (
    <>
      {isEditable && (
        <input
          type="text"
          value={text}
          className="text-box editable-textbox margin-left-5"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleEnterPress}
          autoFocus
        />
      )}
      {!isEditable && showTextbox && (
        <input
          type="text"
          className="text-box node-textbox margin-left-45"
          onKeyDown={handleEnterPress}
          autoFocus
        />
      )}
    </>
  );
};
export default TextBox;
