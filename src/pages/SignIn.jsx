import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { Label } from "../components/ui/label";
import { Input, LabelInputContainer } from "../components/ui/input";
import { BottomGradient } from "../components/ui/button";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice"; // Import login action
import { useNavigate } from "react-router";

export function SigninForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [submissionError, setSubmissionError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };

    if (!email) newErrors.email = "Email is required.";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format.";
    if (!password) newErrors.password = "Password is required.";

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = { email, password };

      const response = await axios.post(
        "http://localhost:8000/api/sign-in",
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
        dispatch(login({ userData: response.data.user }));
        navigate("/your-stories");
      }
      // Clear form fields and errors on success
      setEmail("");
      setPassword("");
      setErrors({ email: "", password: "" });
      setSubmissionError("");
    } catch (error) {
      // Handle error response
      console.log( error.response.data);
      
      if (error.response) {
        if (error.response.status === 401) {
          // Handle wrong password case
          setSubmissionError("Wrong password. Please try again.");
        } else if (error.response.status === 409) {
          // Handle email not found case
          setSubmissionError("Email not found. Please check your email address.");
        } else {
          // Handle other errors
          setSubmissionError(
            error.response.data.message || "An error occurred during submission."
          );
        }
      } else {
        setSubmissionError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-md w-full h-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Ink Well
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to Ink Well through creating an account as we don&apos;t have a
        third-party login flow yet.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            autoComplete="email"
            name="email"
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
            name="password"
            autoComplete="current-password"  // Ensure correct autocomplete attribute
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
          Sign in &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}
