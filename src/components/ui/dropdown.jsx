import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ heading, options,isIconRequired=false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnMouseLeave = () => {
    setIsOpen(false);
  };
  const handleOnMouseEnter = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative inline-block text-left " onMouseEnter={handleOnMouseEnter}  onMouseLeave={handleOnMouseLeave}>
      <div>
        <button
          
          // 
          
          className="inline-flex justify-center items-center w-full rounded-md   shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-gray-700 dark:text-gray-50 dark:hover:bg-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-none"
          type="button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {heading}
        {isIconRequired&& <svg
        className="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        >
        <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
        </svg>}
        </button>
     
      {isOpen && (
        <div className="top-7 absolute left-0 right-0  mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 opacity-90"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}>
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options?.length > 0 &&
              options.map((option) => (
                <Link
                key={option.title}
                  to={option.to}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900  dark:hover:text-black  dark:text-gray-200"
                  role="menuitem"
                  
                >
                  {option.title}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Dropdown;
