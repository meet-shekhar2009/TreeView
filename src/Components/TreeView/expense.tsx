import { Node, TemplateProps } from '../Packages/Tree/types';
import EditableTableTemplate from '../UserTreeViewTemplets/TestTemplate';
import { useState } from 'react';
import api from '../utils';
import Detail from './details';
import Balance from './balance';
import ApiTreeFirstLevel from '../ApiTreeFirstLevel';
import './style.css';

interface Props {
  apiService: any;
  controls: any[];
}
const Expenses = (props: Props) => {
  const [balance, setBalance] = useState(0);
  const [datasource, setDatasource] = useState<Node[]>([]);

  const template = (prps: TemplateProps) => {
    const Template = EditableTableTemplate(props.controls);
    return <Template {...prps} />;
  };

  return (
    <>
      <div className="main-container">
        <div className="divide-equal">
          <Balance balance={balance} setBalance={setBalance} />
          <ApiTreeFirstLevel
            datasource={datasource}
            setDatasource={setDatasource}
            apiService={props.apiService}
            template={template}
          />
        </div>
        <div className="divide-equal expense-detail">
          <Detail datasource={datasource} balance={balance} />
        </div>
      </div>
    </>
  );
};

export default Expenses;
