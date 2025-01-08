import api from './apiInstace.js'; // Your axios instance

// Get All Stories
export const getAllStories = (params) => 
  api.get('/get-all-story', { params});

// Get Story by ID
export const getStoryById = (storyId) => 
  api.get(`/get-story-by-id/${storyId}`,);

// Update Story Title
export const updateStoryTitle = (storyId, title) => 
  api.put(`/update-story-title/${storyId}`, { title });

// Update Story
export const updateStory = (storyId, newStory) => 
  api.put(`/update-story/${storyId}`, { newStory });

// Write Story
export const writeStory = ({ title, description, story, genre, isEditable, owners }) => 
  api.post('/write-story', { title, description, story, genre, isEditable, owners });
    
export const deleteStory = ({storyId})=> api.delete(`/delete-story/${storyId}`);