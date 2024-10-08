import React, { useEffect, useState } from "react";
import { Input, LabelInputContainer } from "../components/ui/input";
import { BottomGradient } from "../components/ui/button";
import { useNavigate } from "react-router";
import axios from "axios";

function Story() {
  // State for managing input values
  const [searchValue, setSearchValue] = useState(""); // Search input value
  const [errorValue, setErrorValue] = useState("");
  const [lodaing, setLoading] = useState("");
  const [searchedStories, setSearchedStories] = useState([]);
  const [title, setTitle] = useState(""); // Story title input value
  const [description, setDescription] = useState(""); // Story description input value

  const navigate = useNavigate(); // Hook for navigation

  // Fetch stories on seraching in searchBox
  useEffect(() => {
    const fetchStories = async (
      search,
      limit = 10,
      sortBy = "title",
      sortType = "asc",
      username = ""
    ) => {
      try {
        setLoading(true);
        const params = { search, limit, sortBy, sortType };
        if (username) {
          params[username] = username;
        }
        search.length === 0 ? (params.search = "all") : "";

        const response = await axios.get(
          "http://localhost:8000/api/get-all-story",
          {
            params, // Data sent as query parameters
            withCredentials: true,
          }
        );

        if (response.data.success) {
          console.log(response.data.data.stories);

          setSearchedStories(response.data.data.stories);
        }
      } catch (error) {
        console.error(error.response);
        setErrorValue(`Something went wrong in searching`);
      } finally {
        setLoading(false);
      }
    };

    fetchStories(searchValue);
  }, [searchValue]);
  useEffect(() => {}, [searchedStories]);

  //Fetch stories form api.

  // Handle form submission to create a new story
  const handleCreateStory = () => {
    if (!title || !description)
      return alert("title and description is required");
    navigate("/edit-stories", {
      state: { title, description, newStory: true },
    }); // Navigate to edit-stories with title and description
  };

  // Handle the action to join an existing story (currently empty)
  const handleJoinStory = (story) => {
    console.log(story);

    navigate("/edit-stories", { state: { story: story } });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5">
      {/* Left Side Starts */}
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl mb-4">Create or Join a Story</h1>
        <form
          className="p-3 shadow-xl dark:shadow bg-zinc-300 dark:bg-zinc-900 rounded"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleCreateStory(); // Handle story creation
          }}
        >
          <h2 className="text-xl mb-5">Start a New Story</h2>

          {/* Story Title Input */}
          <LabelInputContainer className="mb-4">
            <Input
              id="story-title"
              placeholder="Story title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state
            />
          </LabelInputContainer>

          {/* Story Description Input */}
          <LabelInputContainer className="mb-4">
            <Input
              id="story-description"
              placeholder="Story Description"
              type="text"
              className="h-56 border-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update description state
            />
          </LabelInputContainer>

          {/* Create Story Button */}
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-center"
            type="submit"
          >
            Create Story &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
      {/* Left Side Ends */}

      {/* Right Side Starts */}
      <div className="flex flex-col">
        <form className="p-3 shadow-xl dark:shadow bg-zinc-300 dark:bg-zinc-900 rounded">
          <h2 className="text-xl mb-5">Join an Existing Story</h2>

          {/* Search Input for Existing Stories */}
          <LabelInputContainer className="mb-4">
            <Input
              id="search-story"
              placeholder="Search Story"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)} // Update search value state
            />
          </LabelInputContainer>

          {/* Available Stories List */}
          <h1 className="text-xl mb-3">Available Stories:</h1>
          <div className="max-h-[25rem] overflow-y-scroll">
            {lodaing && <div className="text-xl ">Loding...</div>}
            {errorValue && <div>{errorValue}</div>}
            {!lodaing &&
              !errorValue &&
              searchedStories.length > 0 &&
              searchedStories.map((story) => (
                <div
                  key={story._id}
                  className="dark:bg-zinc-800 bg-zinc-300 p-3 rounded-xl mt-3"
                >
                  <div className="m-2 mb-5">
                    <h1 className="text-xl">{story.title}</h1>
                    <p className="text-gray-500 text-sm">{story.description}</p>
                    <p className="text-gray-500 text-sm">
                      Genre:{" "}
                      <span className="text-md font-bold ">{story.genre}</span>
                    </p>
                  </div>
                  <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-center"
                    type="button"
                    onClick={() => handleJoinStory(story)} // Handle join story
                  >
                    Join Story &rarr;
                    <BottomGradient />
                  </button>
                </div>
              ))}
          </div>
        </form>
      </div>
      {/* Right Side Ends */}
    </div>
  );
}

export default Story;
