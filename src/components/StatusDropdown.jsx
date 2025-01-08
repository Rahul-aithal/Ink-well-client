// components/StatusDropdown.js
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const statusOptions = [
  { status: "All" },
  { status: "Draft" },
  { status: "Published" },
  { status: "Editing" },
  { status: "Collaborative" },
];

const StatusDropdown = ({ selectedStatus, handleStatusSelection }) => (
  <Menu as="div" className="relative inline-block text-left">
    <div className="flex items-center gap-2">
      <h2 className="hidden md:block">Status</h2>
      <MenuButton className="inline-flex items-center gap-x-1.5 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
        {selectedStatus ? selectedStatus : "All"}
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
        {statusOptions.map((option) => (
          <MenuItem key={option.status}>
            <button
              type="button"
              onClick={() => handleStatusSelection(option.status)}
              className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {option.status}
            </button>
          </MenuItem>
        ))}
      </div>
    </MenuItems>
  </Menu>
);

export default StatusDropdown;
