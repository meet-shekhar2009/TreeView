import React, { lazy, Suspense } from 'react';
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
import DraggableDiv from './Components/DraggableDiv';

const Counter = lazy(() => import('./Components/counter'));

function App() {
  const [user] = useLocalStorage<UserType>(IS_AUTH);

  return (
    <BrowserRouter>
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/hierarchy">common</Link>
        </li>
        <li>
          <Link to="/expenses">expenses</Link>
        </li>
        <li>
          <Link to="/noteit">Note</Link>
        </li>
        <li>
          <Link to="/flows">flows</Link>
        </li>
        <li>
          <Link to="/draggablediv">Draggble Div</Link>
        </li>
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
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/counter" element={<ProtectedRoute />}>
            <Route
              path="/counter"
              element={
                <Suspense fallback="loading...">
                  <Counter />
                </Suspense>
              }
            ></Route>
          </Route>

          <Route
            path="/hierarchy"
            element={
              <Suspense fallback="loading...">
                <TreeView />
              </Suspense>
            }
          ></Route>

          <Route path="/user" element={<ProtectedRoute />}>
            <Route path="/user" element={<User />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/custom" element={<Layout />}></Route>
          <Route path="/noteit" element={<NoteIt />}></Route>
          <Route path="/expenses" element={<ExpenseView />}></Route>
          <Route path="/flows" element={<FlowView />}></Route>
          <Route path="/draggablediv" element={<DraggableDiv />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
