import { FC } from 'react';
import { Fields, Node } from '../Tree/types';

import {
  getLocalStorageValue,
  setLocalStorageValue,
} from '../../CustomHooks/storageUtils';
import Tree from './Tree';
import { EnumAction } from './constant';

const TreeView: FC = () => {
  // const dataNode: Node[] = [
  //   { name: 'Shekhar', id: 'hghg1' },
  //   {
  //     name: 'Nutan',
  //     id: 'hghg2',
  //     Children: [
  //       { name: 'item 1', id: 'hghg3' },
  //       { name: 'item 1', id: 'hghg4' },
  //     ],
  //   },
  // ];
  const STATE_NAME = 'TreeData1';

  let finalData: Node<Fields>[] = getLocalStorageValue(STATE_NAME) || [];

  const findAndUpdate = (
    root: Node<Fields>[],
    node: Node<Fields> | null | undefined,
    value: Node<Fields> | null,
    action: EnumAction,
    pre?: Node<Fields> | undefined
  ) => {
    for (let index = 0; index < root.length; index++) {
      let iterator = root[index];
      if (node && iterator.id === node.id) {
        switch (action) {
          case EnumAction.ADD:
            if (value) {
              if (iterator.Children) {
                iterator.Children.push(value);
              } else {
                iterator.Children = [value];
              }
            }
            break;
          case EnumAction.DELETE:
            root.splice(index, 1);
            if (root && root.length <= 0 && pre) pre.Children = undefined;
            break;
          case EnumAction.UPDATE:
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

  return (
    <>
      <Tree<Fields>
        root={finalData}
        nodeLevel={0}
        isEditable={true}
        // render={(prop) => {
        //   return <>{JSON.stringify(prop)}</>;
        // }}
        onSave={(node, value, action) => {
          if (!node && value) {
            finalData.push({ ...value });
          } else {
            findAndUpdate(
              finalData,
              node,
              value ? { ...value } : value,
              action
            );
          }
          setLocalStorageValue(STATE_NAME, finalData);
          //console.log(JSON.stringify(finalData, null, 4));
        }}
      />
    </>
  );
};

export default TreeView;
