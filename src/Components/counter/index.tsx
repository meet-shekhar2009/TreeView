import { useSelector, useDispatch } from 'react-redux';
import { decrementCounter, incrementCounter } from '../../redux-store/actions';
import { State } from '../../redux-store/types';
import useLocalStorage from '../../CustomHooks/useLocalStorage';

interface Props {
  CounterValue: number;
  setCounter: (value: number) => void;
  children: any;
}

const CounterBody: React.FC<Props> = ({
  CounterValue,
  setCounter,
  children,
}) => {
  return (
    <>
      <h3>{children}</h3>
      <input
        className="padding-8 margin-5 input-control"
        type="text"
        value={CounterValue}
        onChange={() => {}}
      />
      <div>
        <button
          className="padding-8 margin-5 btn"
          onClick={() => setCounter(+1)}
        >
          Increment (+)
        </button>
        <button
          className="padding-8 margin-5 btn"
          onClick={() => setCounter(-1)}
        >
          Decrement (-)
        </button>
      </div>
    </>
  );
};

const ReduxCounter = () => {
  let counter = useSelector((state: State) => state.Counter.value);
  const dispatch = useDispatch();
  const handleclick = (val: number) => {
    if (val > -1) {
      dispatch(incrementCounter());
    } else {
      dispatch(decrementCounter());
    }
  };
  return (
    <CounterBody CounterValue={counter} setCounter={handleclick}>
      Redux Counter
    </CounterBody>
  );
};

const StateCounter = () => {
  const [state, setState] = useLocalStorage<number>('UserData', 0);
  const handleclick = (val: number) => {
    setState(state + val);
  };
  return (
    <CounterBody CounterValue={state} setCounter={handleclick}>
      Storage Counter {state}
    </CounterBody>
  );
};

const Counter = () => {
  return (
    <div>
      <div>
        <ReduxCounter></ReduxCounter>
      </div>
      <div>
        <StateCounter></StateCounter>
      </div>
    </div>
  );
};
export default Counter;
