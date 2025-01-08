import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils"; 
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const TextArea = React.forwardRef((props, ref) => {
  const { className, rows, ...restProps } = props; 
  const radius = 100; 
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const textAreaRef = useRef(null);

  
  const handleInput = () => {
    const textArea = textAreaRef.current;
    textArea.style.height = "auto"; 
    textArea.style.height = `${textArea.scrollHeight}px`; 
  };

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    if (textAreaRef.current) {
      handleInput(); 
    }
  }, []);

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? `${radius}px` : "0px"} circle at ${mouseX}px ${mouseY}px,
            var(--blue-500),
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <textarea
        rows={rows || 3} 
        ref={(node) => {
          textAreaRef.current = node;
          if (ref) ref(node);
        }}
        onInput={handleInput}
        className={cn(
          `flex w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder-text-neutral-600
           focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400 resize-none`,
          className
        )}
        {...restProps}
        
      />
    </motion.div>
  );
});
TextArea.displayName = "TextArea";

export { TextArea };

export const LabelTextAreaContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
