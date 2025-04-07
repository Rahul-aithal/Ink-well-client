

const ParticipantsList = ({ owners }) => {
  return (
    <section className="p-2 w-full">
      <h2 className="text-xl mb-2">Participants</h2>
      {owners?.length > 0 &&
        owners.map((owner) => (
          <div
            key={owner._id}
            className="flex items-center gap-2 justify-start max-w-28"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-black dark:text-white"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">{owner.username}</p>
          </div>
        ))}
    </section>
  );
};

export default ParticipantsList;
