import { Provider } from 'react-redux';
import { store } from '../store';
import Counter from './counter';
import UserDetail from './user';

const Container = () => {
  return (
    <Provider store={store}>
      <Counter />
      <UserDetail />
    </Provider>
  );
};
export default Container;
