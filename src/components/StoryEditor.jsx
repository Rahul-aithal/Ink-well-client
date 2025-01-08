import React, { useEffect, useRef } from 'react';
import Button from './ui/button.jsx';



const StoryEditor = ({ story, setStory, handleSave }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [story]);

  return (
    <div className="col-span-12 lg:col-span-8">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl">Story Editor</h1>
        <Button className="max-w-24" onClick={handleSave}>
          Save
        </Button>
      </header>
      <section>
        <textarea
          ref={textareaRef}
          name="story"
          id="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Start here..."
          rows={18}
          className="w-full p-4 border-2 border-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600 overflow-auto"
          style={{ overflow: "auto" }}
        ></textarea>
      </section>
    </div>
  );
};

export default StoryEditor;

