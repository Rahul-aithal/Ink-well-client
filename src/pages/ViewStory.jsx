import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getStoryById } from "../apis/story";
import ViewStoryComponent from "../components/ViewStory";
function ViewStory() {
  const location = useLocation();
  const storyId = location.state?.storyId; // Get the storyId from the navigation state

  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
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
    <div className="min-h-screen p-6  dark:text-white  text-black">
      {story ? (
        <ViewStoryComponent story={story.story} title={story.title} />
      ) : (
        <p>Loading story...</p>
      )}
    </div>
  );
}

export default ViewStory;
