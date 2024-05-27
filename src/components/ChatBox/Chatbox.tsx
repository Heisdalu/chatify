import { useState, useEffect, ChangeEvent, useRef, useCallback } from "react";
import Microphone from "../../../public/icons/Microphone";
import Picture from "../../../public/icons/Picture";
import AudioBox from "./AudioBox";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { AudioStateType, UserTypes } from "@/types";
import toast from "react-hot-toast";
import ImageBox from "./ImageBox";
import useSendMessage from "@/hooks/useSendMessage";

const Chatbox = ({
  email,
  participant,
  url,
}: {
  email: string;
  url: string;
  participant: { sender: UserTypes; receiver: UserTypes };
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [isAudioClicked, setIsAudioClicked] = useState(false);
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [isAudioPermitted, setIsAudioPermitted] =
    useState<AudioStateType>("idle");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [audioDuration, setAudioDuration] = useState<{
    status: "idle" | "send";
    value: number;
  }>({
    status: "idle",
    value: 0,
  });
  const { sendMessage } = useSendMessage();

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

  const audioDurationHandler = (data: {
    status: "idle" | "send";
    value: number;
  }) => {
    setAudioDuration(data);
  };

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
      // console.log(textAreaRef.current.value, email);

      sendMessage({
        url: url,
        email: email,
        message: textAreaRef.current?.value as string,
        messageType: "TEXT",
        participant: participant,
      });

      textAreaRef.current.value = "";

      return setIsTyping(false);
    }
  };

  const sendImageHandler = useCallback((imageBlob: Blob) => {
    // console.log(imageBlob);
    sendMessage({
      url: url,
      email: email,
      message: imageBlob,
      messageType: "PHOTO",
      participant: participant,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        // mozilla firefox does not support this navigator.permission
        // install platfrom for better usage
        if (navigator.userAgent.toLowerCase().includes("mozilla")) {
          setIsAudioPermitted("prompt");
        } else {
          toast.error("Error checking microphone permission");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  useEffect(() => {
    if (!recordingBlob || audioDuration.status === "idle") return;
    // console.log(recordingBlob, audioDuration);
    // send audio here
    sendMessage({
      url: url,
      email: email,
      message: recordingBlob,
      messageType: "AUDIO",
      participant: participant,
      audioDuration: `${audioDuration.value}`,
    });

    setAudioDuration({ status: "idle", value: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordingBlob]);

  return (
    <div className="bg-white p-[1rem] px-[0.5rem] max-w-[700px] fixed bottom-0 left-[50%] translate-x-[-50%] w-[100%]">
      <div className="relative flex flex-col">
        <div className="rounded-[10px] border-[1px] border-gray-300 chatbox">
          {isAudioClicked && controls.isRecording ? (
            <AudioBox
              toggleAudio={toggleAudio}
              controls={controls}
              audioDurationHandler={audioDurationHandler}
            />
          ) : isImageClicked ? (
            <ImageBox toggleImage={toggleImage} sendImage={sendImageHandler} />
          ) : (
            <div className="px-[0.5rem] flex items-center space-x-[1rem]">
              <textarea
                ref={textAreaRef}
                onChange={typingHandler}
                name=""
                className="resetFlowBite caret-black outline-none p-[7px] h-[45px] w-[100%] resize-none  placeholder:text-[1rem] placeholder:leading-[1.7rem] scroll scrollTextarea text-[1rem]"
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
      </div>
    </div>
  );
};
export default Chatbox;
