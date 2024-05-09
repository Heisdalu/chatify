import { RangeSlider } from "flowbite-react";

const AudioProgress = () => {
  const l = 1;

  return (
    <>
      <div className="flex items-center translate-y-[-2px]">
        <RangeSlider id="sm-range" sizing="sm" />
      </div>

      <div className="text-[1rem]">1:00</div>
    </>
  );
};
export default AudioProgress;
