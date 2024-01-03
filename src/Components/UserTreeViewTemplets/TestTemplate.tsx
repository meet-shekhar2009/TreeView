import { useState, MouseEvent } from 'react';
import { TemplateProps } from '../Packages/Tree/types';
import './style.css';
import Input from '../Packages/Controls/Input';

const EditableTableTemplate =
  (controls: any[]) =>
  ({ dataItem, handleSaveNode }: TemplateProps) => {
    function getModel(controls: any) {
      return (reset: boolean = false) => {
        return controls.reduce((pre: any, { name }: { name: string }) => {
          if (reset) {
            pre[name] = '';
            return pre;
          }
          pre[name] = dataItem?.[name] || '';
          return pre;
        }, {});
      };
    }

    const [model, setModel] = useState(getModel(controls)());

    const handleSaveItem = (e: MouseEvent) => {
      handleSaveNode && handleSaveNode(model);
      setModel(getModel(controls)(true));
    };

    return (
      <div className="display-flex test-container">
        {controls.map((props, index) => (
          <div style={{ width: `${props.width}%` }} key={`contol- ${index}`}>
            <Input {...props} model={model} setModel={setModel} />
          </div>
        ))}

        <div>
          <button className="padding-8 margin-5 btn" onClick={handleSaveItem}>
            Save
          </button>
        </div>
      </div>
    );
  };

export default EditableTableTemplate;
