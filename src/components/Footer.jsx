import React from 'react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 max-w-[100dvw]">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0 text-center md:text-left">
          © 2023 StoryScribe. All rights reserved.
        </p>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
