import Image from "next/image";
import LeftArrow from "../../../../public/icons/LeftArrow";
import ChatDisplay from "@/components/ChatDisplay/ChatDisplay";
import "@/styles/style.module.css";
import { useWindowSize } from "@uidotdev/usehooks";
import Link from "next/link";
import Information from "../../../../public/icons/Information";
import ChatLoading from "@/components/ChatDisplay/ChatLoading";
import { useContext } from "react";
import { ChatReplyingContext } from "@/context/ChatReplyingProvider";
import DirectChatLayout from "@/components/Layouts/DirectChatLayout";
import Authenticated from "@/components/Wrapper/Authenticated";

const UserDirectChatID = () => {
  const { height } = useWindowSize();
  const { chatType } = useContext(ChatReplyingContext);
  //   return <ChatLoading />; // loading state

  return (
    <Authenticated>
      <DirectChatLayout>
        {" "}
        <div className="h-[100vh] [max-height:-webkit-fill-available] overflow-hidden py-[1rem] max-w-[700px] mx-auto lg:py-[1rem] relative">
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
          {/* 170 // when replay box is not on*/}
          <div
            style={{
              height: `${
                typeof height === "number" && chatType === "none"
                  ? `${height - 170}px`
                  : chatType !== "none" && typeof height === "number"
                  ? `${height - 210}px`
                  : "700px"
              }`,
            }}
            className={`scroll overflow-y-scroll overflow-x-hidden py-[1rem] relative`}
          >
            <ChatDisplay />
          </div>
        </div>
      </DirectChatLayout>
    </Authenticated>
  );
};

export default UserDirectChatID;
