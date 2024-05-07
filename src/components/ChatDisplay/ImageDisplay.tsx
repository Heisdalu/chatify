import { useState } from "react";
import Photo from "../../../public/icons/Photo";
import { motion } from "framer-motion";
import Overlay from "../Overlay/Overlay";
import Close from "../../../public/icons/Close";
import Image from "next/image";

const ImageDisplay = () => {
  const [isImageDisplayed, setIsImageDisplayed] = useState(false);

  const exitImagePreview = () => {
    setIsImageDisplayed(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsImageDisplayed(true)}
        className="border-gray-200 hover:bg-gray-200 active:bg-gray-300 border-[1px] ml-auto w-[100px] space-x-[0.5rem] reduce_svg flex border-1 items-center p-[0.5rem] rounded-[5px]"
      >
        <Photo />
        <h1 className="font-[600]">Photo</h1>
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
                // onLoad={loadHandler}
                className="z-[160] bg-gray-100 rounded-[5px] overflow-hidden"
                src="/humans_talking.svg"
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
export default ImageDisplay;
