import React, { useEffect } from 'react';
import Header from './Router/Header.jsx';
import Router from './Router/Router.jsx';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/Slices/AuthSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token && name && email) {
      dispatch(setUser({
        token,
        user: {
          name,
          email,
        },
      }));

      // Remove ?token= from URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  return (
    <div>
      <Header />
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default App;
