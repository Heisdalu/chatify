import { useState, useContext, useRef, useEffect, memo } from "react";
import Close from "../../../public/icons/Close";
import { ChatReplyingContext } from "@/context/ChatReplyingProvider";
import { useRouter } from "next/router";
import Microphone from "../../../public/icons/Microphone";
import { UserTypes } from "@/types";

const ReplyBox = ({
  email,
  sender,
  receiver,
}: {
  email: String;
  sender: UserTypes;
  receiver: UserTypes;
}) => {
  const { chatType, chatReplyStateHandler, replyContext, userReplyName } =
    useContext(ChatReplyingContext);
  const router = useRouter();

  const exitReplyHandler = () => {
    chatReplyStateHandler({
      chatType: "NONE",
      replyContext: "",
      userReplyName: "",
    });
  };

  // exit replyBox when routing to another page
  useEffect(() => {
    router.events.on("routeChangeStart", exitReplyHandler);

    return () => {
      // Cleanup function to remove event listener and exit replyBox
      router.events.off("routeChangeStart", exitReplyHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);
  return (
    !(chatType === "NONE") && (
      <div className="bg-gray-100 absolute top-[-44px] w-[100%] flex items-center pr-[0.3rem]">
        <div
          className={`${
            email === userReplyName
              ? "border-blue-400"
              : userReplyName === sender.email
              ? "border-red-400"
              : "border-red-400"
          } border-l-[5px] bg-gray-100 p-[0.3rem] px-[0.5rem]`}
        >
          <h1 className="font-[600] text-[0.8rem]">
            {email === userReplyName
              ? "You"
              : userReplyName === sender.email
              ? sender.displayName
              : receiver.displayName}
          </h1>
          <p className="line-clamp-1 text-[0.7rem]">
            {chatType === "AUDIO" ? (
              <span className="shallow flex items-center space-x-[0.3rem]">
                <span>
                  <Microphone />
                </span>
                <span>{"0:00"}</span>
              </span>
            ) : (
              replyContext
            )}
          </p>
        </div>

        <button
          className="border-1 reduce_svg p-[0.3rem] ml-auto rounded-[50%]"
          onClick={exitReplyHandler}
        >
          <Close />
        </button>
      </div>
    )
  );
};
export default memo(ReplyBox);
