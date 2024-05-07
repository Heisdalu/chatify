import { useState, useEffect, ChangeEvent, useRef, RefObject } from "react";
import Microphone from "../../../public/icons/Microphone";
import Picture from "../../../public/icons/Picture";
import AudioBox from "./AudioBox";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { AudioStateType } from "@/types";
import toast from "react-hot-toast";
import ImageBox from "./ImageBox";

const Chatbox = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isAudioClicked, setIsAudioClicked] = useState(false);
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [isAudioPermitted, setIsAudioPermitted] =
    useState<AudioStateType>("idle");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { startRecording, recordingBlob, ...controls } = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => {
      console.log(err);
      //when micrphone prompt is blocked
      toast.error("Microphone permisson denied");
    }
  );

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

  const toggleImage = (state: boolean) => {
    setIsImageClicked(state);
  };

  const microphoneHandler = () => {
    if (isAudioPermitted === "granted" || isAudioPermitted === "prompt") {
      setIsAudioClicked(true);
      startRecording();
    }

    // when micrphone access is denied
    if (isAudioPermitted === "denied") {
      toast.error("Mic permisson denied. Turn on mic");
    }
  };

  useEffect(() => {
    navigator.permissions
      //@ts-ignore
      .query({ name: "microphone" })
      .then((permissionStatus) => {
        // permissionStatus returns state of the microphone
        // granted -- ready to use
        // prompt -- mic prompt opened to either grant or deny permission
        // denied ---- not ready to use due to permission of mic denied

        if (permissionStatus.state === "denied") {
          setIsAudioPermitted("denied");
        }
        // audio is recording and status is denied
        if (permissionStatus.state === "denied" && controls.isRecording) {
          controls.stopRecording();
        }
        if (permissionStatus.state === "prompt") {
          setIsAudioPermitted("prompt");
        }
        if (permissionStatus.state === "granted") {
          setIsAudioPermitted("granted");
        }
      })
      .catch(() => {
        toast.error("Error checking microphone permission");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  useEffect(() => {
    if (!recordingBlob) return;
    console.log(recordingBlob, controls.recordingTime);
  }, [controls.recordingTime, recordingBlob]);

  return (
    <div className="bg-white p-[1rem] px-[0.5rem] max-w-[700px] fixed bottom-0 left-[50%] translate-x-[-50%] w-[100%]">
      {isAudioClicked && controls.isRecording ? (
        <AudioBox toggleAudio={toggleAudio} controls={controls} />
      ) : isImageClicked ? (
        <ImageBox toggleImage={toggleImage} />
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
                onClick={microphoneHandler}
                className="hover:bg-gray-200 active:bg-gray-500 px-[0.5rem] h-[30px] w-[30px flex items-center justify-center] rounded-[5px]"
              >
                <Microphone />
              </button>
            </div>
          )}
          {!isTyping && (
            <div className="">
              <button
                onClick={() => setIsImageClicked(true)}
                className="hover:bg-gray-200 active:bg-gray-500 px-[0.5rem] h-[30px] flex items-center justify-center] rounded-[5px]"
              >
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
