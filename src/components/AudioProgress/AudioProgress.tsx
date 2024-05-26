import { ChangeEventHandler, useCallback, FC, useRef, useEffect } from "react";
import { RangeSlider } from "flowbite-react";
import toast from "react-hot-toast";
import { convertSecToAudioTimeStamp } from "@/utlis";

interface AudioProgressProps {
  currentTime: number;
  getRangeValueHandler: (value: number) => void;
  audioReady: boolean;
  maxDuration: number;
}

const AudioProgress: FC<AudioProgressProps> = ({
  currentTime,
  getRangeValueHandler,
  audioReady,
  maxDuration,
}) => {
  const rangeRef = useRef<HTMLInputElement | null>(null);

  const rangeChangehandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value || !rangeRef.current) return;

    const progress = (Number(e.target.value) / Number(e.target.max)) * 100;

    rangeRef.current.style.background = `linear-gradient(to right, #2563eb ${progress}%, #ccc ${progress}%)`;
    // })
  };

  const clickHandler = () => {
    if (!rangeRef.current || !rangeRef.current.value)
      return toast.error("Error occured. Kindly refresh browser");

    const changedTime = Number(
      ((Number(rangeRef.current.value) / 100) * maxDuration).toFixed(3)
    );
    console.log(rangeRef.current.value, changedTime);

    getRangeValueHandler(changedTime);
  };

  useEffect(() => {
    //16.139 replaces audio duration
    if (rangeRef.current) {
      const timeProgress = ((currentTime / maxDuration) * 100).toFixed(2);

      rangeRef.current.style.background = `linear-gradient(to right, #2563eb ${timeProgress}%, #ccc ${timeProgress}%)`;
      rangeRef.current.value = `${timeProgress}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  return (
    <>
      <div className="flex items-center translate-y-[-3px] w-[100%]">
        <RangeSlider
          ref={rangeRef}
          onClick={clickHandler}
          disabled={audioReady ? false : true}
          className="dalu_range w-[100%]"
          id="sm-range"
          onChange={rangeChangehandler}
          sizing="sm"
          min={0}
          max={100}
        />
      </div>

      <div className="text-[1rem]">
        {convertSecToAudioTimeStamp(maxDuration) || "0:00"
        }
      </div>
    </>
  );
};
export default AudioProgress;
