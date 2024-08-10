import React, { useEffect, useRef, useState } from "react";
import { Label } from "../components/ui/label";
import { Input, LabelInputContainer } from "../components/ui/input";
import Button from "../components/ui/button";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

function EditStory() {
  // State to manage the story content
  const [storyContent, setStoryContent] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [storyGenre, setStoryGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [participants, setParticipants] = useState([]);
  const [newParticipants, setNewParticipants] = useState([]);
  const [isEditable, setIsEditable] = useState(true);

  // Refs for managing DOM elements
  const textareaRef = useRef();
  const genreInputRef = useRef();
  const ownerSearchRef = useRef();

  // Extract location and navigation hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [storyContent]);

  // Load story details from the location state if available
  useEffect(() => {
    const storyData = location.state?.story;
    const storyTitleFromLocation = location.state?.title;

    if (storyData) {
      setStoryContent(storyData.story);
      setStoryTitle(storyData.title);
      setStoryGenre(storyData.genre);
      setParticipants(storyData.owners);
    }

    if (storyTitleFromLocation) {
      setStoryTitle(storyTitleFromLocation);
      genreInputRef.current.removeAttribute("disabled");
      ownerSearchRef.current.removeAttribute("disabled");
    }
  }, [location.state]);

  // Function to search for users by username
  const handleSearchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/get-user-by-username?username=${searchQuery
          .trim()
          .toLowerCase()}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        const newUsers = response.data.data;
        setNewParticipants((prev) => {
          const existingUserIds = new Set(prev.map((user) => user.id));
          const filteredUsers = newUsers.filter(
            (user) => !existingUserIds.has(user.id)
          );
          return [...prev, ...filteredUsers];
        });
      }
    } catch (error) {
      console.error("Error searching for users:", error.message);
    }
  };

  // Function to save or update the story
  const handleSaveStory = async () => {
    try {
      const storyId = location.state?.story?._id;

      if (storyId) {
        const originalTitle = location.state?.story?.title;
        const originalContent = location.state?.story?.story;

        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };

        // Update the title if it has changed
        if (storyTitle && storyTitle !== originalTitle) {
          const titleResponse = await axios.put(
            `http://localhost:8000/api/update-story-title/${storyId}`,
            { title: storyTitle },
            config
          );
          if (titleResponse.status !== 200) {
            throw new Error("Failed to update title");
          }
        }

        // Update the story content if it has changed
        if (storyContent && storyContent !== originalContent) {
          const contentResponse = await axios.put(
            `http://localhost:8000/api/update-story/${storyId}`,
            { newStory: storyContent },
            config
          );
          if (contentResponse.status !== 200) {
            throw new Error("Failed to update story content");
          }
        }
        alert("Story updated successfully!");
      } else {
        // Create a new story if no story ID is present
        const description = location.state?.description;
        const participantUsernames = newParticipants.map(
          (participant) => participant.username
        );
        const response = await axios.post(
          "http://localhost:8000/api/write-story",
          {
            title: storyTitle,
            description,
            story: storyContent,
            genre: storyGenre,
            isEditable,
            owners: participantUsernames,
          },
          { withCredentials: true }
        );
        if (response.data.success) {
          genreInputRef.current.setAttribute("disabled", "");
          ownerSearchRef.current.setAttribute("disabled", "");
        }
      }

      navigate("/your-stories"); // Redirect to the "your stories" page
    } catch (error) {
      console.error("Error saving story:", error);
      alert("An error occurred while saving the story.");
    }
  };

  // Toggle the "Participants can edit" checkbox
  const handleToggleEditable = () => {
    setIsEditable((prev) => !prev);
  };

  // Function to remove a participant
  const handleRemoveParticipant = (userId) => {
    setNewParticipants((prev) => prev.filter((user) => user._id !== userId));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-2">
      {/* Left Side: Story Settings */}
      <div className="p-3 col-span-12 lg:col-span-3 bg-transparent shadow flex flex-col items-start gap-4 rounded dark:shadow-gray-400 dark:shadow">
        {/* Participants Section */}
        <section className="p-2 w-full">
          <h2 className="text-xl mb-2">Participants</h2>
          {participants.length > 0 &&
            participants.map((participant) => (
              <div
                key={participant._id}
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
                <p className="text-sm">{participant.username}</p>
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
                value={storyTitle}
                type="text"
                onChange={(e) => setStoryTitle(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                ref={genreInputRef}
                placeholder="Story genre"
                value={storyGenre}
                onChange={(e) => setStoryGenre(e.target.value)}
                disabled
                type="text"
              />
            </LabelInputContainer>

            {/* Checkbox for allowing participants to edit */}
            <label className="flex items-center cursor-pointer m-3">
              <span className="mr-3">Participants can edit</span>
              <div className="relative transition-all ease-in-out">
                <input
                  type="checkbox"
                  checked={isEditable}
                  onChange={handleToggleEditable}
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

        {/* Owner input field */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="owner">Owner</Label>
          <Input
            id="owner"
            ref={ownerSearchRef}
            placeholder="Search owners"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            disabled
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchUsers();
              }
            }}
          />
        </LabelInputContainer>

        {/* Add new participants */}
        {newParticipants.length > 0 && (
          <section className="w-full mt-4">
            <h2 className="text-xl mb-2">New Participants</h2>
            <div className="flex flex-col gap-2">
              {newParticipants.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 justify-between"
                >
                  <p className="text-sm">{user.username}</p>
                  <button
                    onClick={() => handleRemoveParticipant(user.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Save and Cancel buttons */}
        <div className="mt-5 flex gap-2">
          <Button
            onClick={handleSaveStory}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save
          </Button>
          <Button
            onClick={() => navigate("/your-stories")}
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >
            Cancel
          </Button>
        </div>
      </div>

      {/* Right Side: Story Content */}
      <div className="col-span-12 lg:col-span-9 p-2">
        <textarea
          ref={textareaRef}
          value={storyContent}
          onChange={(e) => setStoryContent(e.target.value)}
          placeholder="Write your story here..."
          rows={1}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>
    </div>
  );
}

export default EditStory;
