import api from "./apiInstace.js"; // Your axios instance

// Get All Stories
export const getAllStories = (params) => api.get("/get-all-story", { params });

// Get Story by ID
export const getStoryById = (storyId) => api.get(`/get-story-by-id/${storyId}`);

// Update Story Title
export const updateStoryTitle = (storyId, title) =>
  api.put(`/update-story-title/${storyId}`, { title });

export const updateStoryDesc = (storyId, description) =>
  api.put(`/update-story-description/${storyId}`, { description });

// Update Story
export const updateStory = (storyId, newStory) =>
  api.put(`/update-story/${storyId}`, { newStory });

export const updateStroyThumbnail = (storyId, image) =>
  api.put(`/update-thumb/${storyId}`, {image}, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Write Story
export const writeStory = ({
  title,
  description,
  story,
  genre,
  isEditable,
  owners,
  image,
}) =>
  api.post(
    "/write-story",
    {
      title,
      description,
      story,
      genre,
      isEditable,
      owners,
      image:image,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const deleteStory = ({ storyId }) =>
  api.delete(`/delete-story/${storyId}`);
