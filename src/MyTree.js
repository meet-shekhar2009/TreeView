import React, { useState } from 'react';

const MenuItem = ({ item, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    onUpdate({ ...item, text });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setText(item.text);
  };

  return (
    <div>
      {editing ? (
        <div>
          <input type="text" value={text} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{item.text}</span>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
      {item.children && (
        <ul>
          {item.children.map((child) => (
            <li key={child.id}>
              <MenuItem item={child} onUpdate={onUpdate} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EditableMenu = () => {
  const [menu, setMenu] = useState({
    id: 1,
    text: 'Menu 1',
    children: [
      {
        id: 2,
        text: 'Submenu 1',
        children: [
          {
            id: 4,
            text: 'Submenu 1.1',
            children: [],
          },
        ],
      },
      {
        id: 3,
        text: 'Submenu 2',
        children: [],
      },
    ],
  });
  console.log(JSON.stringify(menu));
  const updateMenu = (updatedItem) => {
    const updatedMenu = updateMenuItem(menu, updatedItem);
    setMenu(updatedMenu);
  };

  const updateMenuItem = (item, updatedItem) => {
    if (item.id === updatedItem.id) {
      return updatedItem;
    }

    if (item.children) {
      return {
        ...item,
        children: item.children.map((child) =>
          updateMenuItem(child, updatedItem)
        ),
      };
    }

    return item;
  };

  return (
    <div>
      <MenuItem item={menu} onUpdate={updateMenu} />
    </div>
  );
};

export default EditableMenu;
