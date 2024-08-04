import { Link } from "react-router-dom";

function Button({ children, className,to="#" }) {
  return (
    <Link to={to}
      className={`bg-gray-900 text-white dark:bg-white dark:text-black my-2 py-3 block text-center font-inter cursor-pointer  hover:scale-100
        ${className}`}
    >
      {children}
    </Link>
  );
}

export default Button;
