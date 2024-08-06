


function Button({ children, className, to = "#", variant = "black",onClick }) {

  const variants = {
    empty: "inset-0 border bg-transparent text-gray-800 dark:text-gray-400 font-semibold border-4 rounded-xl border-zinc-600 w-full min-h-5 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]  relative group/btn",
    red: "bg-gradient-to-br from-red-500 to-rose-600 text-white dark:bg-red-500 dark:text-black dark:hover:bg-rose-800 w-full h-10 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]  relative group/btn  ",
    black: "bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",

  };

  return (
    < button
onClick={onClick}
      className={`${variants[variant]}  dark:font-semibold my-2 py-3 text-center font-inter cursor-pointer hover:scale-100 relative group/btn flex items-center justify-center ${className}`}
    >
      {children}
      <BottomGradient/>
    </button>
  );
}

export default Button;

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};