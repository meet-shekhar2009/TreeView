import { IS_AUTH, UserType } from '../../CustomHooks/storageUtils';
import useLocalStorage from '../../CustomHooks/useLocalStorage';
import './style.css';
const HomePage = () => {
  const [user] = useLocalStorage<UserType>(IS_AUTH);
  return (
    <main>
      {user && (
        <section>
          <img src={user.picture} alt="loading.." height="45px" />
          <h1>Welcome {user.name}</h1>
          <h2>About Me</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
            risus eget purus porttitor fringilla. Donec faucibus, nisi quis
            suscipit pulvinar, nulla metus placerat lectus, sed dignissim leo
            tortor eu leo. Nam vitae finibus dolor, sed finibus elit. Fusce et
            odio orci. Suspendisse auctor, velit vitae rutrum ullamcorper, ex
            enim aliquet turpis, sed pharetra arcu enim vitae lectus. Mauris
            maximus lacus ut nunc fermentum cursus. Nullam fringilla est sit
            amet semper faucibus. Mauris varius neque quis ligula pellentesque,
            in cursus quam placerat. Fusce sed velit vitae lacus fringilla
            hendrerit vel nec ligula.
          </p>
        </section>
      )}

      <section>
        <h2>Projects</h2>
        <ul>
          <li>
            <h3>Project 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </li>
          <li>
            <h3>Project 2</h3>
            <p>
              Ut tristique diam non ligula iaculis, eget cursus urna rutrum.
            </p>
          </li>
          <li>
            <h3>Project 3</h3>
            <p>Phasellus vitae turpis eget diam viverra gravida nec id nisl.</p>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default HomePage;
