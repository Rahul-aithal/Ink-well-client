import React from "react";
import Button from "../components/ui/button";

function DashBorad() {
  return (
    <div className="grid grid-cols-2 ">
      {/* Left Side Starts */}

      <div className="p-5 flex flex-col">
        <section>
          <h1 className="text-xl md:text-2xl ">Recommended Stories</h1>
          <div className="grid grid-cols-2">
            <div className=" flex flex-col items-start p-5 rounded m-2 mx-3 w-[18rem] transition-transform ease-linear transform hover:scale-110">
              <img
                src="https://as1.ftcdn.net/v2/jpg/05/97/13/72/1000_F_597137243_yYnmzSNL0GdyXznPSii44wR3DvQjX7sd.jpg"
                alt="The Last Dragon of Eldoria"
                className="w-[15rem] h-48 object-contain  rounded-xl "
              />
              <h1 className="font-extrabold mt-2">
                The Last Dragon of Eldoria
              </h1>
              <p className="text-xs font-light text-gray-700 dark:text-gray-400 mt-1">
                A solitary dragon's journey reveals hidden truths that could
                alter his world forever. Embark on an epic adventure filled with
                magic and peril.
              </p>
            </div>
            <div className=" flex flex-col items-start p-5 rounded m-2 mx-3 w-[18rem] transition-transform ease-linear transform hover:scale-110">
              <img
                src="https://as1.ftcdn.net/v2/jpg/05/97/13/72/1000_F_597137243_yYnmzSNL0GdyXznPSii44wR3DvQjX7sd.jpg"
                alt="The Last Dragon of Eldoria"
                className="w-[15rem] h-48 object-contain  rounded-lg "
              />
              <h1 className="font-extrabold mt-2">
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
        <h1 className="text-xl md:text-2xl ">Quick Access</h1>
        <div className="flex gap-3">
        <Button to={"/"} className={"rounded-2xl h-10  min-w-32 max-w-fit text-xs  my-0 mx-1"}>Create New Stroy</Button>
       
       <Button to={"/"} className={"rounded-2xl h-10 min-w-32 max-w-fit text-xs   my-0 mx-1"}>View My Stories</Button>
       </div>
        </section>
      </div>

      {/* Left Side Ends */}

      {/* Right Side Starts */}

      <div className="p-5 flex flex-col justify-between">
        <section>
        <h1 className="text-xl md:text-2xl ">Notifications</h1>
        <div className="flex flex-col gap-10 items-start justify-around mt-8 ps-3">

        <p className="text-[0.9rem] text-gray-500">You have 3 new comments on Your "River vs Man" </p>
        <p className="text-[0.9rem] text-gray-500"> You have 3 new comments on Your "River vs Man" </p>
        <p className="text-[0.9rem] text-gray-500"> You have 3 new comments on Your "River vs Man" </p>
        </div>
     
        </section>
        <section className="mt-">
        <h1 className="text-xl md:text-2xl ">Recent Activity</h1>
        <div className="flex flex-col gap-10 items-start justify-around mt-8 ps-3">

        <p className="text-[0.9rem] text-gray-500">You have 3 new comments on Your "River vs Man" </p>
        <p className="text-[0.9rem] text-gray-500"> You have 3 new comments on Your "River vs Man" </p>
        <p className="text-[0.9rem] text-gray-500"> You have 3 new comments on Your "River vs Man" </p>
        </div>
     
        </section>
      </div>

      {/* Right Side Ends*/}
    </div>
  );
}

export default DashBorad;
