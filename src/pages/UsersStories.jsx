import React, { useEffect, useState } from "react";
import axios from "axios";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Button from "../components/ui/button";
import { useNavigate } from "react-router";

const genreOptions = [
  { genre: "All" },
  { genre: "Fantasy" },
  { genre: "Mystery" },
  { genre: "Romance" },
  { genre: "Science Fiction" },
  { genre: "Adventure" },
];

const statusOptions = [
  { status: "All" },
  { status: "Draft" },
  { status: "Published" },
  { status: "Editing" },
  { status: "Collaborative" },
];

function UserStories() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handles the selection of a genre from the dropdown menu
  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
  };

  // Handles the selection of a status from the dropdown menu
  const handleStatusSelection = (status) => {
    setSelectedStatus(status);
  };

  // Fetches the user's stories on component mount
  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "http://localhost:8000/api/get-user-history",
          { withCredentials: true }
        );

        if (response.data.success) {
          setStories(response.data.data.storyHistory);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load stories.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStories();
  }, []);

  // Filters stories based on selected genre and status
  useEffect(() => {
    let filteredStories = stories;

    if (selectedStatus !== "All") {
      filteredStories = filteredStories.filter((story) =>
        story.status.toLowerCase().includes(selectedStatus.toLowerCase())
      );
    }

    if (selectedGenre !== "All") {
      filteredStories = filteredStories.filter(
        (story) => story.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    setStories(filteredStories);
  }, [selectedGenre, selectedStatus, stories]);

  return (
    <div>
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center justify-between px-5 py-2 sticky mb-4 z-10 shadow-sm dark:bg-gray-950 dark:text-gray-100">
        <h1 className="text-xl font-medium">My Stories</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-2 md:mt-0">
          {/* Status Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div className="flex items-center gap-2">
              <h2 className="hidden md:block">Status</h2>
              <MenuButton className="inline-flex items-center gap-x-1.5 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                {selectedStatus ? selectedStatus : "All"}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
            >
              <div className="py-1 w-full">
                {statusOptions.map((option) => (
                  <MenuItem key={option.status}>
                    <button
                      type="button"
                      onClick={() => handleStatusSelection(option.status)}
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {option.status}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>

          {/* Genre Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div className="flex items-center gap-2">
              <h2 className="hidden md:block">Genre</h2>
              <MenuButton className="inline-flex items-center gap-x-1.5 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                {selectedGenre ? selectedGenre : "All"}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
            >
              <div className="py-1 w-full">
                {genreOptions.map((option) => (
                  <MenuItem key={option.genre}>
                    <button
                      type="button"
                      onClick={() => handleGenreSelection(option.genre)}
                      className="w-full block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {option.genre}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>

      {/* Stories Section */}
      <section className="m-3 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading && <p>Loading stories...</p>}
        {error && <p>{error}</p>}
        {stories.length > 0 &&
          stories.map((story, index) => (
            <div
              key={index}
              className="border dark:border-gray-700 p-4 rounded-md shadow-md flex flex-col gap-4 bg-white dark:bg-slate-950"
            >
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {story.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {story.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {/* View Button */}
                <Button
                  variant="empty"
                  className="rounded-lg px-2 h-10 text-sm w-16 md:w-28"
                  onClick={() =>
                    navigate("/view-story", { state: { storyId: story._id } })
                  }
                >
                  View
                </Button>

                {/* Edit Button */}
                <Button
                  variant="black"
                  className="rounded-lg px-2 h-10 text-sm w-16 md:w-28"
                  onClick={() =>
                    navigate("/edit-stories", { state: { story } })
                  }
                >
                  Edit
                </Button>

                {/* Delete Button */}
                <Button
                  variant="red"
                  className="rounded-lg px-2 h-10 text-sm w-16 md:w-28"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default UserStories;
