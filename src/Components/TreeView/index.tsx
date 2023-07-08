import {
  getLocalStorageValue,
  setLocalStorageValue,
} from '../../CustomHooks/storageUtils';
import { Node } from '../Packages/Tree/types';
import Tree from '../Packages/Tree';
import TestTemplate from '../UserTreeViewTemplets/TestTemplate';
const STATE_NAME = 'TreeVeiw';
const TreeView = () => {
  let data = getLocalStorageValue(STATE_NAME) || [];
  return (
    <Tree
      data={data}
      onDataChanges={onDataChange}
      showAddButton={true}
      showDeleteButton={true}
      isEditable={false}
      addIcon={<i className="fa-solid fa-plus"></i>}
      removeIcon={<i className="fa-solid fa-minus"></i>}
      render={(props) => <TestTemplate {...props} />}
    />
  );
};

function onDataChange(data: Node[]) {
  setLocalStorageValue(STATE_NAME, data);
}
export default TreeView;
