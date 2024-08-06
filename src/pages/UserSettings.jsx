import React, { useEffect, useRef, useState } from "react";
import Button from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../store/ThemeSlice";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

function UserSettings() {
  // Get current theme from Redux store
  const theme = useSelector((state) => state.theme.theme);

  // Refs for input fields
  const inputRefName = useRef(null);
  const inputRefEmail = useRef(null);
  const dispatch = useDispatch();
  
  // State for toggling password change form and theme checkbox
  const [isChecked, setIsChecked] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Set the initial state for the theme checkbox based on the current theme
  useEffect(() => {
    setIsChecked(theme === "dark");
  }, [theme]);

  // Handle toggling the name change input
  const handleChangeName = (e) => {
    if (
      e.target.innerText === "Save" &&
      !inputRefName.current.hasAttribute("disabled")
    ) {
      alert("Sure"); // Confirm the change
      e.target.innerText = "Change";
      inputRefName.current.setAttribute("disabled");
      return;
    }
    if (
      e.target.innerText === "Change" &&
      inputRefName.current.hasAttribute("disabled")
    ) {
      inputRefName.current.removeAttribute("disabled");
      e.target.innerText = "Save";
      inputRefName.current.focus();
      return;
    } else {
      console.log(
        'e.target.innerText === "Save"',
        e.target.innerText === "Save"
      );
      console.log(
        'inputRefName.current.hasAttribute("disabled")',
        inputRefName.current.hasAttribute("disabled")
      );
      throw Error("Something went wrong");
    }
  };

  // Handle toggling the email change input
  const handleChangeEmail = (e) => {
    if (
      e.target.innerText === "Save" &&
      !inputRefEmail.current.hasAttribute("disabled")
    ) {
      alert("Sure"); // Confirm the change
      e.target.innerText = "Change";
      inputRefEmail.current.setAttribute("disabled");
      return;
    }
    if (
      e.target.innerText === "Change" &&
      inputRefEmail.current.hasAttribute("disabled")
    ) {
      inputRefEmail.current.removeAttribute("disabled");
      e.target.innerText = "Save";
      inputRefEmail.current.focus();
      return;
    } else {
      console.log(
        'e.target.innerText === "Save"',
        e.target.innerText === "Save"
      );
      console.log(
        "inputRefEmail.current.hasAttribute('disabled')",
        inputRefEmail.current.hasAttribute("disabled")
      );
      throw Error("Something went wrong");
    }
  };

  // Toggle password change form visibility
  const handleToggleChange = () => {
    setIsChangingPassword((prev) => !prev);
  };

  // Handle current password input change
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  // Handle new password input change
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // Handle form submission for password change
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling password change should be added here
    alert(`Current Password: ${currentPassword}\nNew Password: ${newPassword}`);
  };

  // Handle theme toggle
  const handleChangeThemee = () => {
    setIsChecked((prevState) => !prevState);
    dispatch(changeTheme());
  };

  return (
    <div className="p-2 ">
      <h1 className="text-xl font-medium">Account Details</h1>
      <section className="p-1 rounded shadow-lg dark:bg-black bg-white dark:shadow-white bg-transparent backdrop:blur dark:shadow-sm w-full">
        {/* User Name and Email Settings */}
        <span className="flex items-center justify-between px-3 border-g">
          <p>
            User name:{" "}
            <input
              ref={inputRefName}
              type="text"
              placeholder="User"
              disabled
              className="bg-transparent rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </p>
          <Button onClick={handleChangeName} className="max-w-20 text-sm ">
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
              className="bg-transparent rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </p>
          <Button onClick={handleChangeEmail} className="max-w-20 text-sm ">
            Change
          </Button>
        </span>
        <div className="p-4">
          {/* Toggle button for changing password */}
          <button
            onClick={handleToggleChange}
            className={`p-2 dark:border dark:border-zinc-200 shadow-md ${
              isChangingPassword ? "bg-gray-600" : "bg-gray-800"
            } text-white rounded transition-colors`}
          >
            {isChangingPassword ? "Cancel" : "Change Password"}
          </button>

          {/* Password change form */}
          {isChangingPassword && (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="max-w-56">
                <Label
                  htmlFor="current-password"
                >
                  Current Password
                </Label>
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
                <Label
                  htmlFor="new-password"
                >
                  New Password
                </Label>
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
        {/* Theme Toggle */}
        <label className="flex items-center cursor-pointer m-3">
          <span className="mr-3 text-sm">Dark</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChangeThemee}
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
