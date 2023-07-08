import { EnumAction } from '../constant';
import { CreateIconProps } from '../types';

const CreateActionIcons = ({
  showSection,
  setShowSection,
  data,
  setData,
  setParent,
  currentNode,
  addIcon,
  removeIcon,
  expandIcon,
  collapseIcon,
  onSave,
  showAddButton,
  showDeleteButton,
}: CreateIconProps) => {
  const handleOnRemoveNodeClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let currentEl = e.target as HTMLDivElement;
    if (showSection || !data || !currentNode) return;

    for (let index = 0; index < data.length; index++) {
      if (currentNode && data[index].id !== currentNode.id) continue;
      data.splice(index, 1);
      if (data.length !== 0 || !setParent) continue;

      setParent((k) =>
        k.map((m) => {
          return m.Children?.some(
            (k) => currentNode && k.id === currentNode.id
          ) || m.ChildrenIds.some((k) => currentNode && k === currentNode.id)
            ? { ...m, Children: undefined }
            : m;
        })
      );
    }
    setData([...data]);
    if (onSave) onSave(currentNode, null, EnumAction.DELETE);
  };

  function getIconText() {
    if (!showSection) {
      return addIcon ? addIcon : '+';
    }
    return removeIcon ? removeIcon : '-';
  }
  const handleOnCreateNewNodeClick = () =>
    setShowSection && setShowSection(!showSection);

  return (
    <span className="action-container">
      {showAddButton && (
        <div
          className={
            addIcon || removeIcon
              ? 'action-btn-cmn'
              : 'action-btn-cmn action-btn add-btn'
          }
          onClick={handleOnCreateNewNodeClick}
        >
          {getIconText()}
        </div>
      )}
      {showDeleteButton && currentNode && (
        <div
          className={
            removeIcon
              ? 'action-btn-cmn'
              : 'action-btn-cmn action-btn remove-btn'
          }
          onClick={handleOnRemoveNodeClick}
        >
          {removeIcon ? removeIcon : '-'}
        </div>
      )}
    </span>
  );
};
export default CreateActionIcons;
