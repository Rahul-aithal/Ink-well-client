import React from "react";
import Button from "../components/ui/button";
import { useNavigate } from "react-router";

function DashBorad() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 ">
      {/* Left Side Starts */}
      <div className="p-2 md:p-5 flex flex-col">
        <section>
          <h1 className="text-xl md:text-2xl">Recommended Stories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {/* Story Card 1 */}
            <div className="flex flex-col items-start p-5 rounded m-1 mx-1/3 md:m-2 md:mx-3 transition-transform ease-linear transform hover:scale-105">
              <img
                src="https://as1.ftcdn.net/v2/jpg/05/97/13/72/1000_F_597137243_yYnmzSNL0GdyXznPSii44wR3DvQjX7sd.jpg"
                alt="The Last Dragon of Eldoria"
                className="w-full h-48 object-cover rounded-xl"
              />
              <h1 className="font-extrabold mt-2 text-lg md:text-xl">
                The Last Dragon of Eldoria
              </h1>
              <p className="text-xs font-light text-gray-700 dark:text-gray-400 mt-1">
                A solitary dragon's journey reveals hidden truths that could
                alter his world forever. Embark on an epic adventure filled with
                magic and peril.
              </p>
            </div>
            {/* Story Card 2 */}
            <div className="flex flex-col items-start p-5 rounded m-2 mx-3 transition-transform ease-linear transform hover:scale-105">
              <img
                src="https://as1.ftcdn.net/v2/jpg/05/97/13/72/1000_F_597137243_yYnmzSNL0GdyXznPSii44wR3DvQjX7sd.jpg"
                alt="The Last Dragon of Eldoria"
                className="w-full h-48 object-cover rounded-lg"
              />
              <h1 className="font-extrabold mt-2 text-lg md:text-xl">
                The Last Dragon of Eldoria
              </h1>
              <p className="text-xs font-light text-gray-700 dark:text-gray-400 mt-1">
                A solitary dragon's journey reveals hidden truths that could
                alter his world forever. Embark on an epic adventure filled with
                magic and peril.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h1 className="text-xl md:text-2xl">Quick Access</h1>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {/* Button to Create New Story */}
            <Button
              onClick={() => navigate("/create-join-story")}
              className="rounded-2xl h-10 max-w-36 md:min-w-32 text-xs my-1 mx-1"
            >
              Create New Story
            </Button>

            {/* Button to View My Stories */}
            <Button
              onClick={() => navigate("/your-stories")}
              className="rounded-2xl h-10 max-w-36 md:min-w-32 text-xs my-1 mx-1"
            >
              View My Stories
            </Button>
          </div>
        </section>
      </div>
      {/* Left Side Ends */}

      {/* Right Side Starts */}
      <div className="p-5 flex flex-col gap-5 items-center ">
        <section>
          <h1 className="text-md md:text-2xl">Notifications</h1>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-xs md:text-sm text-gray-500">
              You have 3 new comments on Your "River vs Man"
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              You have 3 new comments on Your "River vs Man"
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              You have 3 new comments on Your "River vs Man"
            </p>
          </div>
        </section>

        <section>
          <h1 className="text-md md:text-2xl">Recent Activity</h1>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-xs md:text-sm text-gray-500">
              You have 3 new comments on Your "River vs Man"
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              You have 3 new comments on Your "River vs Man"
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              You have 3 new comments on Your "River vs Man"
            </p>
          </div>
        </section>
      </div>
      {/* Right Side Ends */}
    </div>
  );
}

export default DashBorad;
