import api from "./apiInstace.js"; // Your axios instance

// Get User
export const getUser = () => api.get("/get-user");

// Get User by Username
export const getUserByUsername = (username) =>
  api.get("/get-user-by-username", {
    params: { username: username.trim().toLowerCase() },
  });

// Update Username
export const updateUsername = (username) =>
  api.put("/update-username", { username });

// Update Password
export const updatePassword = (oldpassword, newPassword) =>
  api.put("/update-password", { oldpassword, newPassword });

// Update Email
export const updateEmail = (email) => api.put("/update-email", { email });

// Get User History
export const getUserHistory = () => api.get("/get-user-history");

export const getNotifications = () => api.get("/get-notification");
export const deleteNotifications = (notificationId) =>
  api.delete(`/delete-notification/${notificationId}`);
