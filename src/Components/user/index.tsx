import { connect } from 'react-redux';
import { saveUser } from '../../redux-store/actions';
import { State } from '../../redux-store/types';
import { FunctionComponent } from 'react';
import { Action } from 'redux';

interface Props {
  Name: string;
  Age: number;
  fetchUser: () => any;
}

type DispatchAction = <A extends Action>(action: A) => A;

function fetchUser() {
  return async (dispatch: DispatchAction) => {
    const user = await (
      await fetch('https://jsonplaceholder.typicode.com/users')
    ).json();
    let index = parseInt((Math.random() * 10).toFixed(0));
    index = index === 10 ? 9 : index;
    dispatch(
      saveUser({
        Name: user[index].name,
        Age: parseInt((Math.random() * 100).toFixed(0)),
      })
    );
  };
}
const UserDetail: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <h3>User Detail</h3>
      <div className="padding-8">Name: {props.Name}</div>
      <div className="padding-8">Age: {props.Age}</div>
      <button
        className="padding-8 btn"
        onClick={() => {
          props.fetchUser();
        }}
      >
        Update User
      </button>
    </div>
  );
};
const mapStateToProps = (state: State) => {
  return {
    Name: state.User.Name,
    Age: state.User.Age,
  };
};
const matchDispatchToProp = {
  fetchUser,
};
export default connect(mapStateToProps, matchDispatchToProp)(UserDetail);
