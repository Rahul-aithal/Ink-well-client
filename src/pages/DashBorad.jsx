import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAllStories } from "../apis/story";
import NotificationCard from "../components/NotificationCard";
import StoryCardFeat from "../components/StoryCardFeat";
import Button from "../components/ui/button";
import { createToast } from "../lib/utils";
import { setStories } from "../store/storySlice";

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
        .catch((err) => createToast(err.message, "error"))
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
                <StoryCardFeat  avatar={story.avatar} description={story.description} id={story._id} title={story.title}/>
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
