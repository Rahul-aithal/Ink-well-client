import React from "react";
import Markdown from "react-markdown";

function ViewStoryComponent({ title, story }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div className="bg-gray-300 dark:bg-gray-950 dark:shadow-gray-100 dark:shadow-sm p-6 rounded-lg shadow-lg">
        <Markdown
          components={{
            p: ({ node, ...props }) => (
              <p style={{ whiteSpace: "pre-wrap", marginBottom: "1em" }} {...props} />
            ),
          }}
        >
          {story}
        </Markdown>
      </div>
    </div>
  );
}

export default ViewStoryComponent;
