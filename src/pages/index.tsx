import Logo from "@/components/Logo/Logo";
import Wrapper from "@/components/Wrapper/Wrapper";
import Image from "next/image";
import { SyntheticEvent, useEffect, useState } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utlis/fetcher";
import toast from "react-hot-toast";

export default function Home() {
  const { status } = useSession();
  const [isClicked, setClicked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { status: reactQueryStatus, error } = useQuery({
    queryKey: ["user_available"],
    queryFn: () => fetcher("api/userAvailable"),
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
  const router = useRouter();

  const loadHandler = (e: SyntheticEvent<HTMLImageElement>) => {
    // console.log(e.target.classList);
    //@ts-ignore
    e.target?.classList.remove("animate-pulse");
    //@ts-ignore
    e.target?.classList.remove("bg-gray-200");
  };

  const clickFunc = () => {
    signIn("google");
    setClicked(true);
  };

  useEffect(() => {
    if (status === "authenticated" && reactQueryStatus !== "error") {
      setIsAuthenticated(true);
      toast.success("Authenticated. Redirecting user. Please wait...", {
        duration: 5000,
      });
    }

    if (
      reactQueryStatus === "error" &&
      //@ts-ignore
      error?.message.toLowerCase() === "empty bio data"
    ) {
      console.log("yessss");

      router.push("/user_info");
    }
    if (
      reactQueryStatus === "error" &&
      //@ts-ignore
      error?.message.includes("Invalid `prisma.user.findFirst()")
    ) {
      toast.error(
        "Redirecting failed. No/Slow Intenet connection. Refresh again"
      );
    }
    if (reactQueryStatus === "success") {
      router.push("/inbox");
      // router.push("/user_info");
    }

    console.log(error);
  }, [status, router, reactQueryStatus, error]);

  return (
    <div>
      <Wrapper>
        <div className="">
          <div className="flex justify-center">
            <h1 className="text-[1.1rem] font-[600] flex items-center space-x-[0.5rem]">
              <Logo />
              <span>Chatify</span>
            </h1>
          </div>
          <h1 className=" flex flex-col mt-[3rem] space-y-[0.1rem] sm:text-center">
            <span className="text-[2rem]">Connect friends</span>
            <span className="font-[700] text-[2.5rem]">easily & quickly </span>
          </h1>

          <p className="text-[1.1rem] mt-[0.5rem] flex flex-col sm:text-center sm:mt-[1rem]">
            <span>Our chat app is a perfect way to stay</span>
            <span>connected with friends and family</span>
          </p>

          <div
            className="mt-[1.2rem] h-[200px] w-[200px] mx-auto"
            onClick={() => signOut()}
          >
            <Image
              height={300}
              width={300}
              onLoad={loadHandler}
              src="/humans_talking.svg"
              alt="home chatting with their phones"
              className="bg-gray-200 animate-pulse"
              priority={true}
            />
          </div>

          <div className="mt-[3rem] sm:flex sm:justify-center">
            <button
              onClick={clickFunc}
              disabled={status === "loading" || isAuthenticated ? true : false}
              className="space-x-[0.5rem] flex py-[1rem] w-[100%] rounded-[1rem] bg-[#000E08] text-[#fff] sm:max-w-[400px] justify-center items-center disabled:opacity-[0.5] disabled:cursor-not-allowed"
            >
              <span> Sign in with Google</span>
              <span>
                <Image
                  height={20}
                  width={20}
                  src="/google.png"
                  alt="google logo"
                />
              </span>

              {isClicked && (
                <div>
                  <span className="block ml-[10px]">
                    <Loading />
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
