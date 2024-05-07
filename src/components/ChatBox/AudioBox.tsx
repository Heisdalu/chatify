import { FC, useCallback, useEffect, useState } from "react";
import Close from "../../../public/icons/Close";
import Play from "../../../public/icons/Play";
import Pause from "../../../public/icons/Pause";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { AudioStateType } from "@/types";
import { convertSecToAudioTimeStamp } from "@/utlis";

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

  console.log(controls.recordingTime);

  const stopAudio = () => {
    controls.stopRecording();
    controls.mediaRecorder?.stream.getAudioTracks()[0].stop();
    toggleAudio(false);
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

  return (
    <div>
      <div className="flex space-x-[1.3rem]">
        <button
          onClick={stopAudio}
          className="flex items-center reduce_svg border-[1px] p-[5px] border-gray-300 rounded-[5px]"
        >
          <Close />
        </button>
        <div className="border-[1px] border-gray-300 px-[0.5rem] flex items-center rounded-[7px] h-[30px] w-[100%] bg-gray-00">
          <div className="border-1 p-[1px] flex items-center rounded-[50%]">
            {/* <button className="reduce_svg">
              <Play />
            </button> */}
            <button className="reduce_svg">
              <Pause />
            </button>
          </div>
          <div className="ml-auto">
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
