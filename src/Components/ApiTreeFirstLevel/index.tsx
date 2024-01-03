import { Node, TreeProps } from '../Packages/Tree/types';
import Tree from '../Packages/Tree';
import TestTemplate from '../UserTreeViewTemplets/TestTemplate';

import { useEffect, useState } from 'react';
import { transform } from '../utils';
import Toast, { ToastType } from '../Packages/Controls/Toast';

interface Props {
  apiService: any;
  datasource: Node[];
  setDatasource: (value: Node[]) => void;
  template?: TreeProps['render'];
}

const ApiTreeFirstLevel = ({
  apiService,
  datasource,
  setDatasource,
  template,
}: Props) => {
  const [isVisible, setToastVisibility] = useState(false);

  async function getData() {
    const response = await apiService.get('GET', '/list');

    setDatasource([...(response as Node[])]);
  }

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  async function handleAddRow(data: Node | null) {
    await apiService.create('POST', '/add', data);
    await getData();
    setToastVisibility(true);
    return true;
  }

  async function handleUpdateRow(data: Node | null) {
    await apiService.patch('PATCH', `/patch/${data?.id}`, data);
    await getData();
    setToastVisibility(true);
    return true;
  }

  async function handleDeleteRow(data: Node | null) {
    await apiService.remove('DELETE', `/delete/${data?.id}`);
    await getData();
    setToastVisibility(true);
    return true;
  }
  console.log(datasource);

  return (
    <>
      <Toast
        type={ToastType.sucess}
        text={'Done'}
        isVisible={isVisible}
        setToastVisibility={setToastVisibility}
      ></Toast>
      <Tree
        data={datasource}
        showAddButton={true}
        showDeleteButton={true}
        isEditable={false}
        onAddRow={handleAddRow}
        onUpdateRow={handleUpdateRow}
        onDeleteRow={handleDeleteRow}
        addIcon={<i className="fa-solid fa-plus"></i>}
        removeIcon={<i className="fa-solid fa-minus"></i>}
        render={template}
      />
    </>
  );
};

export default ApiTreeFirstLevel;
