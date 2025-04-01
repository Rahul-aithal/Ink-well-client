import { configureStore } from "@reduxjs/toolkit";
import authSlice, { initializeAuthFromSesionStorgae } from "./AuthSlice";
import themeSlice, { initializeThemeFromSesionStorgae } from "./ThemeSlice";
import storySlice from "./storySlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    story: storySlice,
  },
});

store.dispatch(initializeAuthFromSesionStorgae());
store.dispatch(initializeThemeFromSesionStorgae());

export default store;
