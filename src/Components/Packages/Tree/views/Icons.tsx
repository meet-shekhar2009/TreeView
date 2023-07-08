import CreateActionIcons from './CreateActionIcons';
import { IconsProps } from '../types';

const Icons = (props: IconsProps) => {
  const handleExpandCollapse = () => props.setCollapsed((pre: boolean) => !pre);

  return (
    <>
      {props.currentNode?.Children && (
        <span onClick={handleExpandCollapse}>
          {props.isCollapsed ? '▶' : '▼'}
        </span>
      )}
      {(props.showAddButton || props.showDeleteButton) &&
        !props.currentNode?.Children && (
          <CreateActionIcons
            showSection={props.showSection}
            onSave={props.onSave}
            data={props.data}
            setData={props.setData}
            currentNode={props.currentNode}
            setParent={props.setParent}
            setShowSection={props.setShowSection}
            showAddButton={props.showAddButton}
            showDeleteButton={props.showDeleteButton}
            addIcon={props.addIcon}
            removeIcon={props.removeIcon}
            expandIcon={props.expandIcon}
            collapseIcon={props.collapseIcon}
          />
        )}
    </>
  );
};

export default Icons;
