import { ChatReplyingContext } from "@/context/ChatReplyingProvider";
import { Messages } from "@/types";
import { PanInfo, motion, useMotionValue } from "framer-motion";
import { ReactNode, useContext, FC } from "react";

interface Props {
  children: ReactNode;
  className: string;
  deactivateDrag: "x" | undefined;
  item?: Omit<Messages, "seenAt">;
}

const DragComponent: FC<Props> = ({
  children,
  className,
  deactivateDrag = "x",
  item,
}) => {
  const x = useMotionValue(0);
  const { chatReplyStateHandler } = useContext(ChatReplyingContext);

  // console.log(item, "drag");

  const dragEndFunc = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // console.log(e, info);
    if (x.get() >= 30) {
      console.log("show message replying UI");
      chatReplyStateHandler({
        chatType: item?.msgType || "NONE",
        //@ts-ignore
        replyContext:
          item?.msgType === "AUDIO"
            ? (item.audioDuration as string) || '0:00'
            : item?.msgType === "TEXT"
            ? item.msgContext
            : "",
        userReplyName: `${item?.msgSenderId}` || "",
      });
    }
  };

  const dragFunc = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    //reset position
    if (info.offset.x <= 0) {
      x.set(0);
    }
  };

  return (
    <motion.div
      onDragEnd={dragEndFunc}
      style={{ x }}
      drag={deactivateDrag}
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={dragFunc}
      whileTap={{ cursor: "grabbing" }}
      whileHover={{ cursor: "grab" }}
      dragElastic={0.7}
      className={className}
    >
      {children}
    </motion.div>
  );
};
export default DragComponent;
