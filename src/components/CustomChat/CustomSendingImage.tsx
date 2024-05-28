//TODO: bgu--- send the date also to backend when you send an audio first...
// cehck same for text tooimport { useState } from "react";
import Photo from "../../../public/icons/Photo";
import { motion } from "framer-motion";
import Overlay from "../Overlay/Overlay";
import Close from "../../../public/icons/Close";
import Image from "next/image";
import { Messages } from "@/types";
import ChatDeliveryStatus from "../ChatDisplay/ChatDeliveryStatus";
import { useMemo, useState } from "react";
import useCustomMutation from "@/hooks/useCustomMutation";

const CustomSendingImage = ({ item }: { item: Messages }) => {
  const formData = new FormData();
  //@ts-ignore
  formData.append("file", item.msgContext);
  formData.append("senderId", item.msgSenderId as string);
  formData.append("receiverId", item.msgReceiverId as string);
  formData.append("type", item.msgType as string);
  formData.append("sentAt", item.sentAt as string);

  const { error, mutation, resend } = useCustomMutation({
    ...item,
    data: formData,
  });

  const [isImageDisplayed, setIsImageDisplayed] = useState(false);

  // console.log(item);

  //@ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const url = useMemo(() => URL.createObjectURL(item.msgContext), []);

  // console.log(url);

  const exitImagePreview = () => {
    setIsImageDisplayed(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        <button
          onClick={() => setIsImageDisplayed(true)}
          className="border-gray-200 hover:bg-gray-200 active:bg-gray-300 border-[1px] ml-auto w-[100px] flex flex-col p-[0.5rem] pb-[0.2rem] rounded-[5px]"
        >
          <div className="space-x-[0.5rem] flex items-center reduce_svg">
            <Photo />
            <h1 className="font-[600]">Photo</h1>
          </div>
          {/* <div>baller</div> */}
          <div className="ml-auto">
            <ChatDeliveryStatus
              isSeen={item.isSeen}
              sentTimestamp={item.sentAt}
              loading={item.loading}
            />
          </div>
        </button>

        {(mutation.isError || error) && (
          <button
            onClick={() => resend()}
            className="text-[0.6rem] ml-auto text-red-500 border-[1px] border-red-500 rounded-[5px] px-[1rem]"
          >
            Retry
          </button>
        )}
      </div>

      {isImageDisplayed && (
        <div>
          <div className="fixed flex space-y-[0.5rem] flex-col items-center h-[100px] w-[300px] bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[110]">
            <button
              onClick={exitImagePreview}
              className="ml-auto bg-gray-100 rounded-[5px]"
            >
              <Close />
            </button>

            <div>
              <Image
                height={300}
                width={300}
                // onLoad={loadHandler}
                className="z-[160] bg-gray-100 rounded-[5px] overflow-hidden"
                src={url}
                alt="home chatting with their phones"
              />
            </div>
          </div>
          <Overlay onClick={exitImagePreview} />
        </div>
      )}
    </div>
  );
};
export default CustomSendingImage;
