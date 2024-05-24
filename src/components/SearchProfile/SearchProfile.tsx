import Close from "../../../public/icons/Close";
import { motion } from "framer-motion";
import SearchedUsers from "./SearchedUsers";
import InboxUserLoading from "../Loading/InboxUserLoading";
import Overlay from "../Overlay/Overlay";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utlis/fetcher";
import { ChangeEvent, useState } from "react";
import { SearchUserTypes } from "@/types";

const SearchProfile = ({ close, email }: { close: any; email: string }) => {
  const [name, setName] = useState("");

  const {
    isLoading,
    isSuccess,
    data: result,
    isError,
    ...other
  } = useQuery<SearchUserTypes>({
    queryKey: ["search_user", name],
    queryFn: () => fetcher(`/api/search_user?name=${name}`),
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: 10 * 1000,
    enabled: !!name,
  });

  const exitHandler = () => {
    close();
  };

  let timer: NodeJS.Timeout;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setName(e.target.value);
    }, 1000);
  };

  // console.log(name, isLoading, isSuccess, result, isError, other);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ opacity: 1 }}
        className="overflow-hidden rounded-[10px] w-[300px] sm:w-[400px] md:w-[500px] fixed z-[120] top-[150px] left-[50%] translate-x-[-50%] h-[350px] bg-white"
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
        <div className="flex border-b-[1px] items-center border-gray-200 py-[0.5rem] px-[1rem] space-x-[1rem]">
          <label htmlFor="search" className="font-[600]">
            To:
          </label>
          <input
            onChange={changeHandler}
            type="text"
            name="search"
            placeholder="Search..."
            id="search"
            autoComplete="off"
            className="resetFlowBite caret-black w-full outline-none placeholder:text-[0.8rem] text-[1rem]"
          />
        </div>

        <div className="scroll h-[calc(350px-116px)] p-[1rem] px-[0.5rem] space-y-[0.5rem] overflow-y-scroll">
          {isLoading && (
            <div className="px-[0.5rem]">
              <InboxUserLoading />
              <InboxUserLoading />
            </div>
          )}

          {isSuccess &&
            (result.data?.length > 0 ? (
              result.data.map((item) => (
                <SearchedUsers key={item.id} email={email} item={item} />
              ))
            ) : (
              <div className="px-[1rem]">
                <h1 className="text-[1rem] text-gray-500">No account found.</h1>
              </div>
            ))}

          {isError && (
            <div className="px-[1rem]">
              <h1 className="text-[1rem] text-gray-500">
                {other.error?.message || "Somethig went wrong"}
              </h1>
            </div>
          )}
          {name === "" && (
            <div className="px-[1rem]">
              <h1 className="text-[1rem] text-gray-500">Search friends and chat</h1>
            </div>
          )}
        </div>
      </motion.div>
      <Overlay onClick={exitHandler} />
    </>
  );
};
export default SearchProfile;
