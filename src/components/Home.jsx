import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import eyeImg from "../assets/eye.png";
import RingLoader from "react-spinners/RingLoader";

const localhost = import.meta.env.VITE_LOCALHOST;

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioURL, setAudioURL, isCaptured, setIsCaptured, isWaiting } =
    useDataContext();
  const responseAudioRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    // PAUSE RESPONSE AUDIO WHEN PLAYING
    if (isPlaying) {
      responseAudioRef.current.pause();
      setIsPlaying(false);
      setAudioURL(null);
      return;
    }
    // PLAY RESPONSE AUDIO WHEN AUDIOURL IS SET AND SHOW THE AUDIO ICON
    if (audioURL) {
      setIsCaptured(false);
      responseAudioRef.current.play();
      return;
    }
    navigate("/capture");
  };

  return (
    <div
      id="container"
      className="w-screen h-screen bg-black flex justify-center items-center relative">
      <h1 className="text-[7vw] text-white absolute top-0 z-10 top-[75vh]">
        {isPlaying
          ? "Tap to stop the audio"
          : audioURL
          ? "Tap to play the answer"
          : !isWaiting
          ? "Tap to start"
          : null}
      </h1>

      <div
        id="screen"
        className={
          "w-[375px] h-[667px] relative bg-gray-800 flex flex-col justify-center items-center"
        }>
        {!isWaiting ? (
          // SHOW THE EYE IMAGE AS BUTTON WHEN NOT WAITING
          <div
            className="w-[80%] relative flex flex-col justify-center items-center"
            onClick={handleClick}>
            <img
              className={`rounded-full ${
                isPlaying
                  ? "bg-green-400"
                  : isCaptured
                  ? "bg-yellow-200"
                  : "bg-gray-200"
              }`}
              src={eyeImg}
              alt="eye-image-as-button"
            />

            <audio
              ref={responseAudioRef}
              src={`${localhost}/${audioURL}`}
              onPlay={() => setIsPlaying(true)}
              onEnded={() => {
                setIsPlaying(false);
                setAudioURL(null);
              }}
            />

            {isPlaying && (
              <FontAwesomeIcon
                className="text-5xl text-white absolute"
                icon={faVolumeHigh}
              />
            )}
          </div>
        ) : (
          // SHOW THE LOADER IF THERE IS A CURRENT PROCESSING
          <div className="w-full p-5 bg-[rgba(255,255,255,0.7)] absolute flex flex-col justify-center items-center">
            <p className="w-full font-bold text-lg text-center text-black">
              Processing
            </p>
            <RingLoader size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
