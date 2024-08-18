import React, { useEffect, useRef, useState } from "react";
import { Label } from "../components/ui/label";
import { Input, LabelInputContainer } from "../components/ui/input";
import Button from "../components/ui/button";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

function EditStory() {
  // State to store the story content
  const [story, setStory] = useState("");

  // Refs for handling textarea, genre,searching owners input fields
  const textareaRef = useRef();
  const genreRef = useRef();
  const ownerSearcRef = useRef();

  // Extracting data passed through the location state
  const location = useLocation();

  // State to store the title, genre, owners, and checkbox status
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [searchForOwners, setSearchForOwners] = useState("");
  const [owners, setOwners] = useState([]);
  const [newOwners, setNewOwners] = useState([]);
  const [isEditable, setIsEditable] = useState(true);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Automatically adjust the height of the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = ` ${textareaRef.current.scrollHeight}px`;
    }
  }, [story]);

  // Load the story details from the location state if available
  useEffect(() => {
    const story = location.state?.story;
    const title = location.state?.title;
    const newStory = location.state?.newStory;

    if (story) {
      console.log(story);
      setStory(story.story); // Set the story content
      setTitle(story.title); // Set the title
      setGenre(story.genre); // Set the genre
      setOwners(story.owners); // Set the owners
    }

    if (title||newStory) {
      setTitle(title);
      genreRef.current.removeAttribute("disabled"); // Enable the genre input field if title is set
      ownerSearcRef.current.removeAttribute("disabled");
    }
  }, []);

  const handleSearchForOwners = async () => {
    console.log(searchForOwners.trim());
    try {
      const response = await axios.get(
        ` http://localhost:8000/api/get-user-by-username?username=${searchForOwners
          .trim()
          .toLowerCase()}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        const newUsers = response.data.data;
        setNewOwners((prev) => {
          const existingIds = new Set(prev.map((user) => user.id));

          // Filter out new users that are already in the state
          const filteredUsers = newUsers.filter(
            (user) => !existingIds.has(user.id)
          );

          // Add only the new users to the state
          return [...prev, ...filteredUsers];
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to handle the save operation for the story
  const handleSave = async () => {
    try {
      const storyId = location.state?.story?._id; // Retrieve story ID from location state

      if (storyId) {
        const originalTitle = location.state?.story?.title;
        const originalStory = location.state?.story?.story;

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials (cookies, tokens)
        };

        // Update the title only if it has changed
        if (title && title !== originalTitle) {
          const titleResponse = await axios.put(
            `http://localhost:8000/api/update-story-title/${storyId}`,
            { title },
            config
          );
          if (titleResponse.status !== 200) {
            throw new Error("Failed to update title");
          }
        }

        // Update the story content only if it has changed
        if (story && story !== originalStory) {
          const storyResponse = await axios.put(
            ` http://localhost:8000/api/update-story/${storyId}`,
            { newStory: story },
            config
          );
          if (storyResponse.status !== 200) {
            throw new Error("Failed to update story");
          }
        }
        alert("Story updated successfully!");
      } else if (location.state?.newStory) {
        // If no story ID, assume this is a new story being created
        const description = location.state?.description;
        const owners = newOwners.map((owner) => owner.username);
        try {
          const response = await axios.post(
            "http://localhost:8000/api/write-story",
            { title, description, story, genre, isEditable, owners },
            { withCredentials: true }
          );
          if (response.data.success) {
            console.log(response.data.data);
            genreRef.current.setAttribute("disabled", ""); // Disable the genre input field
            ownerSearcRef.current.setAttribute("disabled", ""); // Disable the genre input field
          }
        } catch (error) {
          if (error.response.status === 400) {
            alert("Title,Description,Story,Genre all are required");
            return 
          }
          console.log(error.response);
          
        }
      }

      navigate("/your-stories"); // Navigate to the "your stories" page
    } catch (error) {
      console.log("Error saving story:", error);
      alert("An error occurred while saving the story.");
    }
  };

  // Toggle function for the "Participants can edit" checkbox
  const handleChangeEditable = () => {
    setIsEditable((prevState) => !prevState);
  };

  const handleDeleteParticipents = (userId) => {
    setNewOwners((prev) => {
      const currentlyAddedUser = prev.filter((user) => user._id !== userId);
      return currentlyAddedUser;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-2">
      {/* Left Side: Story Settings */}
      <div className="p-3 col-span-12 lg:col-span-3 bg-transparent shadow flex flex-col items-start gap-4 rounded dark:shadow-gray-400 dark:shadow">
        {/* Participants Section */}
        <section className="p-2 w-full">
          <h2 className="text-xl mb-2">Participants</h2>
          {owners?.length > 0 &&
            owners.map((owner) => (
              <div
                key={owner._id}
                className="flex items-center gap-2 justify-start max-w-28"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-black dark:text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm">{owner.username}</p>
              </div>
            ))}
        </section>

        {/* Story Settings Section */}
        <section className="w-full">
          <h1 className="text-xl mb-4">Story Settings</h1>
          <div className="m-2 mt-5 flex flex-col gap-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Story title"
                value={title}
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                ref={genreRef}
                placeholder="Story genre"
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
                disabled
                type="text"
              />
            </LabelInputContainer>

            {/* Checkbox for allowing participants to edit */}
            <label className="flex items-center cursor-pointer m-3">
              <span className="mr-3 ">Participants can edit</span>
              <div className="relative transition-all ease-in-out">
                <input
                  type="checkbox"
                  checked={isEditable}
                  onChange={handleChangeEditable}
                  className="sr-only"
                />
                <div
                  className={`block w-12 h-6 rounded-full delay-100 ${
                    isEditable ? "bg-gray-800" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute left-1 top-1 delay-100 bg-white w-4 h-4 rounded-full transition-transform transform ${
                      isEditable ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </label>
          </div>
        </section>

        {/* Owner input field (currently not connected to any functionality) */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="owner">Owner</Label>
          <Input
            id="owner"
            ref={ownerSearcRef}
            placeholder="Search owners"
            vlaue={searchForOwners}
            onChange={(e) => {
              setSearchForOwners(e.target.value);
            }}
            type="text"
            disabled
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // Handle the Enter key press
                handleSearchForOwners();
              }
            }}
          />
        </LabelInputContainer>
        <aside className="flex gap-2 flex-wrap">
          {newOwners.length > 0 &&
            newOwners.map((newOwner) => (
              <div
                key={newOwner._id}
                className="bg-transparent border dark:border-zinc-200 border-zinc-900 backdrop:blur p-1 rounded-full px-2 flex items-center justify-evenly gap-3 w-auto text-left"
              >
                {newOwner.username}{" "}
                <button onClick={() => handleDeleteParticipents(newOwner._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 dark:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>{" "}
              </div>
            ))}
        </aside>
      </div>
      {/* Left Side Ends */}

      {/* Middle Section: Story Editor */}
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
            onChange={(e) => {
              setStory(e.target.value);
            }}
            placeholder="Start here..."
            rows={18}
            className="w-full p-4 border-2 border-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600 overflow-auto"
            style={{ overflow: "auto" }}
          ></textarea>
        </section>
      </div>
      {/* Middle Section Ends */}
    </div>
  );
}

export default EditStory;
