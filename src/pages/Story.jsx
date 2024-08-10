import React, { useState } from "react";
import { Input, LabelInputContainer } from "../components/ui/input";
import { cn } from "../lib/utils";
import { BottomGradient } from "../components/ui/button";
import { useNavigate } from "react-router";

function Story() {
  const [searchValue, setSearchValue] = useState("");
 const navigate= useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = () => {
navigate('/edit-stories',{state:{title,description}})
  };
  const handleJoinStory = () => {};
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5">
      {/* Left Side Starts */}

      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl mb-4">Create or Join a Story</h1>
        <form
          className="p-3 shadow-xl dark:shadow bg-zinc-300 dark:bg-zinc-900 rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl mb-5">Start a New Story</h2>

          <LabelInputContainer className="mb-4">
            <Input
              id="first-name"
              placeholder="Story title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Input
              id="last-name"
              placeholder="Story Description"
              type="text"
              className="h-56 border-2"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
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

      <div className="flex flex-col">
        <form className="p-3 shadow-xl dark:shadow bg-zinc-300 dark:bg-zinc-900 rounded">
          <h2 className="text-xl mb-5">Join an Existing Story</h2>

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

          <h1 className="text-xl mb-3">Available Stories:</h1>

          <div className="max-h-[25rem] overflow-y-scroll">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="dark:bg-zinc-800 bg-zinc-300 p-3 rounded-xl mt-3"
              >
                <div className="m-2 mb-5">
                  <h1 className="text-xl">The Lost Treasure</h1>
                  <p className="text-gray-500 text-sm">
                    An adventure about finding hidden treasures
                  </p>
                </div>
                <button
                  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-center"
                  type="button"
                  onClick={handleJoinStory}
                >
                  Join Story &rarr;
                  <BottomGradient />
                </button>
              </div>
            ))}
          </div>
        </form>
      </div>

      {/* Right Side Ends */}
    </div>
  );
}

export default Story;
