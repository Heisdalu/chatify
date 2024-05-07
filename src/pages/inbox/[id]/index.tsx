import Image from "next/image";
import LeftArrow from "../../../../public/icons/LeftArrow";
import ChatDisplay from "@/components/ChatDisplay/ChatDisplay";
import "@/styles/style.module.css";
import { useWindowSize } from "@uidotdev/usehooks";
import Link from "next/link";
import Information from "../../../../public/icons/Information";
import ChatLoading from "@/components/ChatDisplay/ChatLoading";

const UserDirectChatID = () => {
  const { height } = useWindowSize();
  //   return <ChatLoading />; // loading state

  return (
    <div className="h-[100vh] overflow-hidden py-[1rem] max-w-[700px] mx-auto lg:py-[1rem] relative">
      <div className="sticky top-[0] bg-white px-[1rem] border-b-[1px] border-b-gray-200 py-[0.5rem] flex items-center space-x-[1rem] ">
        <Link
          href="/inbox"
          className="rounded-[10px] hover:bg-gray-200 p-[0.5rem] active:border-gray-300 active:border-[1px]"
          aria-label="Go back"
        >
          <span aria-hidden={true}>
            <LeftArrow />
          </span>
        </Link>
        <div>
          <Image
            height={60}
            width={60}
            alt=""
            src="/humans_talking.svg"
            className="rounded-full border-[1px] border-gray-200"
          />
        </div>
        <h1 className="text-[1.3rem] font-[600]">dhe_vine</h1>

        <div
          className=" ml-[auto] flex items-center"
          style={{ marginLeft: "auto" }}
          title="user profile"
        >
          <Link href="/inbox/135768/profile" className="active:bg-gray-400">
            <Information />
          </Link>
        </div>
      </div>

      <div
        style={{
          height: `${
            typeof height === "number" ? `${height - 170}px` : "700px"
          }`,
        }}
        className={`scroll overflow-y-scroll py-[1rem] relative`}
      >
        <ChatDisplay />
      </div>
    </div>
  );
};

export default UserDirectChatID;
