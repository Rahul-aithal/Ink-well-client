import React from 'react';
import { Label } from "./ui/label";
import { Input, LabelInputContainer } from "./ui/input";



const StorySettings = ({
  title,
  setTitle,
  genre,
  setGenre,
  isEditable,
  handleChangeEditable,
}) => {
  return (
    <section className="w-full">
      <h1 className="text-xl mb-4">Story Settings</h1>
      <div className="m-2 mt-5 flex flex-col gap-2">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Story title"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            placeholder="Story genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            type="text"
          />
        </LabelInputContainer>
        <label className="flex items-center cursor-pointer m-3">
          <span className="mr-3">Participants can edit</span>
          <div className="relative transition-all ease-in-out">
            <input
              type="checkbox"
              checked={isEditable}
              onChange={handleChangeEditable}
              className="sr-only"
            />
            <div
              className={`block w-12 h-6 rounded-full delay-100 ${
                isEditable ? "bg-gray-800" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute left-1 top-1 delay-100 bg-white w-4 h-4 rounded-full transition-transform transform ${
                  isEditable ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        </label>
      </div>
    </section>
  );
};

export default StorySettings;

