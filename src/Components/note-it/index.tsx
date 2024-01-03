import { useState } from 'react';
import ApiTreeFirstLevel from '../ApiTreeFirstLevel';
import api from '../utils';
import EditableTableTemplate from '../UserTreeViewTemplets/TestTemplate';
import { Node, TemplateProps } from '../Packages/Tree/types';

const database = 'noteit';
const apiService = api(database);
const controls = [
  {
    placeholder: 'Title',
    name: 'title',
    width: 47,
  },
  {
    type: 'textarea',
    placeholder: 'Description',
    name: 'description',
    width: 47,
  },
];

function NoteIt() {
  const [datasource, setDatasource] = useState<Node[]>([]);

  const template = (props: TemplateProps) => {
    const Template = EditableTableTemplate(controls);
    return <Template {...props} />;
  };
  return (
    <>
      <h3>Notes</h3>
      <ApiTreeFirstLevel
        datasource={datasource}
        setDatasource={setDatasource}
        apiService={apiService}
        template={template}
      />
    </>
  );
}

export default NoteIt;
