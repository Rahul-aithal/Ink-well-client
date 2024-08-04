import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Home } from './pages/Home.jsx';
import { SignupForm } from './pages/SignUp.jsx';
import { SigninForm } from './pages/SignIn.jsx';
import store  from './store/store.js';
import { Provider } from 'react-redux';
import AuthProvider from './components/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-up",
        element:
          <AuthProvider authentication={false}>
            <SignupForm /></AuthProvider>
      },
      {
        path: "/sign-in",
        element:
          <AuthProvider authentication={false}>
            <SigninForm />
          </AuthProvider>
      },
      // {
      //   path: "/dashboard",
      //   element:
      //     <AuthProvider authentication={true}>
      //       <DashBorad />
      //     </AuthProvider>
      // },
      // {
      //   path: "/about-us",
      //   element:
  
      //       <AboutUs />

      // },
      // {
      //   path: "/contact-us",
      //   element:

      //       <ContactUs />

      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
