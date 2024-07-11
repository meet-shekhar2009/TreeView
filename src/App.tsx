import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';

import ProtectedRoute from './auth/ProtectedRoute';
import User from './Components/user';
import Login from './login';
import { IS_AUTH, UserType } from './CustomHooks/storageUtils';
import useLocalStorage from './CustomHooks/useLocalStorage';
import TreeView from './Components/TreeView';
import HomePage from './Components/home';
import Layout from './Custom';
import NoteIt from './Components/note-it';
import ExpenseView from './Components/my-expenses';
import FlowView from './Components/flow';
import WorflowView from './Components/Workflows';
import JBFlow from './Components/JBFlow';
import DraggableDiv from './Components/DraggableDiv';
import Coordinates from './Components/Coordinates';
import ResizableRectangle from './Components/resizable';
import Notebook from './Components/NoteIt';
import Spiral from './Components/spiral';
import NoEffect from './Components/stream-remove-effect';
import Game from './Components/snakeGame';

const Counter = lazy(() => import('./Components/counter'));

function App() {
  const [user] = useLocalStorage<UserType>(IS_AUTH);

  const routes = [
    { path: '/', text: 'Home', element: <HomePage />, isProtected: false },
    { path: '/user', text: 'User', element: <HomePage />, isProtected: true },
    {
      path: '/counter',
      text: 'Counter',
      element: <Counter />,
      isProtected: true,
    },
    {
      path: '/hierarchy',
      text: 'common',
      element: <TreeView />,
      isProtected: false,
    },
    {
      path: '/expenses',
      text: 'Expenses',
      element: <ExpenseView />,
      isProtected: true,
    },
    { path: '/noteit', text: 'Notes', element: <NoteIt />, isProtected: true },
    {
      path: '/flows',
      text: 'Flows',
      element: <FlowView />,
      isProtected: false,
    },
    {
      path: '/workflows',
      text: 'Workflows',
      element: <WorflowView />,
      isProtected: false,
    },
    {
      path: '/jbflow',
      text: 'JB Workflows',
      element: <JBFlow />,
      isProtected: false,
    },
    {
      path: '/draggablediv',
      text: 'Draggable Reactangle',
      element: <DraggableDiv />,
      isProtected: false,
    },
    { path: '/coordinates', text: 'Co-Ordinates', element: <Coordinates /> },
    {
      path: '/resizable',
      text: 'Resizable Rectangle',
      element: <ResizableRectangle />,
      isProtected: false,
    },
    {
      path: '/notebook',
      text: 'Notebook',
      element: <Notebook />,
      isProtected: false,
    },
    {
      path: '/spiral',
      text: 'Spiral',
      element: <Spiral />,
      isProtected: false,
    },
    {
      path: '/noeffect',
      text: 'noeffect',
      element: <NoEffect />,
      isProtected: false,
    },
    {
      path: '/snake',
      text: 'snake',
      element: <Game />,
      isProtected: false,
    },
  ];

  return (
    <BrowserRouter>
      <ul className="menu">
        {routes.map((k) => (
          <li key={k.text}>
            <Link to={k.path}>{k.text}</Link>
          </li>
        ))}
      </ul>
      {user && (
        <div className="user-login-status">
          <img src={user?.picture} alt="loading.." height="25px" />
          <span className="user-name">{user?.name}</span>
          <span
            className="logout"
            onClick={() => {
              localStorage.removeItem(IS_AUTH);
              window.location.href = '/';
            }}
          >
            Logout
          </span>
        </div>
      )}

      <div className="container">
        <Routes>
          {routes.map((k) => {
            return k.isProtected ? (
              <Route
                key={k.text}
                path={k.path}
                element={<Suspense fallback="loading...">{k.element}</Suspense>}
              ></Route>
            ) : (
              <Route path={k.path} element={k.element} key={k.text}></Route>
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
