import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';

function ViewStoryComponent({ title, story }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div className="bg-gray-600 dark:bg-gray-950  p-6 rounded-lg shadow-lg prose prose-invert max-w-50dvw">
        <Markdown
          remarkPlugins={[remarkGfm]}
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
