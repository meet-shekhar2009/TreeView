import CreateActionIcons from './CreateActionIcons';
import { IconsProps, CollapseIconProps } from './types';

const CollapseButton = <T extends {}>({
  isCollapsed,
  setCollapsed,
}: CollapseIconProps<T>) => {
  return (
    <span onClick={() => setCollapsed((pre: boolean) => !pre)}>
      {isCollapsed ? '▶' : '▼'}
    </span>
  );
};

const Icons = <T extends {}>({
  showTextbox,
  setShowTextbox,
  isCollapsed,
  setCollapsed,
  data,
  setParent,
  setData,
  currentNode,
  onSave,
}: IconsProps<T>) => {
  if (currentNode?.Children) {
    return (
      <CollapseButton<T>
        isCollapsed={isCollapsed}
        setCollapsed={setCollapsed}
      />
    );
  }

  return (
    <>
      {!currentNode?.Children && (
        <CreateActionIcons<T>
          showTextbox={showTextbox}
          onSave={onSave}
          data={data}
          setData={setData}
          currentNode={currentNode}
          setParent={setParent}
          setShowTextbox={setShowTextbox}
        />
      )}
    </>
  );
};

export default Icons;
