import { Messages } from "@/types";
import { FC } from "react";
import Photo from "../../../public/icons/Photo";
import Microphone from "../../../public/icons/Microphone";
import { convertSecToAudioTimeStamp } from "@/utlis";

type Props = Omit<
  Messages,
  "parentMsgContext" | "parentMsgId" | "parentMsgType" | "seenAt" | "sentAt"
>;

const LastMessage: FC<{ result: Props }> = ({ result }) => {
  return (
    <>
      {result.msgType === "TEXT" ? (
        result.msgContext
      ) : result.msgType === "PHOTO" ? (
        <div className="flex items-center reduce_svg space-x-[0.3rem]">
          <Photo />
          <div>Photo</div>
        </div>
      ) : result.msgType === "AUDIO" ? (
        <div className="flex items-center reduce_svg space-x-[0.3rem]">
          <Microphone />
          <div>
            {convertSecToAudioTimeStamp(Number(result.audioDuration)) || "0:00"}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default LastMessage;
