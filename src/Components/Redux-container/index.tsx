import { Provider } from 'react-redux';
import { store } from '../../redux-store/store';
import Counter from '../counter';
import UserDetail from '../user/index';
const ReduxContainer = () => {
  return (
    <Provider store={store}>
      <Counter />
      <UserDetail />
    </Provider>
  );
};
export default ReduxContainer;
