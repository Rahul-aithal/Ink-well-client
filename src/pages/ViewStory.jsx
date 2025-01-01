import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getStoryById } from "../apis/story";

function ViewStory() {
  const location = useLocation();
  const storyId = location.state?.storyId; // Get the storyId from the navigation state

  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        console.log(storyId);

        const response = await getStoryById(storyId);
        if (response.data.success) {
          setStory(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch the story:", error);
      }
    };

    if (storyId) {
      fetchStory();
    }
  }, [storyId]);

  return (
    <div
      className="min-h-screen p-6 
        dark:bg-black dark:text-white bg-white text-black"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Story Viewer</h1>
      </div>

      {story ? (
        <div className="bg-gray-300 dark:bg-gray-950 dark:shadow-gray-100 dark:shadow-sm p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{story.title}</h2>
          <p className="text-lg">{story.story}</p>
        </div>
      ) : (
        <p>Loading story...</p>
      )}
    </div>
  );
}

export default ViewStory;
