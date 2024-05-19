import Loading from "@/components/Loading/Loading";
import Logo from "@/components/Logo/Logo";
import Authenticated from "@/components/Wrapper/Authenticated";
import Wrapper from "@/components/Wrapper/Wrapper";
import { fetcher, fetcherPost } from "@/utlis/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import BlackDone from "../../../public/icons/BlackDone";
import Failed from "../../../public/icons/Failed";
import Image from "next/image";
import toast from "react-hot-toast";

const UserInfo = () => {
  const { data } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const displayNameRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLTextAreaElement | null>(null);
  const [isBioValid, setIsBioValid] = useState<"idle" | "valid" | "invalid">(
    "idle"
  );
  const {
    status,
    error,
    isFetching,
    data: queryData,
    ...other
  } = useQuery({
    queryKey: ["search_unique_display_name", query],
    queryFn: () =>
      fetcher(`api/add_new_user/validate_display_name?name=${query}`),
    enabled: !!query,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: (data: { name: string; bio: string; date:string }) =>
      fetcherPost("/api/add_new_user", data),
    onSuccess(data, variables, context) {
      toast.success("Account created");
      router.push("/inbox");
    },
    onError(error, variables, context) {
      if (error.message.toLowerCase().includes("account registered already")) {
        toast.error("Account existing already");
        router.push("/inbox");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  const name = data?.user?.name?.split(" ")[0] as string | null;

  let timer: NodeJS.Timeout;
  const displayNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setQuery(e.target.value);
    }, 1000);
  };

  const bioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (
      e.target.value.trim().length === 0 ||
      e.target.value.trim().length > 40
    ) {
      return setIsBioValid("invalid");
    }

    return setIsBioValid("valid");
  };

  const submitData = () => {
    if (!displayNameRef.current || !bioRef.current) return;

    mutation.mutate({
      name: displayNameRef.current.value,
      bio: bioRef.current.value,
      date: new Date().toISOString(),
    });
  };

  // console.log(
  //   status === "success" &&
  //     displayNameRef.current?.value &&
  //     bioRef.current?.value &&
  //     isBioValid === "valid"
  // );

  return (
    <Authenticated>
      <div>
        <Wrapper>
          <h1 className="text-[1.1rem] font-[600] flex items-center space-x-[0.5rem]">
            <Logo />
            <span>Chatify</span>
          </h1>
          <div className="space-y-[1rem] mt-[1rem] py-[2rem] max-w-[500px] mx-auto md:space-y-[1.3rem]">
            <h1 className="flex flex-col space-y-[0.5rem] items-center justify-center text-[1.125rem] font-[500]">
              <div className="rounded-[50%] h-[100px] w-[100px] bg-gray-100 overflow-hidden">
                {data?.user && data.user?.image && (
                  <Image
                    height={100}
                    width={100}
                    src={data.user.image}
                    alt="lol"
                  />
                )}
              </div>
              <div> Welcome, {name ? name : "to Chatify"} </div>
            </h1>

            <form className="space-y-[1rem] md:space-y-[1.5rem]">
              <div className="flex flex-col space-y-[0.5rem]">
                <label
                  htmlFor="display_name"
                  className="font-[500] truncate-[0.1px] text-[0.875rem] md:text-[1rem]"
                >
                  Your Display Name
                </label>
                <div className="flex items-center space-x-[1rem] rounded-[5px] overflow-hidden border-1 border-[#CDD1D0] pr-[0.5rem] focus:bg-red-600">
                  <input
                    onChange={displayNameChange}
                    ref={displayNameRef}
                    placeholder="display name must be unique"
                    type="text"
                    autoComplete="off"
                    className="caret-black w-full py-[0.5rem] px-[0.3rem] userReset focus:outline-none focus:border-b-black !focus:border-b-[2px]"
                    name="display_name"
                    id="display_name"
                  />
                  {isFetching ? (
                    <Spinner />
                  ) : status === "success" ? (
                    <BlackDone />
                  ) : (
                    ""
                  )}
                  {(error || other.isPaused) && <Failed />}
                </div>
                {(error || other.isPaused) && (
                  <div className="text-[0.7rem] text-red-500">
                    {error?.message ||
                      "Failed to Fetch. No/Slow internet connection"}
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-[0.5rem]">
                <label
                  htmlFor="bio"
                  className="font-[500] truncate-[0.1px] text-[0.875rem] md:text-[1rem]"
                >
                  Your Bio
                </label>
                <textarea
                  autoComplete="off"
                  onChange={bioChange}
                  ref={bioRef}
                  name="bio"
                  className="userTextReset rounded-[5px] caret-black border-1 border-[#CDD1D0] py-[0.5rem] px-[0.3rem] focus:outline-black"
                  id=""
                  cols={30}
                  rows={5}
                ></textarea>
                {isBioValid === "invalid" && (
                  <div className="text-[0.7rem] text-red-500">
                    maximum of 40 characters
                  </div>
                )}
              </div>
            </form>
            <div>
              <button
                onClick={submitData}
                disabled={
                  status === "success" &&
                  !mutation.isPending &&
                  displayNameRef.current?.value &&
                  bioRef.current?.value &&
                  isBioValid === "valid"
                    ? false
                    : true
                }
                className="space-x-[0.8rem] flex py-[1rem] w-[100%] rounded-[1rem] bg-[#000E08] text-[#fff] justify-center items-center disabled:opacity-[0.5] disabled:cursor-not-allowed "
              >
                <span>Submit</span>
                {mutation.isPending && !mutation.isPaused && (
                  <span>
                    <Loading />
                  </span>
                )}
              </button>
            </div>
          </div>
        </Wrapper>
      </div>
    </Authenticated>
  );
};
export default UserInfo;
