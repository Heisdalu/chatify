import { FC, useCallback, useEffect, useState } from "react";
import Close from "../../../public/icons/Close";
import Play from "../../../public/icons/Play";
import Pause from "../../../public/icons/Pause";
import { convertSecToAudioTimeStamp, widthCalc } from "@/utlis";
import {
  animate,
  motion,
  useAnimationControls,
  useAnimate,
} from "framer-motion";

interface AudioBoxProps {
  toggleAudio: (state: boolean) => void;
  controls: {
    stopRecording: () => void;
    togglePauseResume: () => void;
    isRecording: boolean;
    isPaused: boolean;
    recordingTime: number;
    mediaRecorder?: MediaRecorder | undefined;
  };
}

const AudioBox: FC<AudioBoxProps> = ({ toggleAudio, controls }) => {
  const [scope, animate] = useAnimate();
  const [audioLimitExceeded, setAudioLimitExceeded] = useState(false);

  const stopAudio = () => {
    controls.stopRecording();
    // controls.mediaRecorder?.stream.getAudioTracks()[0].stop();
    toggleAudio(false);
  };

  const pauseAudio = () => {
    controls.togglePauseResume();
    animate(
      scope.current,
      { width: "100%" },
      { duration: 100, ease: "linear" }
    ).stop();
  };

  const playAudio = () => {
    controls.togglePauseResume();
    animate(
      scope.current,
      { width: "100%" },
      { duration: 100, ease: "linear" }
    ).play();
  };

  useEffect(() => {
    // recording must not exceed 60 secs
    if (controls.recordingTime >= 60) {
      controls.togglePauseResume();
      setAudioLimitExceeded(true);
      animate(
        scope.current,
        { width: "100%" },
        { duration: 100, ease: "linear" }
      ).stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls.recordingTime]);

  useEffect(() => {
    animate(scope.current, { width: "100%" }, { duration: 60, ease: "linear" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-[10px] border-gray-300 border-[1px] p-[0.5rem] py-[0.6rem]">
      <div className="flex space-x-[1.3rem]">
        <button
          onClick={stopAudio}
          className="flex items-center reduce_svg border-[1px] p-[5px] border-gray-300 rounded-[5px]"
        >
          <Close />
        </button>
        <div className="overflow-hidden relative border-[1px] border-gray-300 px-[0.5rem] flex items-center rounded-[7px] h-[30px] w-[100%] bg-gray-00">
          <div
            ref={scope}
            className={`absolute top-[0] z-[1] left-[0] h-[100%] w-[0] bg-gray-200`}
          ></div>
          {audioLimitExceeded ? (
            <div className="z-[2] text-[0.6rem] sm:text-[0.8rem]">
              Recorded. Audio Limit Exceeded
            </div>
          ) : (
            <div className="border-1 z-[2] p-[1px] flex items-center rounded-[50%]">
              {controls.isPaused ? (
                <button className="reduce_svg" onClick={playAudio}>
                  <Play />
                </button>
              ) : (
                <button className="reduce_svg" onClick={pauseAudio}>
                  <Pause />
                </button>
              )}
            </div>
          )}
          <div className="ml-auto z-[2]">
            {convertSecToAudioTimeStamp(controls.recordingTime)}
          </div>
        </div>
        <button
          className="ml-auto active:bg-blue-600 active:text-white rounded-[7px] px-[0.7rem] text-blue-600 flex items-center justify-center] text-[1rem]"
          onClick={stopAudio}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default AudioBox;