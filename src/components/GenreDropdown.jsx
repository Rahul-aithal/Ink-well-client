// components/GenreDropdown.js
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import PropTypes from "prop-types";

const genreOptions = [
  { genre: "All" },
  { genre: "Fantasy" },
  { genre: "Mystery" },
  { genre: "Romance" },
  { genre: "Science Fiction" },
  { genre: "Adventure" },
];

const GenreDropdown = ({ selectedGenre, handleGenreSelection }) => (
  
  <Menu as="div" className="relative inline-block text-left">
    <div className="flex items-center gap-2">
      <h2 className="hidden md:block">Genre</h2>
      <MenuButton className="inline-flex items-center gap-x-1.5 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
        {selectedGenre ? selectedGenre : "All"}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
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

    <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
      <div className="py-1 w-full">
        {genreOptions.map((option) => (
          <MenuItem key={option.genre}>
            <button
              type="button"
              onClick={() => handleGenreSelection(option.genre)}
              className="w-full block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {option.genre}
            </button>
          </MenuItem>
        ))}
      </div>
    </MenuItems>
  </Menu>
);

GenreDropdown.propTypes = {
  selectedGenre: PropTypes.string,
  handleGenreSelection: PropTypes.func.isRequired,
};

export default GenreDropdown;
