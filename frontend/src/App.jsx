import React from 'react'
import Header from './Router/Header.jsx'
import Router from './Router/Router.jsx'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <div className=''>
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
  )
}

export default App
