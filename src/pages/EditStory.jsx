import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getUserByUsername } from "../apis/user.js";
import StorySettings from "../components/StorySettings.jsx";
import ParticipantsList from "../components/ParticipantsList.jsx";
import StoryEditor from "../components/StoryEditor.jsx";
import OwnerSearch from "../components/OwnerSearcch.jsx";
import { writeStory, updateStory, updateStoryTitle } from "../apis/story.js";
import ImageHandler from "../components/ImageHandler.jsx";
import { createToast } from "../lib/utils.js";

function EditStory() {
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [searchForOwners, setSearchForOwners] = useState("");
  const [owners, setOwners] = useState([]);
  const [newOwners, setNewOwners] = useState([]);
  const [isEditable, setIsEditable] = useState(true);
  const [fileData, setFileData] = useState(null);
  const [newStory, setNewStroy] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [storyId, setStroyId] = useState(null);

  useEffect(() => {
    const story = location.state?.story;
    const title = location.state?.title;
    const newStory = location.state?.newStory;
    const storyId = location.state?.story?._id;

    if (story) {
      setStory(story.story);
      setTitle(story.title);
      setGenre(story.genre);
      setOwners(story.owners);
      setImageURL(story.avatar);
      setStroyId(storyId);
      console.log(newStory);

      setNewStroy(newStory ? true : false);
    }

    if (title || newStory) {
      setTitle(title);
    }
  }, [location.state]);

  const handleImageFile = (rawFileData) => {
    console.log(rawFileData);

    setFileData(rawFileData);
  };

  const handleSearchForOwners = async () => {
    try {
      const response = await getUserByUsername(searchForOwners.trim());
      if (response.data.success) {
        const newUsers = response.data.data;
        setNewOwners((prev) => {
          const existingIds = new Set(prev.map((user) => user.id));
          const filteredUsers = newUsers.filter(
            (user) => !existingIds.has(user.id)
          );
          return [...prev, ...filteredUsers];
        });
      }
    } catch (error) {
      console.error("Error searching for owners:", error);
    }
  };

  const handleSave = async () => {
    console.log("Saved");

    try {
      if (storyId) {
        console.log("new Saved");
        const originalTitle = location.state?.story?.title;
        const originalStory = location.state?.story?.story;

        if (title && title !== originalTitle) {
          await updateStoryTitle(storyId, title);
        }

        if (story && story !== originalStory) {
          try {
            const response = await updateStory(storyId, story);
            if (response.status === 200) {
              createToast("Story updated successfully!", "success");
              navigate("/your-stories");
            }
          } catch (error) {
            if (error.response.status === 400) {
              createToast("Story is required", "error");
              return;
            }
            if (error.response.status === 404) {
              createToast("Story is not found", "error");
              return;
            }
            if (error.response.status === 403) {
              createToast("Story is not editable", "error");
              return;
            }
            if (error.response.status === 401) {
              createToast(
                "You are not authorized to perform this action",
                "error"
              );
              return;
            }

            createToast("An error occurred while saving the story.", "error");
          }
        }
      } else if (location.state?.newStory) {
        // console.log("Old Saved", location.state?.newStory);
        const description = location.state?.description;
        const owners = newOwners.map((owner) => owner.username);
        try {
          const response = await writeStory({
            title,
            description,
            story,
            genre,
            isEditable,
            owners,
            image: fileData,
          });
          if (response.data.success) {
            createToast("Story saved successfully!", "success");
          }

          navigate("/your-stories");
        } catch (error) {
          if (error.response.status === 400) {
            createToast(
              "Title, Description, Story, Genre are all required",
              "error"
            );
            return;
          }
          if (error.response.status === 409) {
            createToast("Story already exists", "error");
            return;
          }
          if (error.response.status === 401) {
            createToast(
              "You are not authorized to perform this action",
              "error"
            );
            return;
          }
          createToast("An error occurred while saving the story.", "error");
          console.log(error);
        }
      }
    } catch (error) {
      createToast("An error occurred while saving the story.", "error");
    }
  };

  const handleChangeEditable = () => {
    setIsEditable((prevState) => !prevState);
  };

  const handleDeleteParticipants = (userId) => {
    setNewOwners((prev) => prev.filter((user) => user._id !== userId));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-2">
      <div className="p-3 col-span-12 lg:col-span-3 bg-transparent shadow flex flex-col items-start gap-4 rounded dark:shadow-gray-400 dark:shadow">
        <ImageHandler
          storyId={storyId}
          setImageFile={handleImageFile}
          imageURL={imageURL}
          newStory={newStory}
        />
        <ParticipantsList owners={owners} />
        <StorySettings
          title={title}
          setTitle={setTitle}
          genre={genre}
          setGenre={setGenre}
          isEditable={isEditable}
          handleChangeEditable={handleChangeEditable}
        />
        <OwnerSearch
          searchForOwners={searchForOwners}
          setSearchForOwners={setSearchForOwners}
          handleSearchForOwners={handleSearchForOwners}
        />
        <div className="flex gap-2 flex-wrap">
          {newOwners.map((newOwner) => (
            <div
              key={newOwner._id}
              className="bg-transparent border dark:border-zinc-200 border-zinc-900 backdrop:blur p-1 rounded-full px-2 flex items-center justify-evenly gap-3 w-auto text-left"
            >
              {newOwner.username}
              <button onClick={() => handleDeleteParticipants(newOwner._id)}>
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
              </button>
            </div>
          ))}
        </div>
      </div>
      <StoryEditor story={story} setStory={setStory} handleSave={handleSave} title = {title} />
    </div>
  );
}

export default EditStory;
