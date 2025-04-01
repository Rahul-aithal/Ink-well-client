import { useEffect, useState } from "react";
import Button from "../components/ui/button";
import { useNavigate } from "react-router";
import { getAllStories } from "../apis/story";
import { useDispatch, useSelector } from "react-redux";
import { setStories } from "../store/storySlice";
import NotificationCard from "../components/NotificationCard";

const query = {
  search: "all",
  limit: 2,
  sortBy: "title",
  sortType: "asc",
  username: "",
};

function DashBorad() {
  const [topThreedStories, setTopThreedStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const soterdSotries = useSelector((state) => state.story.stories);
  useEffect(() => {
    setLoading(true);
    if (soterdSotries && soterdSotries.length >= 2) {
      setTopThreedStories(soterdSotries.slice(0, 2));
      setLoading(false);
    } else {
      getAllStories(query)
        .then((response) => {
          setTopThreedStories(response.data.data.stories);
          dispatch(setStories({ stories: response.data.data.stories }));
        })
        .catch((err) => alert(err.message))
        .finally(() => setLoading(false));
    }
  }, []);
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 ">
      {/* Left Side Starts */}
      <div className="p-2 md:p-5 flex flex-col">
        <section>
          <h1 className="text-xl md:text-2xl">Recommended Stories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {/* Story Card 1 */}
            {loading ? (
              // Simple loading message without animation
              <div className="flex flex-col space-y-4 p-5">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-gray-300 dark:bg-gray-700 h-48 w-full rounded-xl"
                  />
                ))}
              </div>
            ) : topThreedStories.length > 0 ? (
              topThreedStories.map((story) => (
                <div
                  key={story._id}
                  className="flex flex-col items-start p-5 rounded m-1 mx-1/3 md:m-2 md:mx-3 transition-transform ease-linear transform hover:scale-105"
                  onClick={() =>
                    navigate("/view-story", { state: { storyId: story._id } })
                  }
                >
                  <img
                    src={story.avatar}
                    alt={story.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <h1 className="font-extrabold mt-2 text-lg md:text-xl">
                    {story.title}
                  </h1>
                  <p className="text-xs font-light text-gray-700 dark:text-gray-400 mt-1">
                    {story.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No stories available</p>
            )}
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
          <NotificationCard />
        </section>

        {/* <section>
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
        </section> */}
      </div>
      {/* Right Side Ends */}
    </div>
  );
}

export default DashBorad;
