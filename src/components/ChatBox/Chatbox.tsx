import { useState, useEffect, ChangeEvent, useRef, RefObject } from "react";
import Microphone from "../../../public/icons/Microphone";
import Picture from "../../../public/icons/Picture";
import AudioBox from "./AudioBox";
import { AudioStateType } from "@/types";

const Chatbox = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isAudioClicked, setIsAudioClicked] = useState(false);
  const [isAudioPermitted, setIsAudioPermitted] = useState("idle");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const typingHandler = (e: ChangeEvent) => {
    if (
      textAreaRef.current?.value &&
      textAreaRef.current.value.trim().length > 0
    ) {
      return setIsTyping(true);
    }

    return setIsTyping(false);
  };

  const sendHandler = () => {
    if (
      textAreaRef.current?.value &&
      textAreaRef.current.value.trim().length > 0
    ) {
      textAreaRef.current.value = "";
      return setIsTyping(false);
    }
  };

  const toggleAudio = (state: boolean) => {
    setIsAudioClicked(state);
  };

  useEffect(() => {
    navigator.permissions
      //@ts-ignore
      .query({ name: "microphone" })
      .then((permissionStatus) => {
        console.log("Permission status:", permissionStatus.state);
        // permissionStatus returns state of the microphone
        // granted -- ready to use
        // denied ---- not ready to use due to permission of mic denied

        if (permissionStatus.state === "denied") {
          setIsAudioPermitted("denied");
        }
        if (permissionStatus.state === "granted") {
          setIsAudioPermitted("granted");
        }
      })
      .catch((error) => {
        console.error("Error checking microphone permission:", error);
      });
  });

  useEffect(() => {
    if (isAudioClicked && isAudioPermitted === "denied") {
      console.log("yessss");
    }
  }, [isAudioPermitted, isAudioClicked]);

  return (
    <div className="bg-white p-[1rem] px-[0.5rem] max-w-[700px] fixed bottom-0 left-[50%] translate-x-[-50%] w-[100%]">
      {isAudioClicked && isAudioPermitted === "granted" ? (
        <div className="rounded-[10px] border-gray-300 border-[1px] p-[0.5rem] py-[0.6rem]">
          <AudioBox toggleAudio={toggleAudio} />
        </div>
      ) : (
        <div className="px-[0.5rem] flex items-center rounded-[10px] border-[1px] border-gray-300 space-x-[1rem]">
          <textarea
            ref={textAreaRef}
            onChange={typingHandler}
            name=""
            className="outline-none p-[7px] h-[45px] w-[100%] resize-none placeholder:[vertical-align:middle]"
            id=""
            placeholder="Write your message..."
          ></textarea>

          {!isTyping && (
            <div className="">
              <button
                onClick={() => setIsAudioClicked(true)}
                className="hover:bg-gray-200 active:bg-gray-500 px-[0.5rem] h-[30px] w-[30px flex items-center justify-center] rounded-[5px]"
              >
                <Microphone />
              </button>
            </div>
          )}
          {!isTyping && (
            <div className="">
              <button className="hover:bg-gray-200 active:bg-gray-500 px-[0.5rem] h-[30px] w-[30px flex items-center justify-center] rounded-[5px]">
                <Picture />
              </button>
            </div>
          )}
          {isTyping && (
            <div className="">
              <button
                onClick={sendHandler}
                className="active:bg-blue-600 active:text-white rounded-[7px] px-[0.7rem] text-blue-600 flex items-center justify-center] text-[1rem]"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Chatbox;
