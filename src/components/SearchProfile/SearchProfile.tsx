import Close from "../../../public/icons/Close";
import { motion } from "framer-motion";
import SearchedUsers from "./SearchedUsers";

const SearchProfile = ({ close }: { close: any }) => {
  const exitHandler = () => {
    close();
  };

  return (
    <div className="fixed">
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="overflow-hidden rounded-[10px] w-[300px] sm:w-[400px] md:w-[500px] absolute z-[120] top-[5rem] left-[50%] translate-x-[5%] h-[350px] bg-white"
      >
        <div className="border-b-[1px] border-gray-200 flex justify-between p-[1rem] items-center">
          <h1 className="mx-auto font-[700]">New Message</h1>
          <button
            aria-label="exit modal"
            onClick={exitHandler}
            className="absolute right-[1rem] active:bg-gray-200"
          >
            <Close />
          </button>
        </div>
        <div className="flex border-b-[1px] border-gray-200 py-[0.5rem] px-[1rem] space-x-[1rem]">
          <label htmlFor="search" className="font-[600]">
            To:
          </label>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            id="search"
            autoComplete="off"
            className="w-full outline-none placeholder:text-[0.8rem] text-[0.9rem]"
          />
        </div>

        {/* <div className="p-[1rem]">
          <h1 className="text-[1rem] text-gray-500">No account found.</h1>
        </div> */}

        <div className="scroll h-[calc(350px-116px)] p-[1rem] px-[0.5rem] space-y-[0.5rem] overflow-y-scroll">
          <SearchedUsers />
          <SearchedUsers />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 0.3 }}
        onClick={exitHandler}
        className="cursor overlayModal fixed h-[100vh] w-[100%] left-0 top-[0] bg-black  z-[100]"
      ></motion.div>
    </div>
  );
};
export default SearchProfile;
