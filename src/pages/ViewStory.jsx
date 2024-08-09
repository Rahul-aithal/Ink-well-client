import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ViewStory() {
  const location = useLocation();
  const storyId = location.state?.storyId; // Get the storyId from the navigation state

  const [story, setStory] = useState(null);
  const [theme, setTheme] = useState("light"); // Default theme

  useEffect(() => {
    const fetchStory = async () => {
      try {
        console.log(storyId);

        const response = await axios.get(
          `http://localhost:8000/api/get-story-by-id/${storyId}`,
          {
            withCredentials: true,
          }
        );
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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Story Viewer</h1>
      
      </div>

      {story ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
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
