import { useState, useContext } from "react";
import Close from "../../../public/icons/Close";
import { ChatReplyingContext } from "@/context/ChatReplyingProvider";

const ReplyBox = () => {
  const { chatType, chatReplyStateHandler } = useContext(ChatReplyingContext);

  const exitReplyHandler = () => {
    chatReplyStateHandler({
      chatType: "none",
      replyContext: "",
      userReplyName: "",
    });
  };

  return (
    !(chatType === "none") && (
      <div className="bg-gray-200 w-[100%] flex items-center space-x-[0.5rem] pr-[0.3rem]">
        <div className=" border-red-400 border-l-[5px] bg-gray-100 p-[0.3rem] px-[0.5rem]">
          <h1 className="font-[600] text-[0.8rem]">Doubs</h1>
          <p className="line-clamp-1 text-[0.7rem]">
            {
              " i see the guy nah.. i been wan tell yo brh is doing okay now. i told her also. she will ge tbakc toyu bruh anytime is okay"
            }
          </p>
        </div>

        <button
          className="border-1 reduce_svg p-[0.3rem] rounded-[50%]"
          onClick={exitReplyHandler}
        >
          <Close />
        </button>
      </div>
    )
  );
};
export default ReplyBox;
