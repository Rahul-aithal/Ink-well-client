import React from "react";

const updates = [
  {
    title: "Notification System Now Live",
    description:
      "The notification system has been successfully implemented! Users will now receive real-time updates and alerts about activities related to their account, including comments, likes, and other important events. Stay informed with our new in-app notification center.",
  },
  {
    title: "Interactive Comments and Likes Feature",
    description:
      "Users will soon be able to interact with content by leaving comments and liking posts. This feature will enhance engagement and allow users to express their opinions and feedback on various stories and posts.",
  },
  {
    title: "User and Story Avatars Are Now Available",
    description:
      "Avatars have been introduced for both users and stories! This personalization helps visually distinguish users and adds identity to stories. You can now upload your profile picture and enjoy a more visually engaging experience.",
  },
  {
    title: "New Sign-In Options for Improved Access",
    description:
      "We will offer a new sign-in option to streamline the login process. This feature aims to make it easier for users to access their accounts with additional login methods or enhanced security features.",
  },
  {
    title: "Future Authentication Enhancements",
    description:
      "We are planning to enhance our authentication system with more robust security measures. This will involve additional steps in the authentication process to ensure the safety and security of user accounts and sensitive information.",
  },
  {
    title: "Markdown Support Added for Stories",
    description:
      "You can now write and view stories with full Markdown support. Formatting like **bold**, *italics*, `code`, and even lists and headings will render beautifully in your stories. Whitespace and line breaks are also preserved properly!",
  },
];

const NewsUpdates = () => {
  return (
    <div className="p-6 sm:p-10 bg-white dark:bg-slate  -900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">🚀 Latest Updates</h1>
        <p className="text-center text-lg mb-10 text-gray-600 dark:text-gray-400">
          Stay informed with the newest features and improvements coming to Ink Well.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {updates.map((update, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-blue-500"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                {update.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{update.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsUpdates;
