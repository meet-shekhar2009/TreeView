import { ExposedProps, Node, TreeProps } from './types';

import Tree from './views/Tree';
import { EnumAction } from './constant';
const TreeView = (props: ExposedProps) => {
  let finalData: Node[] = props.data || [];

  const findAndUpdate = async (
    root: Node[],
    node: Node | null | undefined,
    value: Node | null,
    action: EnumAction,
    pre?: Node | undefined
  ) => {
    for (let index = 0; index < root.length; index++) {
      let iterator = root[index];
      if (node && iterator.id === node.id) {
        switch (action) {
          case EnumAction.ADD:
            if (props.onAddRow && !(await props.onAddRow(value))) {
              break;
            }
            if (value) {
              if (iterator.Children) {
                iterator.Children.push(value);
              } else {
                iterator.Children = [value];
              }
            }
            break;
          case EnumAction.DELETE:
            if (props.onDeleteRow && !(await props.onDeleteRow(root[index]))) {
              break;
            }
            root.splice(index, 1);
            if (root && root.length <= 0 && pre) pre.Children = undefined;
            break;
          case EnumAction.UPDATE:
            if (props.onUpdateRow && !(await props.onUpdateRow(node))) {
              break;
            }
            root[index] = { ...iterator, ...node };
            break;
          default:
            break;
        }
        break;
      }

      if (iterator.Children) {
        findAndUpdate(iterator.Children, node, value, action, iterator);
      }
    }
  };

  const onSaveUpdateModal: TreeProps['onSave'] = async (
    node,
    value,
    action
  ) => {
    if (!node && value) {
      if (props.onAddRow && !(await props.onAddRow(value))) {
        return;
      }
      finalData.push({ ...value });
    } else {
      findAndUpdate(finalData, node, value ? { ...value } : value, action);
    }
    if (props.onDataChanges) props.onDataChanges(finalData);
  };

  return (
    <>
      <Tree
        {...props}
        root={finalData}
        nodeLevel={0}
        onSave={onSaveUpdateModal}
      ></Tree>
    </>
  );
};

export default TreeView;
