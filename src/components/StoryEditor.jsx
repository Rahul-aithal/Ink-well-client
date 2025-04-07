import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "./ui/button.jsx";
import Markdown from "react-markdown";
import ViewStoryComponent from "./ViewStory.jsx";

const StoryEditor = ({ story, setStory, handleSave, title }) => {
  const textareaRef = useRef(null);
  const [view, setView] = useState(false);
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
        <section
          id="btn-section"
          className="flex justify-around items-center gap-10 "
        >
          <Button className="max-w-56 w-24" onClick={() => setView(!view)}>
            {view ? "Write" : "View"}
          </Button>
          <Button className="max-w-56 w-24" onClick={handleSave}>
            Save
          </Button>
        </section>
      </header>
      <section>
        {!view ? (
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
          />
        ) : (
          <ViewStoryComponent story={story} title={title} />
        )}
      </section>
    </div>
  );
};

// ✅ PropTypes validation
StoryEditor.propTypes = {
  story: PropTypes.string.isRequired,
  setStory: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default StoryEditor;
