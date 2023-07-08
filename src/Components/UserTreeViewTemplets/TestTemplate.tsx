import { useState, MouseEvent } from 'react';
import { TemplateProps } from '../Packages/Tree/types';
import './style.css';
const TestTemplate = ({ dataItem, handleSaveNode }: TemplateProps) => {
  const [name, setName] = useState(dataItem?.name || '');
  const [email, setEmail] = useState(dataItem?.email || '');

  const handleSaveItem = (e: MouseEvent) => {
    handleSaveNode && handleSaveNode({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <div className="display-flex test-container" style={{ width: '350px' }}>
      <div className="width-40">
        <input
          type="text"
          value={name}
          className="text-box full-width"
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </div>
      <div className="width-40">
        <input
          type="text"
          value={email}
          className="text-box full-width"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <div style={{ width: '16%', textAlign: 'right' }}>
        <button className="padding-8 margin-5 btn" onClick={handleSaveItem}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TestTemplate;
