import api from "./apiInstace.js";// Your axios instance

// Sign Out
export const signOut = () => api.post('/sign-out');

// Sign In
export const signIn = (formData) => 
  api.post('/sign-in', formData, {
    headers: { 'Content-Type': 'application/json' },
  });

// Sign Up
export const signUp = (formData) => 
  api.post('/sign-up', formData, {
    headers: { 'Content-Type': 'application/json' },
  });
