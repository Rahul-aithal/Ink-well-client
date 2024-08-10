import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { Label } from "../components/ui/label";
import { Input, LabelInputContainer } from "../components/ui/input";
import { BottomGradient } from "../components/ui/button";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";
import { useNavigate } from "react-router";

export function SignupForm() {
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [submissionError, setSubmissionError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { userName: "", email: "", password: "" };

    if (!userName) newErrors.userName = "User name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format.";
    if (!password) newErrors.password = "Password is required.";

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = {
        username:userName,
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:8000/api/sign-up",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Handle successful response
      console.log("Response:", response.data);
      if (response.data.success) {
        navigate('/sign-in')
     
      }
      // Clear form fields and errors on success
      setUserName("");
      setEmail("");
      setPassword("");
      setErrors({ userName: "", email: "", password: "" });
      setSubmissionError("");
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        setSubmissionError(
          error.response.data.message || "An error occurred during submission."
        );
      } else {
        setSubmissionError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Ink Well
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to Ink Well by creating an account as we don&apos;t have a
        third-party login flow yet.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="user-name">User Name</Label>
            <Input
              id="user-name"
              placeholder="Tyler"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.userName && (
              <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </LabelInputContainer>

        {submissionError && (
          <p className="text-red-500 text-xs mt-1">{submissionError}</p>
        )}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </div>
  );
}
