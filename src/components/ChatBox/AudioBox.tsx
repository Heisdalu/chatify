import { FC, useCallback, useEffect, useState } from "react";
import Close from "../../../public/icons/Close";
import Play from "../../../public/icons/Play";
import Pause from "../../../public/icons/Pause";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { AudioStateType } from "@/types";

interface AudioBoxProps {
  toggleAudio: (state: boolean) => void;
}

const AudioBox: FC<AudioBoxProps> = ({ toggleAudio }) => {
  // playing immediately
  const [isPlaying, setIsPlaying] = useState(true);
  const {
    startRecording,
    stopRecording,
    mediaRecorder,
    recordingBlob,
    recordingTime,
  } = useAudioRecorder();
  //   console.log(status, errorMessage);

  const stopAudio = () => {
    // toggleAudio(false)

    stopRecording();
    console.log(mediaRecorder?.stream);
    mediaRecorder?.stream.getAudioTracks()[0].stop();
  };

  //   console.log(recorderControls.mediaRecorder);
  console.log(isPlaying, recordingTime);

  useEffect(() => {
    startRecording();
    // } else {
    //   console.log("yessss");
    //   stopRecording();
    // }
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
