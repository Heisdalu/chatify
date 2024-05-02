import Logo from "@/components/Logo/Logo";
import Wrapper from "@/components/Wrapper/Wrapper";
import Image from "next/image";

export default function Home() {
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

          <div className="mt-[1.2rem] h-[200px] w-[200px] mx-auto">
            <Image
              height={300}
              width={300}
              src="/humans_talking.svg"
              alt="home chatting with their phones"
            />
          </div>

          <div className="mt-[3rem] sm:flex sm:justify-center">
            <button className="space-x-[0.5rem] flex py-[1rem] w-[100%] rounded-[1rem] bg-[#000E08] text-[#fff] sm:max-w-[400px] justify-center items-center ">
              <span> Sign in with Google</span>
              <span>
                <Image
                  height={20}
                  width={20}
                  src="/google.png"
                  alt="google logo"
                />
              </span>
            </button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
