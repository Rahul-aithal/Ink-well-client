import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../store/ThemeSlice";
import Button from "./ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Dropdown from "./ui/dropdown";

// const theme=useSelector(state=>state.theme.theme)

function NavBar({ className }) {
  const theme = useSelector((state) => state.theme.theme);
  const isSignined = useSelector((state) => state.auth.status);
  console.log(isSignined);

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
  // const [active, setActive] = useState(null);

  const navigate= useNavigate()
  return (
    <div className="p-2 sticky top-0 inset-x-0  mx-auto z-50 bg-white dark:bg-black dark:border-b dark:border-gray-300 shadow-md w-full flex justify-between items-center ">
      <Link to={"/"} className="font-medium font-inter text-xl cursor-pointer ">
        Logo
      </Link>
      <ul className="flex gap-0 items-center">
      {isSignined ? <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "font-bold" : "font-medium"
            } cursor-pointer hover:font-bold dark:text-white px-4 py-2`
          }
        >
          Home
        </NavLink> :<NavLink
          to="/home"
          className={({ isActive }) =>
            `${
              isActive ? "font-bold" : "font-medium"
            } cursor-pointer hover:font-bold dark:text-white px-4 py-2`
          }
        >
          Home
        </NavLink>}
        <li>
          {isSignined && (
            <Dropdown heading={"Profile"} options={profileOpitons} />
          )}
        </li>
        <li>
          <Dropdown heading={"Service"} options={serviceOptions} />
        </li>
        <li>
          {theme === "dark" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer"
              onClick={() => {
                dispatch(changeTheme());
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          )}
          {theme === "light" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 cursor-pointer"
              onClick={() => {
                dispatch(changeTheme());
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </li>
      </ul>
      {isSignined ? (
        <Button className={"rounded-xl h-10 max-w-24 "} variant="empty">Log Out</Button>
      ) : (
        <div className="flex ">
          <Button onClick={()=>navigate("/sign-in")} className={"rounded-2xl h-10  min-w-20 w-fit text-xs  my-0 mx-1"}>Sign In</Button>
          <Button onClick={()=>navigate("/sign-up")} className={"rounded-2xl h-10  text-xs  min-w-20 w-fit my-0 mx-1"}>Sign Up</Button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
