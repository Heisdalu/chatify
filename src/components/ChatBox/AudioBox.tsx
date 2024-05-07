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
    recordingBlob?: Blob | undefined;
    isRecording: boolean;
    isPaused: boolean;
    recordingTime: number;
    mediaRecorder?: MediaRecorder | undefined;
  };
}

const AudioBox: FC<AudioBoxProps> = ({ toggleAudio, controls }) => {
  const [scope, animate] = useAnimate();

  const stopAudio = () => {
    controls.stopRecording();
    controls.mediaRecorder?.stream.getAudioTracks()[0].stop();
    toggleAudio(false);
  };

  const pauseAudio = () => {
    controls.togglePauseResume();
    animate(
      scope.current,
      { width: "100%" },
      { duration: 60, ease: "linear" }
    ).stop();
  };

  const playAudio = () => {
    controls.togglePauseResume();
    // animateControls.;
    // scope.current, { width: "100%" }, { duration: 60, ease: "linear" }
    animate(
      scope.current,
      { width: "100%" },
      { duration: 60, ease: "linear" }
    ).play();
  };

  useEffect(() => {
    if (!controls.recordingBlob) return;
    console.log(controls.recordingBlob);
  }, [controls.recordingBlob]);

  useEffect(() => {
    // recording must not exceed 60 secs
    if (controls.recordingTime >= 60) {
      controls.stopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls.recordingTime]);

  // console.log(controls.isPaused, controls.isRecording);
  useEffect(() => {
    console.log(animate, scope);
    animate(scope.current, { width: "100%" }, { duration: 60, ease: "linear" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex space-x-[1.3rem]">
        <button
          onClick={stopAudio}
          className="flex items-center reduce_svg border-[1px] p-[5px] border-gray-300 rounded-[5px]"
        >
          <Close />
        </button>
        <div className="relative border-[1px] border-gray-300 px-[0.5rem] flex items-center rounded-[7px] h-[30px] w-[100%] bg-gray-00">
          <div
            ref={scope}
            // initial={{ width: 0 }}
            // animate={animateControls}
            // animate={{ width: "100%" }}
            // transition={{ duration: 60, ease: "linear" }}
            className={`absolute top-[0] z-[1] left-[0] h-[100%] w-[0] bg-gray-200`}
          ></div>
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
          <div className="ml-auto z-[2]">
            {convertSecToAudioTimeStamp(controls.recordingTime)}
          </div>
        </div>
        <button className="ml-auto">Send</button>
        {/* <div>{recorderControls.recordingTime}</div> */}
        {/* <button onClick={stopAudio}>button</button> */}
      </div>
    </div>
  );
};
export default AudioBox;
