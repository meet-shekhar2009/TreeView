import { useState, KeyboardEvent } from 'react';
import { TemplateProps } from '../types';
import './style.css';

const UserTemplate = ({
  dataItem,
  isEditable,
  isAddNewNode,
  handleSaveNode,
}: TemplateProps) => {
  const [text, setText] = useState(() => {
    if (!dataItem || !dataItem.field) return '';
    return dataItem.field;
  });

  const handleSaveItem = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() !== 'enter' && e.key.toLowerCase() !== 'tab')
      return;

    handleSaveNode && handleSaveNode({ field: text });
    setText('');
  };

  return (
    <>
      <input
        type="text"
        value={text}
        readOnly={!isEditable && !isAddNewNode}
        className="text-box user-template"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleSaveItem}
        autoFocus
      />
    </>
  );
};

export default UserTemplate;
