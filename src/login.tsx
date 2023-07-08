import { FunctionComponent, useEffect, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import { setIsAuthenticated } from './CustomHooks/storageUtils';
declare const google: any;
const clientID =
  '992126380235-ts633blvsgkcc6e1di3da8999galkdf6.apps.googleusercontent.com';
//const secret = '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';
const Login: FunctionComponent<{}> = () => {
  const refSigninButton = useRef<HTMLDivElement>(null);
  const handleLoginSuccess = (accessToken: any) => {
    // Perform any necessary authentication logic

    setIsAuthenticated(jwtDecode(accessToken.credential));
    window.location.href = '/';
  };

  const handleLogout = () => {
    // Perform any necessary logout logic
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (google) {
      google.accounts.id.initialize({
        client_id: clientID,
        callback: handleLoginSuccess,
      });
      google.accounts.id.renderButton(refSigninButton.current, {
        theme: 'outline',
        size: 'large',
      });
    }
  }, []);
  return <div ref={refSigninButton}></div>;
};
export default Login;
