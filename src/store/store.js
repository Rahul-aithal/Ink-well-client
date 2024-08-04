import { configureStore } from '@reduxjs/toolkit'
import authSlice, { initializeAuthFromSesionStorgae }  from './AuthSlice'
import themeSlice, { initializeThemeFromSesionStorgae } from './ThemeSlice';


const store = configureStore({
  reducer: {
    auth:authSlice,
    theme:themeSlice
  },
})  

store.dispatch(initializeAuthFromSesionStorgae());
store.dispatch(initializeThemeFromSesionStorgae());

export default store
