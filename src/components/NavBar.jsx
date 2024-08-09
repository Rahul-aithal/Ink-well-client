import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../store/ThemeSlice";
import Button from "./ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Dropdown from "./ui/dropdown";

import { logout } from "../store/AuthSlice";
import axios from "axios";

function NavBar({ className }) {
  const theme = useSelector((state) => state.theme.theme);
  const isSignined = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();

  const serviceOptions = [
    {
      to: "/about-us",
      title: "About Us",
    },
    {
      to: "/contact-us",
      title: "Contact-us",
    },
    {
      to: "/new-upadates",
      title: "New Updates",
    },
  ];

  const profileOpitons = [
    {
      to: "/your-stories",
      title: "Your stories",
    },
    {
      to: "/your-profile",
      title: "Settings",
    },
  ];

  const navigate = useNavigate();


  const handleLogut = async () => {

  
    const res = await axios.post(
      "http://localhost:8000/api/sign-out",
      {},
      { withCredentials: true }
    );
  
    if (res.data.success && res.status === 200) {
      navigate("/sign-in");
      dispatch(logout());
  
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } else {
      console.error(res);
    }
  };

  const handleIconClick = () => {
    if (iconRef.current) {
      iconRef.current.getAttribute("d") ===
      "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        ? (iconRef.current.setAttribute("d", "M6 18 18 6M6 6l12 12"),
          ulRef.current.classList.add("top-[80px]"),
          ulRef.current.classList.add("opacity-100"))
        : (iconRef.current.setAttribute(
            "d",
            "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          ),
          ulRef.current.classList.remove("top-[80px]"),
          ulRef.current.classList.remove("opacity-100"));
    }
  };



  const iconRef = useRef();
  const ulRef = useRef();

  return (
    
      <div className="w-screen p-3 sticky top-0 inset-x-0 mx-auto z-50 bg-white dark:bg-black dark:border-b dark:border-gray-700 shadow-md md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <Link
            to={"/"}
            className=" font-inter text-xl font-bold cursor-pointer dark:text-white"
          >
            InkWell
          </Link>
          <span onClick={handleIconClick} className="md:hidden cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 dark:text-white"
            >
              <path
                ref={iconRef}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
        </div>
    
        <ul
          ref={ulRef}
          className="md:flex md:items-center md:static absolute z-[-1] md:z-auto bg-gray-100 dark:bg-gray-950 md:bg-transparent left-0 w-full md:w-auto md:py-0 py-4 pl-0 md:pl-7 opacity-0 md:opacity-100 top-[-400px] transition-all ease-in-out duration-500"
        >
          <li className="my-4 text-left ms-5 md:my-auto">
            <NavLink
              to={isSignined ? "/dashboard" : "/home"}
              className={({ isActive }) =>
                `${
                  isActive ? "font-bold" : "font-medium"
                } cursor-pointer hover:font-bold dark:text-white px-2 py-1 md:px-4 md:py-2`
              }
            >
              Home
            </NavLink>
          </li>
          {isSignined && (
            <>
              <li className="my-4 text-left ms-5 md:my-auto">
                <NavLink
                  to="/create-join-story"
                  className={({ isActive }) =>
                    `${
                      isActive ? "font-bold" : "font-medium"
                    } cursor-pointer hover:font-bold dark:text-white py-1 md:px-4 md:py-2`
                  }
                >
                  Start new
                </NavLink>
              </li>
              <li className="my-4 text-left ms-5 md:my-auto">
                <Dropdown heading={"Profile"} options={profileOpitons} />
              </li>
            </>
          )}
          <li className="my-4 text-left ms-5 md:my-auto">
            <Dropdown heading={"Service"} options={serviceOptions} />
          </li>
          <li className="my-4 text-left ms-5 md:my-auto">
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer dark:text-white"
                onClick={() => dispatch(changeTheme())}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer dark:text-white"
                onClick={() => dispatch(changeTheme())}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </li>
          {isSignined && (
            <li className="my-4 text-left ms-5 md:my-auto">
              <Button onClick={handleLogut} className="rounded-xl h-10 max-w-24 p-2">Log Out</Button>
            </li>
          )}
        </ul>
    
        {!isSignined && (
          <div className="flex">
            <Button
              onClick={() => navigate("/sign-in")}
              className={"rounded-2xl h-10 min-w-20 w-fit text-xs my-0 mx-1"}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/sign-up")}
              className={"rounded-2xl h-10 text-xs min-w-20 w-fit my-0 mx-1"}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>

    
  );
}

export default NavBar;
