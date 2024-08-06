import React from "react";

const NewsUpdates = () => {
  const updates = [
    {
      title: "Enhanced Notification System Coming Soon",
      description: "We will be implementing a notification system to keep users informed about important updates and activities related to their account and interactions on the website. This feature will ensure that users never miss crucial updates or messages."
    },
    {
      title: "Interactive Comments and Likes Feature",
      description: "Users will soon be able to interact with content by leaving comments and liking posts. This feature will enhance engagement and allow users to express their opinions and feedback on various stories and posts."
    },
    {
      title: "User and Story Avatars Introduction",
      description: "We will introduce avatar images for both users and stories. This will personalize the user experience and make it easier to identify stories and users through their profile pictures and visual representations."
    },
    {
      title: "New Sign-In Options for Improved Access",
      description: "We will offer a new sign-in option to streamline the login process. This feature aims to make it easier for users to access their accounts with additional login methods or enhanced security features."
    },
    {
      title: "Future Authentication Enhancements",
      description: "We are planning to enhance our authentication system with more robust security measures. This will involve additional steps in the authentication process to ensure the safety and security of user accounts and sensitive information."
    },
  ];

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">News Updates</h1>
        <p className="mb-4">
          Here are the upcoming features and updates we are planning to introduce on our website:
        </p>
        <ul className="list-disc pl-5 space-y-4">
          {updates.map((update, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              <h2 className="text-xl font-semibold">{update.title}</h2>
              <p>{update.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsUpdates;
