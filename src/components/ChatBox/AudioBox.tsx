import { FC, useCallback, useEffect, useState } from "react";
import Close from "../../../public/icons/Close";
import Play from "../../../public/icons/Play";
import Pause from "../../../public/icons/Pause";
import { useAudioRecorder } from "@sarafhbk/react-audio-recorder";
import { AudioStateType } from "@/types";

interface AudioBoxProps {
  toggleAudio: (state: boolean) => void;
}

const AudioBox: FC<AudioBoxProps> = ({ toggleAudio }) => {
  // playing immediately
  const [isPlaying, setIsPlaying] = useState(true);
  const { startRecording, status, errorMessage, stopRecording } =
    useAudioRecorder();
  console.log(status, errorMessage);

  //   const stopAudio = () => {
  //     recorderControls.stopRecording();
  //     console.log(
  //       recorderControls.recordingBlob,
  //       recorderControls.isRecording,
  //       recorderControls.recordingTime
  //     );
  //   };

  //   console.log(recorderControls.mediaRecorder);

  useEffect(() => {
    if (!errorMessage) {
      startRecording();
    } else {
      console.log("yessss");

      stopRecording();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <div>
      <div className="flex space-x-[1.3rem]">
        <button
          onClick={() => toggleAudio(false)}
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
          <div className="ml-auto">0:00</div>
        </div>
        <button className="ml-auto">Send</button>
        {/* <div>{recorderControls.recordingTime}</div> */}
        {/* <button onClick={stopAudio}>button</button> */}
      </div>
    </div>
  );
};
export default AudioBox;
