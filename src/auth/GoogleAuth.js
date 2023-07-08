import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleAuth = ({ onSuccess, onFailure }) => {
  const responseGoogle = (response) => {
    if (response && response.accessToken) {
      onSuccess(response.accessToken);
    } else {
      onFailure();
    }
  };

  return (
    <GoogleLogin
      clientId="YOUR_CLIENT_ID"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleAuth;
