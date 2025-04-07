// components/StoryCard.js
import { useState } from "react";
import Button from "./ui/button";
import { useNavigate } from "react-router";
import { deleteStory, updateStoryTitle, updateStoryDesc } from "../apis/story";
import { Input } from "./ui/input";
import { TextArea } from "./ui/textArea";
import { createToast } from "../lib/utils";

const StoryCard = ({ story }) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [storyTitle, setStoryTitle] = useState(story.title);
  const [editingDesc, setEditingDesc] = useState(false);
  const [storyDesc, setStoryDesc] = useState(story.description);
  const [storyImag, setStoryImag] = useState(story.avatar);
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#010309] border dark:border-[#303337] p-5 rounded-lg shadow-md flex flex-col gap-4   items-start m-1 mx-1/3 md:m-2 md:mx-3 transition-transform ease-linear transform hover:scale-105">
      <img
        src={storyImag}
        alt={storyTitle}
        className="w-full h-48 object-cover rounded-xl"
      />
      {!editingTitle ? (
        <h1
          onDoubleClick={(e) => {
            e.preventDefault();
            setEditingTitle(true);
          }}
          className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-gray-100"
        >
          {storyTitle}
        </h1>
      ) : (
        <Input
          type="text"
          value={storyTitle}
          onChange={(e) => setStoryTitle(e.target.value)}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              try {
                setEditingTitle(false);
                await updateStoryTitle(story._id, storyTitle);
              } catch (error) {
                if (error.response.status === 404) {
                  createToast("Story not found", "error");
                }
                if (error.response.status === 403) {
                  createToast("Story is not editable", "warning");
                }
                if (error.response.status === 402) {
                  createToast("You are not allowed to update this", "warning");
                }
              }
            }
          }}
        />
      )}
      {!editingDesc ? (
        <p
          onDoubleClick={(e) => {
            e.preventDefault();
            setEditingDesc(true);
          }}
          className=" dark:text-gray-400 text-xs font-light text-gray-700  mt-1"
        >
          {story.description}
        </p>
      ) : (
        <TextArea
          type="text"
          value={storyDesc}
          onChange={(e) => setStoryDesc(e.target.value)}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              setEditingDesc(false);
              try {
                await updateStoryDesc(story._id, storyDesc);
              } catch (error) {
                if (error.response.status === 404) {
                  createToast("Story not found", "error");
                }
                if (error.response.status === 403) {
                  createToast("Story is not editable", "warning");
                }
                if (error.response.status === 402) {
                  createToast("You are not allowed to update this", "warning");
                }
              }
            }
          }}
        />
      )}
      <div className="flex flex-wrap gap-4">
        <Button
          variant="empty"
          className="rounded-lg px-2 h-10 text-sm w-16 md:w-28"
          onClick={() =>
            navigate("/view-story", { state: { storyId: story._id } })
          }
        >
          View
        </Button>
        <Button
          variant="black"
          className="rounded-lg px-2 h-10 text-sm w-16 md:w-28"
          onClick={() => navigate("/edit-stories", { state: { story } })}
        >
          Edit
        </Button>
        <Button
          variant="red"
          className="rounded-lg px-2 h-10 text-sm w-16 md:w-28"
          onClick={async () => {
            try {
              const response = await deleteStory({ storyId: story._id });
              if (response.status === 200) window.location.reload();
            } catch (error) {
              if (error.response.status === 404) {
                createToast("Story not found", "error");
              }
              if (error.response.status === 402) {
                createToast("You are not allowed to update this", "warning");
              }

              console.error("Failed to delete story", error);
            }
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default StoryCard;
