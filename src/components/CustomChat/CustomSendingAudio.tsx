import { useEffect, useState, memo, ReactEventHandler } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import Play from "../../../public/icons/Play";
import Pause from "../../../public/icons/Pause";
import AudioProgress from "../AudioProgress/AudioProgress";
import { Spinner } from "flowbite-react";
import { Messages } from "@/types";
import ChatDeliveryStatus from "../ChatDisplay/ChatDeliveryStatus";
import { useMutation } from "@tanstack/react-query";
import { fetcherPost } from "@/utlis/fetcher";
import useCustomMutation from "@/hooks/useCustomMutation";

interface audioStateType {
  loading: boolean;
  state: "idle" | "playing" | "paused";
  ready: boolean;
  error: boolean;
}

const CustomAudioDisplay = ({ item }: { item: Messages }) => {
  const formData = new FormData();
  //@ts-ignore
  formData.append("file", item.msgContext);
  formData.append("senderId", item.msgSenderId as string);
  formData.append("receiverId", item.msgReceiverId as string);
  formData.append("type", item.msgType as string);
  formData.append("duration", item.audioDuration as string);
  formData.append("sentAt", item.sentAt as string);
  // mutation.mutate(formData);

  const [audioState, setAudioState] = useState<audioStateType>({
    loading: false,
    ready: false,
    state: "idle",
    error: false,
  });
  const [audioFile, setAudioFile] = useState<HTMLAudioElement | null>(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [rangeValue, setRangeValue] = useState(0);

  const { error, mutation, resend } = useCustomMutation({
    ...item,
    data: formData,
  });

  // console.log(item, mutation);

  const getRangeValueHandler = (value: number) => {
    setRangeValue(value);
  };

  const startPlayingFunc = () => {
    //@ts-ignore
    const url = URL.createObjectURL(item.msgContext);
    // console.log(url);

    if (!audioFile) return toast.error("Something went wrong. Try again");
    if (!audioFile.src) {
      //playing for the first time
      audioFile.src = url;
      return setAudioState((prev) => ({
        ...prev,
        loading: true,
      }));
    }

    if (audioFile.src) {
      //it has been fetched and played before... therefore play again
      return audioFile.play();
    }
  };

  const pausedAudioFunc = () => {
    if (!audioFile) return toast.error("Something went wrong. Try again");
    audioFile.pause();
  };

  useEffect(() => {
    const audio = new Audio();
    setAudioFile(audio);
  }, []);

  useEffect(() => {
    const errorFunc = (e: ErrorEvent) => {
      // console.log(e);
      toast.error("Failed to play audio. Check your Internet connection");
      setAudioState((prev) => ({
        ...prev,
        loading: false,
        error: true,
      }));
    };

    const playThroughFunc = () => {
      // ready to play without any issue
      if (!audioFile) return toast("Cannot play audio. Kindly refresh Browser");
      // console.dir(audioFile);

      audioFile.play().catch((e) => {
        console.log(e);
      });
      setAudioState((prev) => ({
        ...prev,
        loading: false,
        error: false,
        ready: true,
      }));
    };

    const timeUpdateHandler = (e: Event) => {
      if (!e.target || !(e.target instanceof HTMLAudioElement))
        return toast.error("Error");

      setAudioCurrentTime(e.target.currentTime);
    };

    const endedAudioHandler = () => {
      if (!audioFile) return toast("Cannot play audio. Kindly refresh Browser");
      setAudioState((prev) => ({
        ...prev,
        loading: false,
        state: "idle",
      }));
    };

    const playAudioHandler = () => {
      if (!audioFile) return toast("Cannot play audio. Kindly refresh Browser");
      setAudioState((prev) => ({
        ...prev,
        loading: false,
        error: false,
        state: "playing",
      }));
    };

    const pauseAudioHandler = () => {
      if (!audioFile) return toast("Cannot play audio. Kindly refresh Browser");
      setAudioState((prev) => ({
        ...prev,
        loading: false,
        error: false,
        state: "paused",
      }));
    };

    audioFile?.addEventListener("error", errorFunc);
    audioFile?.addEventListener("loadedmetadata", playThroughFunc);
    audioFile?.addEventListener("timeupdate", timeUpdateHandler);
    audioFile?.addEventListener("ended", endedAudioHandler);
    audioFile?.addEventListener("play", playAudioHandler);
    audioFile?.addEventListener("pause", pauseAudioHandler);

    return () => {
      audioFile?.removeEventListener("error", errorFunc);
      audioFile?.removeEventListener("loadedmetadata", playThroughFunc);
      audioFile?.removeEventListener("timeupdate", timeUpdateHandler);
      audioFile?.removeEventListener("ended", endedAudioHandler);
      audioFile?.removeEventListener("play", playAudioHandler);
      audioFile?.removeEventListener("pause", pauseAudioHandler);
    };
  }, [audioFile]);

  useEffect(() => {
    if (audioFile) {
      audioFile.currentTime = rangeValue;
    }
  }, [audioFile, rangeValue]);

  // console.log("gggg");

  return (
    <div
      // onClick={click}
      className="border-gray-200 border-[1px] ml-auto  w-[240px] px-[0.5rem] py-[0.5rem] pt-[1rem] rounded-[5px] md:w-[300px] flex flex-col space-y-[0.5rem] justify-center "
    >
      <div className="reduce_svg flex items-center space-x-[0.5rem]">
        <div className="flex items-center">
          {audioState.loading && (
            <button className="h-[20px] w-[20px] ">
              <Spinner aria-label="Small spinner example" size="sm" />
            </button>
          )}
          {!audioState.loading &&
            (audioState.state === "idle" || audioState.state === "paused") && (
              <button className="dalu_audio_svg" onClick={startPlayingFunc}>
                <Play />
              </button>
            )}
          {!audioState.loading && audioState.state === "playing" && (
            <button className="dalu_audio_svg" onClick={pausedAudioFunc}>
              <Pause />
            </button>
          )}
        </div>

        <AudioProgress
          currentTime={audioCurrentTime}
          getRangeValueHandler={getRangeValueHandler}
          audioReady={audioState.ready}
          maxDuration={Number(item.audioDuration || 0)}
        />
      </div>
      <ChatDeliveryStatus
        isSeen={item.isSeen}
        sentTimestamp={item.sentAt}
        loading={item.loading}
      />

      {(mutation.isError || error) && (
        <button
          onClick={() => resend()}
          className="text-[0.6rem] ml-auto text-red-500 border-[1px] border-red-500 rounded-[5px] px-[1rem]"
        >
          Retry
        </button>
      )}
    </div>
  );
};
export default memo(CustomAudioDisplay);
