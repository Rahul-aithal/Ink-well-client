import { useNavigate } from "react-router";

function StoryCardFeat({ id,title,avatar,description }) {
  const navigate = useNavigate();
  return (
    <div
      key={id}
      className=" border-2 flex flex-col items-start p-5 rounded m-1 mx-1/3 md:m-2 md:mx-3 transition-transform ease-linear transform hover:scale-105"
      onClick={() =>
        navigate("/view-story", { state: { storyId:id } })
      }
    >
      <img
        src={avatar}
        alt={title}
        className="w-full h-48 object-cover rounded-xl"
      />
      <h1 className="font-extrabold mt-2 text-lg md:text-xl">
        {title}
      </h1>
      <p className="text-xs font-light text-gray-700 dark:text-gray-400 mt-1">
        {description}
      </p>
    </div>
  )
}

export default StoryCardFeat
