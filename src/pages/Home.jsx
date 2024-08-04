import React, { useMemo } from "react";
import Button from "../components/ui/button";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

export function Home() {
  const InfiniteReviews = useMemo(
    () => (
      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden ">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="fast"
        />
      </div>
    ),
    [] // No dependencies needed here if testimonials are static
  );

  return (
    <div className="flex flex-col items-center gap-5 justify-around ">
      {/* Heading Starts  */}
      <div className="text-center flex flex-col items-center">
        <h1 className="text-xl font-extrabold dark:text-white my-2">
          Welcome to Ink Well
        </h1>
        <p className="text-sm text-gray-600 my-2 dark:text-gray-300">
          Collaborate with writers around the world and create amazing stories
          together
        </p>
        <Button className="rounded-lg text-xs h-10 my-2 py-3 w-24">
          Get Started
        </Button>
      </div>
      {/* Heading Ends  */}

      {/* Stories Preview Starts */}
      <div>
        <h1 className="text-xl font-extrabold">Featured Stories</h1>
        <div className="grid grid-cols-3 gap-2 place-items-center">

          <div className="bg-zinc-300 dark:bg-zinc-800 flex flex-col items-start p-5 rounded m-2 mx-3 w-[20rem] transition-transform ease-linear transform hover:scale-110">
            <img
              src="https://as1.ftcdn.net/v2/jpg/05/97/13/72/1000_F_597137243_yYnmzSNL0GdyXznPSii44wR3DvQjX7sd.jpg"
              alt="The Last Dragon of Eldoria"
              className="w-full h-48 object-cover rounded-t "
            />
            <h1 className="font-extrabold mt-2">The Last Dragon of Eldoria</h1>
            <p className="text-xs font-light text-gray-700 dark:text-gray-400 mt-1">
              A solitary dragon's journey reveals hidden truths that could alter
              his world forever. Embark on an epic adventure filled with magic
              and peril.
            </p>
          </div>

          <div className="bg-gray-200 flex flex-col items-start p-2 rounded my-2">
            <img
              src="https://via.placeholder.com/150"
              alt="Placeholder Image"
              className="w-full h-32 object-cover rounded-t"
            />
            <h1 className="font-bold mt-2">Heading</h1>
            <p className="text-sm">Description</p>
          </div>
          <div className="bg-gray-200 flex flex-col items-start p-2 rounded my-2">
            <img
              src="https://via.placeholder.com/150"
              alt="Placeholder Image"
              className="w-full h-32 object-cover rounded-t"
            />
            <h1 className="font-bold mt-2">Heading</h1>
            <p className="text-sm">Description</p>
          </div>
        </div>
      </div>
      {/* Stories Preview Ends */}

      {/* Quick Reviews */}
      <div className="">

      {InfiniteReviews}
      </div>
      {/* Quick Reviews */}

 
        <div className="flex gap-5">
          <Button to={"/sign-in"} className={"rounded-2xl h-10  w-16 text-xs  my-0 mx-1"}>Sing In</Button>
       
          <Button to={"/sign-up"} className={"rounded-2xl h-10 w-16 text-xs   my-0 mx-1"}>Sign Up</Button>
        </div>

    </div>
  );
}
