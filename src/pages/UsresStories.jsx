import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Button from "../components/ui/button";

const genresOptions = [
  {
    genre: "All",
  },
  {
    genre: "Fantasy",
  },
  {
    genre: "Mystery",
  },
  {
    genre: "Romance",
  },
  {
    genre: "Science Fiction",
  },
  {
    genre: "Adventure",
  },
];
const Allstories = [
  {
    title: "The Enchanted Forest",
    description:
      "A journey into a magical forest filled with mythical creatures.",
    genre: "Fantasy",
    status: "draft",
  },
  {
    title: "Mystery of the Lost Artifact",
    description:
      "A detective's quest to uncover the secrets of an ancient artifact.",
    genre: "Mystery",
    status: "published",
  },
  {
    title: "Romantic Escapade",
    description: "A love story that blossoms during an adventurous trip.",
    genre: "Romance",
    status: "editing",
  },
  {
    title: "Galactic Adventures",
    description: "An epic space journey through uncharted galaxies.",
    genre: "Science Fiction",
    status: "draft",
  },
  {
    title: "Love in the Time of AI",
    description: "A romance between a human and an AI in a futuristic world.",
    genre: "Romance",
    status: "collaborative",
  },
  {
    title: "The Fantasy Chronicles",
    description: "A saga of heroes and villains in a fantastical realm.",
    genre: "Fantasy",
    status: "published",
  },
];
const statusOptions = [
  { status: "All" },
  { status: "Draft" },
  { status: "Published" },
  { status: "Editing" },
  { status: "Collaborative" },
];

function UsresStories() {
  const [genre, setGenre] = useState("All");
  const [status, setStatus] = useState("All");
  const [stories, setStories] = useState([]);
  const handleOptionClickForGener = (value) => {
    setGenre(value);
  };
  const handleOptionClickForStatus = (value) => {
    setStatus(value);
  };

  useEffect(() => {
    let filteredStories = Allstories;

    if (status !== "All") {
      filteredStories = filteredStories.filter((story) => {
        return story.status.toLowerCase() === status.toLowerCase();
      });
    }

    if (genre !== "All") {
      filteredStories = filteredStories.filter(
        (story) => story.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    setStories(filteredStories);
  }, [Allstories, genre, status]);

  return (
    <div>
      {/* header Starts */}

      <header className="flex items-center justify-between px-5 py-2 sticky mb-4 z-10">
        <h1 className="text-xl "> My Stories</h1>
        <div className="flex items-center gap-2 justify-center">
          {/* Status Starts Here*/}
          <Menu as="div" className="relative inline-block text-left">
            <div className="flex items-center gap-4">
              <h2>Status</h2>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {status ? status : "All"}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {statusOptions.length > 0 &&
                  statusOptions.map((status) => (
                    <MenuItem>
                      <button
                        key={status.status}
                        type="button"
                        onClick={() => {
                          handleOptionClickForStatus(status.status);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        {status.status}
                      </button>
                    </MenuItem>
                  ))}
              </div>
            </MenuItems>
          </Menu>
          {/* Status Ends Here*/}

          {/* Genre Starts Here */}
          <Menu as="div" className="relative inline-block text-left">
            <div className="flex items-center gap-4">
              <h2>Gener</h2>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {genre ? genre : "All"}
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {genresOptions.length > 0 &&
                  genresOptions.map((genre, id) => (
                    <MenuItem>
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          handleOptionClickForGener(genre.genre);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        {genre.genre}
                      </button>
                    </MenuItem>
                  ))}
              </div>
            </MenuItems>
          </Menu>
          {/* Genre Starts Here */}
        </div>
      </header>
      {/* header Ends*/}

      {/* Story Starts */}
      <section className="m-3 p-3 grid grid-cols-3 gap-4">
        {stories.length > 0 &&
          stories.map((storie) => (
            <div className="max-w-96 border p-2 shadow-md flex flex-col gap-4">
              <h1 className="text-xl">{storie.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-500">
                {storie.description}
              </p>
              <div className="flex gap-4 items-center">
                <Button
                  variant="empty"
                  className=" min-w-10 max-w-12 rounded-lg px-1 h-10  text-sm"
                >
                  View
                </Button>
                <Button
                  variant="black"
                  className="min-w-10 max-w-12 rounded-lg px-1 text-sm"
                >
                  Edit
                </Button>
                <Button
                  variant="red"
                  className="min-w-10 max-w-12 rounded-lg px-1 text-sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
      </section>
      {/* Story Ends */}
    </div>
  );
}

export default UsresStories;
