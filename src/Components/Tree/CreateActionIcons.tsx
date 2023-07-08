import { EnumAction } from './constant';
import { CreateIconProps } from './types';
const CreateActionIcons = <T extends {}>({
  showTextbox,
  setShowTextbox,
  data,
  setData,
  setParent,
  currentNode,
  onSave,
}: CreateIconProps<T>) => {
  const handleNodeDeletion = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let currentEl = e.target as HTMLDivElement;
    if (currentEl.innerText.trim() !== '-' || !onSave || !data || !currentNode)
      return;

    for (let index = 0; index < data.length; index++) {
      if (data[index].id !== currentNode.id) continue;
      data.splice(index, 1);
      if (data.length !== 0 || !setParent) continue;

      setParent((k) => {
        return k.map((m) => {
          return m.Children?.some((k) => k.id === currentNode.id)
            ? { ...m, Children: undefined }
            : m;
        });
      });
    }
    setData([...data]);
    onSave(currentNode, null, EnumAction.DELETE);
  };

  return (
    <span className="action-container">
      <div
        className="action-btn add-btn"
        onClick={(e) => {
          setShowTextbox(!showTextbox);
        }}
      >
        {!showTextbox ? '+' : '-'}
      </div>
      {currentNode && (
        <div className="action-btn remove-btn" onClick={handleNodeDeletion}>
          -
        </div>
      )}
    </span>
  );
};
export default CreateActionIcons;
