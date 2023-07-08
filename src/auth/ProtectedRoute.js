import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { IS_AUTH } from '../CustomHooks/storageUtils';
import useLocalStorage from '../CustomHooks/useLocalStorage';

const ProtectedRoute = () => {
  const [auth] = useLocalStorage(IS_AUTH);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
