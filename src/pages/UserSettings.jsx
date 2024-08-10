import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../store/ThemeSlice";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

function UserSettings() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const inputRefName = useRef(null);
  const inputRefEmail = useRef(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    setIsChecked(theme === "dark");

    // Fetch current user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/get-user", {
          withCredentials: true,
        });
        if (response.data.success) {
          setUser(response.data.data);
          setUsername(response.data.data.username);
          setEmail(response.data.data.email);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [theme]);

  const handleUpdateUsername = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/update-username",
        { username: inputRefName.current.value },
        { withCredentials: true }
      );
      if (response.data.succes) {
        alert("Username updated successfully!");
        inputRefName.current.setAttribute("disabled", true);
      }
    } catch (error) {
      console.error("Failed to update username:", error);
      alert("Error updating username");
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/update-email",
        { email: inputRefEmail.current.value },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("Email updated successfully!");
        inputRefEmail.current.setAttribute("disabled", true);
      }
    } catch (error) {
      console.error("Failed to update email:", error);
      alert("Error updating email");
    }
  };

  const handleChangeName = (e) => {
    if (
      e.target.innerText === "Save" &&
      !inputRefName.current.hasAttribute("disabled")
    ) {
      handleUpdateUsername();
      e.target.innerText = "Change";
      return;
    }

    if (
      e.target.innerText === "Change" &&
      inputRefName.current.hasAttribute("disabled")
    ) {
      inputRefName.current.removeAttribute("disabled");
      e.target.innerText = "Save";
      inputRefName.current.focus();
    } else {
      console.error("Unexpected button state");
      throw new Error("Something went wrong");
    }
  };

  const handleChangeEmail = (e) => {
    if (
      e.target.innerText === "Save" &&
      !inputRefEmail.current.hasAttribute("disabled")
    ) {
      handleUpdateEmail();
      e.target.innerText = "Change";
      return;
    }

    if (
      e.target.innerText === "Change" &&
      inputRefEmail.current.hasAttribute("disabled")
    ) {
      inputRefEmail.current.removeAttribute("disabled");
      e.target.innerText = "Save";
      inputRefEmail.current.focus();
    } else {
      console.error("Unexpected button state");
      throw new Error("Something went wrong");
    }
  };

  const handleToggleChange = () => {
    setIsChangingPassword((prev) => !prev);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:8000/api/update-password",
        { oldpassword: currentPassword, newPassword },
        { withCredentials: true }
      );
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setIsChangingPassword(false);
    } catch (error) {
      console.error("Failed to update password:", error);
      alert("Error updating password");
    }
  };

  const handleChangeTheme = () => {
    setIsChecked((prevState) => !prevState);
    dispatch(changeTheme());
  };

  return (
    <div className="p-2">
      <h1 className="text-xl font-medium">Account Details</h1>
      <section className="p-1 rounded shadow-lg dark:bg-black bg-white dark:shadow-white bg-transparent backdrop:blur dark:shadow-sm w-full">
        <span className="flex items-center justify-between px-3 border-g">
          <p>
            User name:{" "}
            <input
              ref={inputRefName}
              type="text"
              placeholder="User"
              disabled
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </p>
          <Button onClick={handleChangeName} className="max-w-20 text-sm">
            Change
          </Button>
        </span>
        <span className="flex items-center justify-between px-3 border-g">
          <p>
            Email:{" "}
            <input
              ref={inputRefEmail}
              type="text"
              placeholder="Email"
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </p>
          <Button onClick={handleChangeEmail} className="max-w-20 text-sm">
            Change
          </Button>
        </span>
        <div className="p-4">
          <button
            onClick={handleToggleChange}
            className={`p-2 dark:border dark:border-zinc-200 shadow-md ${
              isChangingPassword ? "bg-gray-600" : "bg-gray-800"
            } text-white rounded transition-colors`}
          >
            {isChangingPassword ? "Cancel" : "Change Password"}
          </button>

          {isChangingPassword && (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="max-w-56">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div className="max-w-56">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <button
                type="submit"
                className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="mt-2 p-2 shadow-lg rounded-lg bg-white dark:bg-black dark:shadow-white dark:shadow-sm w-full">
        <h1 className="text-lg font-normal">Preferences</h1>
        <label className="flex items-center cursor-pointer m-3">
          <span className="mr-3 text-sm">Dark</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChangeTheme}
              className="sr-only"
            />
            <div
              className={`block w-12 h-6 rounded-full ${
                isChecked ? "bg-gray-800" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${
                  isChecked ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        </label>
      </section>
    </div>
  );
}

export default UserSettings;
