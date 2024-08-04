import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";

function Story() {
  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = () => {};
  const handleJoinStory = () => {};
  return (
    <div className="grid grid-cols-2">
      {/* Left Side Starts */}

      <div className="p-5 flex flex-col">
        <h1 className="text-xl md:text-2xl ">Create or Join a Story</h1>
        <form className="p-3 mx-5" onSubmit={handleSubmit}>
          <h2>Start a New Story</h2>

          <LabelInputContainer className="mb-4">
            <Input id="first-name" placeholder="Story title" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Input
              id="last-name"
              placeholder="Stroy Description"
              type="text"
              className="h-56"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-center"
            type="submit"
          >
            Create Story &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
      {/* Left Side Ends */}

      {/* Right Side Starts */}

      <div className="p-5 flex flex-col me-5">
        <form className="p-3 mx-5">
          <h2>Join an Existing Story</h2>

          {/* Search Button */}
          <LabelInputContainer className="mb-4">
            <Input
              id="first-name"
              placeholder="Search Story"
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </LabelInputContainer>
          {/* Search Button */}

          <h1 className="text-xl ">Available Stories:</h1>

          <div className="mt-3 max-h-[25rem] overflow-y-scroll">

            <div className="dark:bg-zinc-800 bg-zinc-300 p-3 rounded-xl mt-3">
              <div className="m-2 mb-5">
                <h1 className="text-xl">The Lost Treasure</h1>
                <p className="text-gray-500 text-sm">
                  An adventure about finding hidden teasures
                </p>
              </div>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-center"
                type="button"
                onClick={handleJoinStory}
              >
                Create Story &rarr;
                <BottomGradient />
              </button>
            </div>

            <div className="dark:bg-zinc-800 bg-zinc-300 p-3 rounded-xl mt-3">
              <div className="m-2 mb-5">
                <h1 className="text-xl">The Lost Treasure</h1>
                <p className="text-gray-500 text-sm">
                  An adventure about finding hidden teasures
                </p>
              </div>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-center"
                type="button"
                onClick={handleJoinStory}
              >
                Create Story &rarr;
                <BottomGradient />
              </button>
            </div>

            <div className="dark:bg-zinc-800 bg-zinc-300 p-3 rounded-xl mt-3">
              <div className="m-2 mb-5">
                <h1 className="text-xl">The Lost Treasure</h1>
                <p className="text-gray-500 text-sm">
                  An adventure about finding hidden teasures
                </p>
              </div>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-center"
                type="button"
                onClick={handleJoinStory}
              >
                Create Story &rarr;
                <BottomGradient />
              </button>
            </div>

            <div className="dark:bg-zinc-800 bg-zinc-300 p-3 rounded-xl mt-3">
              <div className="m-2 mb-5">
                <h1 className="text-xl">The Lost Treasure</h1>
                <p className="text-gray-500 text-sm">
                  An adventure about finding hidden teasures
                </p>
              </div>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-center"
                type="button"
                onClick={handleJoinStory}
              >
                Create Story &rarr;
                <BottomGradient />
              </button>
            </div>

          </div>
          
        </form>
      </div>

      {/* Right Side Starts */}
    </div>
  );
}

export default Story;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
