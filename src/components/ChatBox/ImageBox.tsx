import { ChangeEventHandler, useCallback, useRef, useState, memo } from "react";
import Close from "../../../public/icons/Close";
import toast from "react-hot-toast";

const ImageBox = ({
  toggleImage,
}: {
  toggleImage: (state: boolean) => void;
}) => {
  const picRef = useRef<HTMLInputElement | null>(null);

  const [picFile, setPicFile] = useState<File | null>(null);
  const accessPhotos = useCallback((img: HTMLInputElement) => {
    if (!img) return;
    picRef.current = img;
    img.click();
  }, []);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const pic = e.target.files;

    if (!pic || !pic[0].type.includes("image")) {
      return toast.error("Kindly select an image");
    }
    if (pic && pic[0]) {
      console.log(pic[0]);

      setPicFile(pic[0]);
    }
  };

  const photoHandler = () => {
    console.log(picRef);
    picRef.current?.click();
  };

  const sendImageToServer = () => {
    console.log("senttt to server");
    toggleImage(false);
  };

  return (
    <div className="space-x-[1rem] overflow-hidden relative flex rounded-[10px] border-gray-300 border-[1px] p-[0.5rem] py-[0.6rem]">
      <button
        onClick={() => toggleImage(false)}
        className="flex items-center reduce_svg border-[1px] p-[5px] border-gray-300 rounded-[5px]"
      >
        <Close />
      </button>
      <input
        type="file"
        onChange={changeHandler}
        accept="image/*"
        className="absolute top-[-100%] right-[0] bg-red-500 appearance-none"
        ref={accessPhotos}
      />
      <button
        onClick={photoHandler}
        className="hover:bg-gray-200 active:bg-gray-500 px-[0.5rem] flex items-center border-[1px] border-gray-300 justify-center] rounded-[5px] text-[0.7rem] md:text-[1rem]"
      >
        Change Photo
      </button>

      <div className="text-[0.7rem] md:text-[1rem] flex items-center rounded-[5px]">
        {picFile?.name ? picFile.name : "No Image Selected"}
      </div>
      <button
        disabled={!!picFile?.name ? false : true}
        className={`disabled:text-gray-100 !ml-auto active:bg-blue-600 active:text-white rounded-[7px] px-[0.7rem] text-blue-600 flex items-center justify-center] text-[1rem] ${
          picFile?.name ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        onClick={sendImageToServer}
      >
        Send
      </button>
    </div>
  );
};
export default memo(ImageBox);
