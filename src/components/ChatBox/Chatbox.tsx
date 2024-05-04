import { useState, useEffect, ChangeEvent } from "react";
import Microphone from "../../../public/icons/Microphone";
import Picture from "../../../public/icons/Picture";

const Chatbox = () => {
  const [isClient, setIsClient] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const typingHandler = (e: ChangeEvent) => {
    // setIsTyping(true);
    //   console.log(e.target.value);
    //@ts-ignore
    if (e.target.value?.trim().length > 0) {
      return setIsTyping(true);
    }

    return setIsTyping(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-white p-[1rem] px-[0.5rem] max-w-[700px] fixed bottom-0 left-[50%] translate-x-[-50%] w-[100%]">
      <div className="px-[0.5rem] flex items-center rounded-[10px] border-[1px] border-gray-300 space-x-[1rem]">
        <textarea
          onChange={typingHandler}
          name=""
          className="outline-none p-[5px] h-[35px] w-[100%] resize-none placeholder:[vertical-align:middle]"
          id=""
          placeholder="Write your message..."
        ></textarea>

        {!isTyping && (
          <div className="">
            <button className="h-[30px] w-[30px flex items-center justify-center]">
              <Microphone />
            </button>
          </div>
        )}
        {!isTyping && (
          <div className="">
            <button className="h-[30px] w-[30px flex items-center justify-center]">
              <Picture />
            </button>
          </div>
        )}
        {isTyping && (
          <div className="">
            <button className="active:bg-blue-600 active:text-white rounded-[7px] px-[0.5rem] text-blue-600 flex items-center justify-center] text-[1rem]">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Chatbox;
