import React, { useEffect, useRef, useState } from "react";
import { Label } from "../components/ui/label";
import { Input, LabelInputContainer } from "../components/ui/input";
import Button from "../components/ui/button";

function EditStory() {
  const [story, setStory] = useState("");
  const textareaRef = useRef();
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [story])
 
  return (
    <div className="grid grid-cols-12 gap-4 p-2">
      {/* Left Side Starts */}
      <div className="p-3 col-span-3 bg-transparent shadow flex flex-col items-start gap-4  rounded dark:shadow-gray-400 dark:shadow">
        {/* Participents Starts */}
        <section className="p-2">
          <h2 className="text-xl mb-2">Participents</h2>

          <div className="flex items-center gap-2 justify-start max-w-28">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-black dark:text-white"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">User Name</p>
          </div>
        </section>
        {/* Participents Ends */}

        {/* Story Settings starts */}

        <section>
          <h1>Story Settings</h1>
          <div className="m-2 mt-5 flex flex-col gap-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Stroy title" type="text" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="genre" className>
                Genre
              </Label>
              <Input id="genre" placeholder="Stroy genre" type="text" />
            </LabelInputContainer>
          </div>
        </section>

        {/* Story Settings ends */}
      </div>
      {/* Left Side Ends */}

      {/* Mid Part Starts  */}
      <div className="col-span-8 ">
        <header className="flex items-center justify-between">
          <h1 className="text-xl ">Story Editor</h1>
          <Button onCli className="max-w-24">Save</Button>
        </header>
        <section>
        <textarea
        ref={textareaRef}
        name="story"
        id="story"
        value={story}
        onChange={(e)=>{setStory(e.target.value)}}
        placeholder="Start here..."
        rows={18}
        className="w-full p-4 border-2 border-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600 overflow-auto"
        style={{ overflow: 'auto' }}
      ></textarea>
        
        </section>
      </div>
  
    </div>
  );
}

export default EditStory;
