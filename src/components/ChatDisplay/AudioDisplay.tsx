import { useEffect, useState, memo } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import Play from "../../../public/icons/Play";
import Pause from "../../../public/icons/Pause";
import AudioProgress from "../AudioProgress/AudioProgress";

const AudioDisplay = () => {
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioFile, setAudioFile] = useState<HTMLAudioElement | null>(null);
  const lol = () => {
    if (!audioFile) return;
    if (!audioFile.src) {
      audioFile.src =
        "https://res.cloudinary.com/dfusdfpfh/raw/upload/v1715217126/chatify/chatify_audios/6dc1cda83e4f7a45c055a5609_r5jp3e.mp3";
    }
  };

  useEffect(() => {
    const audio = new Audio();
    setAudioFile(audio);
  }, []);

  useEffect(() => {
    const errorFunc = () => {
      toast.error("Failed to play audio. Check your Internet connection");
    };

    const playThroughFunc = () => {
      console.log("can play through");
      setCanPlayAudio(true);
      audioFile?.play();
    };

    audioFile?.addEventListener("error", errorFunc);
    audioFile?.addEventListener("canplaythrough", playThroughFunc);

    return () => {
      audioFile?.removeEventListener("error", errorFunc);
      audioFile?.removeEventListener("canplaythrough", errorFunc);
    };
  }, [audioFile]);

  console.log(audioFile);

  return (
    <div className="ml-auto">
      <div
        // onClick={lol}
        className="border-gray-200 border-[1px] ml-auto w-[200px] space-x-[0.5rem] reduce_svg flex border-1 items-center px-[0.5rem] py-[1rem] rounded-[5px]"
      >
        {/* <Photo /> */}
        <div className="pl-[0.5rem] flex items-center border-1">
          <button className="dalu_audio_svg">
            <Loading color="#000" />
          </button>
          {/* <div className="border-1">
          <Play />
        </div>
        <div className="border-1">
          <Pause />
        </div> */}
        </div>

        <AudioProgress />
      </div>
    </div>
  );
};
export default memo(AudioDisplay);
