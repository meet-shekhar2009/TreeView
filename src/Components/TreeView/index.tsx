import api from '../utils';

import './style.css';
import Expenses from './expense';
const database = 'expenses';
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
const TreeView = () => {
  return <Expenses apiService={apiService} controls={controls} />;
};

export default TreeView;
