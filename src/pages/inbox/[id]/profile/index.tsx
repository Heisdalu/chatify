import Loading from "@/components/Loading/Loading";
import Logo from "@/components/Logo/Logo";
import Wrapper from "@/components/Wrapper/Wrapper";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  return (
    <div>
      <Wrapper>
        <h1 className="text-[1.1rem] font-[600] flex items-center space-x-[0.5rem]">
          <Logo />
          <span>Chatify</span>
        </h1>
        <div className="space-y-[1rem] mt-[1rem] py-[2rem] max-w-[500px] mx-auto md:space-y-[1.3rem]">
          <Link
            href="/inbox/1234"
            className="text-[1rem] text-black rounded-[10px] border-[1px] border-gray-200 px-[1rem] py-[0.5rem] active:bg-black active:text-white active:border-black"
          >
            Back
          </Link>
          <h1 className="flex justify-center text-[1.2rem] font-[700]">
            @dhevine100
          </h1>
          <div className="space-y-[1rem] md:space-y-[1.5rem]">
            <div className="flex justify-center">
              <Image
                className="border-[1px] border-gray-200 rounded-[5px]"
                height={150}
                width={150}
                src="/humans_talking.svg"
                alt=""
              />
            </div>
            <div className="flex flex-col space-y-[0.5rem]">
              <h1 className="font-[600] truncate-[0.1px] text-[0.875rem] md:text-[1rem]">
                Your Display Name
              </h1>
              <p className="rounded-[10px] p-[0.5rem] bg-gray-200 cursor-not-allowed">
                dhevine__070
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
                nihil tempore dolorum temporibus recusandae ad impedit et illum
                blanditiis! Provident excepturi minima fugit vel velit dolores
                ratione aut rem rerum.
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
export default Profile;
