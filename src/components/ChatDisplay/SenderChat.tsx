import { MouseEventHandler, useContext } from "react";
import ChatDeliveryStatus from "./ChatDeliveryStatus";
import { PanInfo, motion, useMotionValue } from "framer-motion";
import { ChatReplyingContext } from "@/context/ChatReplyingProvider";

const SenderChat = () => {
  const x = useMotionValue(0);
  const { chatReplyStateHandler } = useContext(ChatReplyingContext);

  // console.log(ctx);

  const dragEndFunc = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // console.log(e, info);
    if (x.get() >= 30) {
      console.log("show message replying UI");
      chatReplyStateHandler({
        chatType: "text",
        replyContext: "Hello",
        userReplyName: "divnie",
      });
    }
  };

  const dragFunc = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // console.log(e, info);
    // console.log();
    //reset position
    if (info.offset.x <= 0) {
      x.set(0);
    }
  };

  const tapFunc: MouseEventHandler<HTMLDivElement> = (e) => {
    console.log(e);
  };

  return (
    <motion.div
      onDragEnd={dragEndFunc}
      style={{ x }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={dragFunc}
      whileTap={{ cursor: "grabbing" }}
      whileHover={{ cursor: "grab" }}
      dragElastic={0.5}
      onClick={tapFunc}
      className="p-[0.5rem] rounded-[10px] leading-[1.3rem] ml-auto inline-block border-gray-200 border-[1px] w-auto max-w-[200px] [word-break:break-word] space-y-[5px] md:max-w-[300px]"
    >
      <div className=" space-y-[0.3rem] rounded-[5px] border-red-400 border-l-[5px] bg-gray-100 p-[0.3rem] px-[0.5rem]">
        <h1 className="font-[600]">Doubs</h1>
        <p className="line-clamp-2 text-[0.8rem] leading-[0.9rem]">
          {
            " i see the guy nah.. i been wan tell yo brh is doing okay now. i told her also. she will ge tbakc toyu bruh anytime is okay"
          }
        </p>
      </div>
      <p className="text-[0.9rem]"> helly is a boy now..i saw him yerterday</p>

      <ChatDeliveryStatus />
    </motion.div>
  );
};
export default SenderChat;
