import { useEffect, useState } from "react";

const AudioDisplay = () => {
  const [url, setUrl] = useState("");
  const lol = () => {
    setUrl(
      "https://res.cloudinary.com/dfusdfpfh/video/upload/v1715166737/chatify/audio_cigt0e.webm"
    );
  };

  useEffect(() => {
    const audio = new Audio();
    console.dir("dddd", audio);

    if (url) {
      audio.src = url;
      console.log("g", audio);
      audio.play();
    }
  }, [url]);

  return (
    <div className="ml-auto">
      <div onClick={lol}>audio</div>
    </div>
  );
};
export default AudioDisplay;
