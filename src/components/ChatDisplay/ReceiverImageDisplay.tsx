import { SyntheticEvent, useState } from "react";
import Photo from "../../../public/icons/Photo";
import Overlay from "../Overlay/Overlay";
import Close from "../../../public/icons/Close";
import Image from "next/image";
import { Messages } from "@/types";
import ChatDeliveryStatus from "./ChatDeliveryStatus";
import useVisiblity from "@/hooks/useVisiblity";

const ReceiverImageDisplay = ({ item }: { item: Messages }) => {
  const { activateMutate } = useVisiblity({
    id: item.id as number,
    isSeen: item.isSeen as boolean,
  });

  const [isImageDisplayed, setIsImageDisplayed] = useState(false);

  const exitImagePreview = () => {
    setIsImageDisplayed(false);
  };

  const loadHandler = (e: SyntheticEvent<HTMLImageElement>) => {
    // console.log(e.target.classList);
    //@ts-ignore
    e.target?.classList.remove("animate-pulse");
    //@ts-ignore
    e.target?.classList.remove("bg-gray-100");
  };

  const photoClicked = () => {
    setIsImageDisplayed(true);
    activateMutate();
  };

  return (
    <div className="">
      <button
        onClick={photoClicked}
        className="border-gray-200 hover:bg-gray-200 active:bg-gray-300  border-1 p-[0.5rem] pb-[0.2rem] rounded-[5px] space-y-[0.5rem]"
      >
        <div className="space-x-[0.5rem] reduce_svg flex items-center">
          <Photo />
          <h1 className="font-[600]">Photo</h1>
        </div>
        <div className="ml-auto">
          <ChatDeliveryStatus
            isSeen={item.isSeen}
            sentTimestamp={item.sentAt}
            turnOff={true}
          />
        </div>
      </button>

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
                onLoad={loadHandler}
                className="z-[160] bg-gray-100 animate-pulse rounded-[5px] overflow-hidden"
                src={item.msgContext as string}
                alt=""
              />
            </div>
          </div>
          <Overlay onClick={exitImagePreview} />
        </div>
      )}
    </div>
  );
};
export default ReceiverImageDisplay;
