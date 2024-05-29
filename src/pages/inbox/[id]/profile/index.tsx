import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import Loading from "@/components/Loading/Loading";
import Logo from "@/components/Logo/Logo";
import Authenticated from "@/components/Wrapper/Authenticated";
import Wrapper from "@/components/Wrapper/Wrapper";
import { profileTypes } from "@/types";
import { fetcher } from "@/utlis/fetcher";
import { useQuery } from "@tanstack/react-query";
import { error } from "console";
import { Spinner } from "flowbite-react";
import { fetchData } from "next-auth/client/_utils";
import Image from "next/image";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const {
    isPending,
    isLoading,
    isSuccess,
    isError,
    isPaused,
    isFetching,
    data: result,
    ...other
  } = useQuery<profileTypes>({
    queryKey: ["profile", router.query?.name],
    queryFn: () => fetcher(`/api/user_profile?name=${router.query.name}`),
    enabled: !!router.query?.name,
    staleTime: 100 * 1000,
  });

  const goback = () => {
    router.back();
  };

  return (
    <Authenticated>
      <div>
        <Wrapper>
          <h1 className="text-[1.1rem] font-[600] flex items-center space-x-[0.5rem]">
            <Logo />
            <span>Chatify</span>
          </h1>

          {isLoading && (
            <div className="flex justify-center items-center h-[300px]">
              <Spinner size="xl" />
            </div>
          )}
          {isSuccess && (
            <div className="space-y-[1rem] mt-[1rem] py-[2rem] max-w-[500px] mx-auto md:space-y-[1.3rem]">
              <button
                onClick={goback}
                className="text-[1rem] text-black rounded-[10px] border-[1px] border-gray-200 px-[1rem] py-[0.5rem] active:bg-black active:text-white active:border-black"
              >
                Back
              </button>
              <h1 className="flex justify-center text-[1.2rem] font-[700]">
                {result.data.displayName}
              </h1>
              <div className="space-y-[1rem] md:space-y-[1.5rem]">
                <div className="flex justify-center">
                  <Image
                    className="border-[1px] border-gray-200 rounded-[5px]"
                    height={150}
                    width={150}
                    src={result.data.profileImageUrl}
                    alt=""
                  />
                </div>
                <div className="flex flex-col space-y-[0.5rem]">
                  <h1 className="font-[600] truncate-[0.1px] text-[0.875rem] md:text-[1rem]">
                    Your Display Name
                  </h1>
                  <p className="rounded-[10px] p-[0.5rem] bg-gray-200 cursor-not-allowed">
                    {result.data.displayName}
                  </p>
                </div>
                <div className="flex flex-col space-y-[0.5rem]">
                  <label
                    htmlFor="bio"
                    className="font-[600] truncate-[0.1px] text-[0.875rem] md:text-[1rem]"
                  >
                    Your Bio
                  </label>
                  <p className="border-1 border-[#CDD1D0] py-[0.5rem] px-[0.3rem] rounded-[10px]">
                    {result.data.bio}
                  </p>
                </div>
              </div>
            </div>
          )}
          {isError && (
            <div>
              <ErrorDisplay
                message={other.error?.message}
                refetch={other.refetch}
              />
            </div>
          )}
        </Wrapper>
      </div>
    </Authenticated>
  );
};
export default Profile;
