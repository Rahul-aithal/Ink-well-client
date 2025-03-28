import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: [],
};

export const storySlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    setStories: (state, action) => {
      state.stories = action.payload.stories;
    },
  },
});

export const { setStories } = storySlice.actions;
export default storySlice.reducer;
