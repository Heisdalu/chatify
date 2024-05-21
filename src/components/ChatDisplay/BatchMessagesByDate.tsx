import { Messages } from "@/types";
import SenderChat from "./SenderChat";
import AudioDisplay from "./AudioDisplay";
import { Key } from "react";
import ReceiverChat from "./ReceiverChat";
import ImageDisplay from "./ImageDisplay";
import ReceiverAudioDisplay from "./ReceiverAudioDisplay";
import ReceiverImageDisplay from "./ReceiverImageDisplay";

const Transform = (data: Messages, email: string) => {
  if (data.msgSenderId === email) {
    if (data.msgType === "TEXT") return <SenderChat key={data.id as Key} />;
    if (data.msgType === "AUDIO") return <AudioDisplay key={data.id as Key} />;
    if (data.msgType === "PHOTO") return <ImageDisplay key={data.id as Key} />;
    return;
  } else {
    if (data.msgType === "TEXT") return <ReceiverChat key={data.id as Key} />;
    if (data.msgType === "AUDIO")
      return <ReceiverAudioDisplay key={data.id as Key} />;
    if (data.msgType === "PHOTO")
      return <ReceiverImageDisplay key={data.id as Key} />;
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
  console.log(data);
  //email === item.email... type
  return (
    <>
      {data.map((item) => Transform(item, `${email}`))}
      {/* <SenderChat /> */}
      {/* <SenderChat /> */}
      <AudioDisplay />
    </>
  );
};
export default BatchMessagesByDate;
