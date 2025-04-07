import { useEffect, useMemo, useState } from "react";
import Button from "../components/ui/button";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllStories } from "../apis/story";
import { setStories } from "../store/storySlice";
import { createToast } from "../lib/utils";

const testimonials = [
  {
    quote:
      "The only limit to our realization of tomorrow is our doubts of today.",
    name: "Franklin D. Roosevelt",
    title: "32nd President of the United States",
  },
  {
    quote:
      "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    name: "Martin Luther King Jr.",
    title: "Civil Rights Leader",
  },
  {
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    name: "Winston Churchill",
    title: "Former British Prime Minister",
  },
  {
    quote: "The best way to predict the future is to invent it.",
    name: "Alan Kay",
    title: "Computer Scientist",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    name: "John Lennon",
    title: "Musician, The Beatles",
  },
];
const query = {
  search: "all",
  limit: 3,
  sortBy: "title",
  sortType: "asc",
  username: "",
};

export function Home() {
  const isSignined = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const InfiniteReviews = useMemo(
    () => (
      <div className="w-[20rem] md:w-full h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden ">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="fast"
        />
      </div>
    ),
    []
  );
  const [topThreedStories, setTopThreedStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const soterdSotries = useSelector((state) => state.story.stories);

  useEffect(() => {
    setLoading(true);
    if (soterdSotries && soterdSotries.length === 3) {
      setTopThreedStories(soterdSotries);
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
  return (
    <div className="flex flex-col items-center gap-5 justify-around py-3 px-2 md:px-10">
      {/* Heading Starts  */}
      <div className="text-center flex flex-col items-center">
        <h1 className="text-lg md:text-xl font-extrabold dark:text-white my-2">
          Welcome to Ink Well
        </h1>
        <p className="text-xs md:text-sm text-gray-600 my-2 dark:text-gray-300">
          Collaborate with writers around the world and create amazing stories
          together
        </p>
        <Button
          onClick={() =>
            isSignined ? navigate("/dashboard") : navigate("/sign-up")
          }
          className="rounded-lg text-xs h-10 my-2 py-3 max-w-24"
        >
          Get Started
        </Button>
      </div>
      {/* Heading Ends  */}

      {/* Stories Preview Starts */}
      <div className="w-full">
        <h1 className="text-lg md:text-xl font-extrabold text-center md:text-left">
          Featured Stories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 place-items-center">
          {loading ? (
            // Simple loading message without animation
            <div className="flex flex-col space-y-4 p-5">
              {[...Array(3)].map((_, index) => (
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
      </div>
      {/* Stories Preview Ends */}

      {/* Quick Reviews */}
      <div className="w-full">{InfiniteReviews}</div>
      {/* Quick Reviews */}

      {!isSignined && (
        <div className="flex gap-5">
          <Button
            onClick={() => navigate("/sign-in")}
            className={"rounded-2xl h-10 min-w-24 text-xs my-0 mx-1"}
          >
            Sing In
          </Button>

          <Button
            onClick={() => navigate("/sign-up")}
            className={"rounded-2xl h-10 min-w-24 text-xs my-0 mx-1"}
          >
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}
