// pages/UserStories.js
import { useEffect, useState } from "react";
import { getUserHistory } from "../apis/user";
import StatusDropdown from "../components/StatusDropdown";
import GenreDropdown from "../components/GenreDropdown";
import StoryCard from "../components/StoryCard";

const UserStories = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUserHistory();
        if (response.data.success) {
          setStories(response.data.data.storyHistory);
        }
      } catch (err) {
        setError("Failed to load stories.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStories();
  }, []);

  useEffect(() => {
    let filteredStories = stories;

    if (selectedStatus !== "All") {
      filteredStories = filteredStories.filter((story) =>
        story.status?.toLowerCase().includes(selectedStatus?.toLowerCase())
      );
    }

    if (selectedGenre !== "All") {
      filteredStories = filteredStories.filter(
        (story) => story.genre?.toLowerCase() === selectedGenre?.toLowerCase()
      );
    }

    setStories(filteredStories);
  }, [selectedGenre, selectedStatus, stories]);

  return (
    <div>
      <header className="flex flex-col md:flex-row items-center justify-between px-5 py-2 sticky mb-4 z-10 shadow-sm  dark:text-gray-100">
        <h1 className="text-xl font-medium translate-x-5">My Stories</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-2 md:mt-0">
          <StatusDropdown
            selectedStatus={selectedStatus}
            handleStatusSelection={setSelectedStatus}
          />
          <GenreDropdown
            selectedGenre={selectedGenre}
            handleGenreSelection={setSelectedGenre}
          />
        </div>
      </header>

      <section className="m-3 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading && <p>Loading stories...</p>}
        {error && <p>{error}</p>}
        {stories.length > 0 &&
          stories.map((story) => <StoryCard key={story._id} story={story} />)}
      </section>
    </div>
  );
};

export default UserStories;
