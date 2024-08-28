import { User } from "lucide-react";

const Profile = () => {
  return (
    <div className="w-full h-screen flex justify-center lg:flex-row py-5 lg:px-0 px-4 flex-col mt-5 gap-3 items-center text-white bg-black">
      <div className="bg-[#1d26435c] py-5 px-4 h-[75vh] lg:mt-0 mt-16 rounded-2xl w-full lg:w-[25vw]">
          <h1 className="text-white font-semibold text-center text-xl">MD Rehan</h1>
          <h1 className="text-xs text-[#9CA3AF] text-center mt-2 font-medium">rehanali@gmail.com</h1>
      </div>
      <div className="bg-black rounded-2xl border border-white border-opacity-20 h-[75vh] w-full lg:w-[45vw]">
        <div className="w-full border-b py-6 px-6 gap-2 flex flex-col border-white border-opacity-20">
         <div className="gap-2 flex items-center">
         <User />
         <span className="text-lg font-semibold">Profile</span>
         </div>
          <p className="text-xs text-[#9CA3AF] font-medium">This page shows you your profile and account details</p>
        </div>
        <div className="flex flex-col gap-5 px-6 py-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-medium">Username</h2>
            <p className="text-sm font-semibold text-[#9CA3AF]">John Doe</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-medium">Email</h2>
            <p className="text-sm font-semibold text-[#9CA3AF] ">johndoe@example.com</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="text-sm font-medium">Email Verified</h2>
            <p className="text-sm font-semibold px-3 py-1 bg-green-600 text-white rounded-full w-fit">
              Yes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
