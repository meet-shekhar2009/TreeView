import { Node, TemplateProps } from '../Packages/Tree/types';
import EditableTableTemplate from '../UserTreeViewTemplets/TestTemplate';
import { useState } from 'react';
import api from '../utils';
import Detail from '../TreeView/details';
import ApiTreeFirstLevel from '../ApiTreeFirstLevel';

const database = 'myexpenses';
const apiService = api(database);
const controls = [
  {
    placeholder: 'Description',
    name: 'name',
    width: 45,
  },
  {
    type: 'number',
    placeholder: 'Amount',
    name: 'amount',
    width: 45,
  },
];

const ExpenseView = () => {
  const [datasource, setDatasource] = useState<Node[]>([]);

  const template = (prps: TemplateProps) => {
    const Template = EditableTableTemplate(controls);
    return <Template {...prps} />;
  };

  return (
    <>
      <h3>My Expenses</h3>
      <div className="main-container">
        <div className="divide-equal">
          <ApiTreeFirstLevel
            datasource={datasource}
            setDatasource={setDatasource}
            apiService={apiService}
            template={template}
          />
        </div>
        <div className="divide-equal expense-detail">
          <Detail datasource={datasource} balance={0} />
        </div>
      </div>
    </>
  );
};

export default ExpenseView;
