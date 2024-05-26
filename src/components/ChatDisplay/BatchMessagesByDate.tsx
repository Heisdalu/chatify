import { Messages } from "@/types";
import SenderChat from "./SenderChat";
import AudioDisplay from "./AudioDisplay";
import { Key } from "react";
import ReceiverChat from "./ReceiverChat";
import ImageDisplay from "./ImageDisplay";
import ReceiverAudioDisplay from "./ReceiverAudioDisplay";
import ReceiverImageDisplay from "./ReceiverImageDisplay";
import CustomSendingChat from "../CustomChat/CustomSendingChat";
import CustomSendingAudio from "../CustomChat/CustomSendingAudio";

const Transform = (data: Messages, email: string) => {
  if (data.msgSenderId === email && data?.loading) {
    if (data.msgType === "TEXT") {
      // console.log("inn");
      return <CustomSendingChat item={data} key={data.id as Key} />;
    }
    if (data.msgType === "AUDIO") {
      // console.log("inn");
      return <CustomSendingAudio item={data} key={data.id as Key} />;
    }
    return;
  }

  if (data.msgSenderId === email && !data?.loading) {
    if (data.msgType === "TEXT")
      return <SenderChat item={data} key={data.id as Key} />;
    if (data.msgType === "AUDIO")
      return <AudioDisplay item={data} key={data.id as Key} />;
    if (data.msgType === "PHOTO")
      return <ImageDisplay item={data} key={data.id as Key} />;
    return;
  }

  if (data.msgSenderId !== email && !data?.loading) {
    if (data.msgType === "TEXT")
      return <ReceiverChat item={data} key={data.id as Key} />;
    if (data.msgType === "AUDIO")
      return <ReceiverAudioDisplay item={data} key={data.id as Key} />;
    if (data.msgType === "PHOTO")
      return <ReceiverImageDisplay item={data} key={data.id as Key} />;
    return;
  }
};

const BatchMessagesByDate = ({
  data,
  email,
}: {
  data: Messages[];
  email: String;
}) => {
  // console.log(data);
  //email === item.email... type
  return <>{data.map((item) => Transform(item, `${email}`))}</>;
};
export default BatchMessagesByDate;
