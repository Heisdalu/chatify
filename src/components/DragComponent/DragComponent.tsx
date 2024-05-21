import { ChatReplyingContext } from "@/context/ChatReplyingProvider";
import { PanInfo, motion, useMotionValue } from "framer-motion";
import { MouseEventHandler, ReactNode, useContext, FC } from "react";

interface Props {
  children: ReactNode;
  className: string;
}

const DragComponent: FC<Props> = ({ children, className }) => {
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
    //reset position
    if (info.offset.x <= 0) {
      x.set(0);
    }
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
      dragElastic={0.7}
      className={className}
    >
      {children}
    </motion.div>
  );
};
export default DragComponent;
