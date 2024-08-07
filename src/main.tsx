import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import App from './App.tsx'
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Home from './pages/Home.tsx';

import Job from './pages/dashboard/Job.tsx';
import Perfil from './pages/dashboard/Perfil.tsx';
import Customer from './pages/dashboard/Customer.tsx';
import Provider from './pages/dashboard/Provider.tsx';
import Transation from './pages/dashboard/Transation.tsx';

import DashboardLayout from './layout/DashboardLayout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ]
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <Perfil /> },
      { path: "job", element: <Job /> },
      { path: "customer", element: <Customer /> },
      { path: "provider", element: <Provider /> },
      { path: "transation", element: <Transation /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
