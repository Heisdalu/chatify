import { useEffect, useState, memo, ReactEventHandler } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import Play from "../../../public/icons/Play";
import Pause from "../../../public/icons/Pause";
import AudioProgress from "../AudioProgress/AudioProgress";
import { Spinner } from "flowbite-react";

interface audioStateType {
  loading: boolean;
  state: "idle" | "playing" | "paused";
  ready: boolean;
  error: boolean;
}

const AudioDisplay = () => {
  const [audioState, setAudioState] = useState<audioStateType>({
    loading: false,
    ready: false,
    state: "idle",
    error: false,
  });
  const [audioFile, setAudioFile] = useState<HTMLAudioElement | null>(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [rangeValue, setRangeValue] = useState(0);

  const getRangeValueHandler = (value: number) => {
    setRangeValue(value);
  };

  const startPlayingFunc = () => {
    if (!audioFile) return toast.error("Something went wrong. Try again");
    if (!audioFile.src) {
      //playing for the first time
      audioFile.src =
        "https://uljzszxyrxoupprqlucs.supabase.co/storage/v1/object/public/audios/test?t=2024-05-10T16%3A29%3A13.892Z";
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
      console.log(e);
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

  return (
    <div className="ml-auto">
      <div className="border-gray-200 border-[1px] ml-auto w-[240px] space-x-[0.5rem] reduce_svg flex border-1 items-center px-[0.5rem] py-[1rem] rounded-[5px]">
        {/* <Photo /> */}
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
        />
      </div>
    </div>
  );
};
export default memo(AudioDisplay);
