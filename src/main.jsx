import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Home } from "./pages/Home.jsx";
import { SignupForm } from "./pages/SignUp.jsx";
import { SigninForm } from "./pages/SignIn.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import AuthProvider from "./components/AuthProvider.jsx";
import DashBorad from "./pages/DashBorad.jsx";
import Story from "./pages/Story.jsx";
import UsersStories from "./pages/UsersStories.jsx";
import EditStory from "./pages/EditStory.jsx";
import UserSettings from "./pages/UserSettings.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import NewsUpdates from "./pages/NewsUpates.jsx";
import ViewStory from "./pages/ViewStory.jsx";

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
        path: "/dashboard",

        element: <DashBorad />,
      },
      {
        path: "/sign-up",
        element: (
          <AuthProvider authentication={false}>
            <SignupForm />
          </AuthProvider>
        ),
      },
      {
        path: "/sign-in",
        element: (
          <AuthProvider authentication={false}>
            <SigninForm />
          </AuthProvider>
        ),
      },

      {
        path: "/create-join-story",
        element: (
          <AuthProvider authentication={true}>
            <Story />
          </AuthProvider>
        ),
      },
      {
        path: "/view-story",
        element: (
          <AuthProvider authentication={true}>
            <ViewStory />
          </AuthProvider>
        ),
      },
      {
        path: "/your-stories",
        element: (
          <AuthProvider authentication={true}>
            <UsersStories />
          </AuthProvider>
        ),
      },
      {
        path: "/edit-stories",
        element: (
          <AuthProvider authentication={true}>
            <EditStory />
          </AuthProvider>
        ),
      },
      {
        path: "/your-profile",
        element: (
          <AuthProvider authentication={true}>
            <UserSettings />
          </AuthProvider>
        ),
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/new-upadates",
        element: <NewsUpdates />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
