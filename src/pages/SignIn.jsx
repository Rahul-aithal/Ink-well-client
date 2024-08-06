import React from "react";
import { Label } from "../components/ui/label";
import { Input, LabelInputContainer } from "../components/ui/input";
import { BottomGradient } from "../components/ui/button";

export function SigninForm() {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="max-w-md w-full h-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      {/* Title and description */}
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Ink Well
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to Ink Well through creating email because we don&apos;t have a third-party login flow yet
      </p>

      {/* Form starts here */}
      <form className="my-8" onSubmit={handleSubmit}>
        {/* First Name Input */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" placeholder="Tyler" type="text" />
        </LabelInputContainer>

        {/* Last Name Input */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" placeholder="Durden" type="text" />
        </LabelInputContainer>

        {/* Email Address Input */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>

        {/* Password Input */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        {/* Submit Button */}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

      </form>
      {/* Optional horizontal divider (commented out) */}
      {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}
    </div>
  );
}
