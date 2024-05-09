import { useEffect, useState } from "react";

const AudioDisplay = () => {
  const [url, setUrl] = useState("");
  const lol = () => {
    setUrl(
      "https://res.cloudinary.com/dfusdfpfh/video/upload/v1715215686/chatify/chatify_audios/6dc1cda83e4f7a45c055a5607_cfvanv.mp3"
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
