import { Link } from "react-router-dom";

function Button({ children, className,to="#" }) {
  return (
    <Link to={to}
      className={`bg-gray-900 text-white dark:bg-white dark:text-black p-1 px-2 me-3 text-center font-inter cursor-pointer  hover:scale-100
        ${className}`}
    >
      {children}
    </Link>
  );
}

export default Button;
