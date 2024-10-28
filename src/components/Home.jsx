import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import eyeImg from "../assets/eye.png";
import RingLoader from "react-spinners/RingLoader";

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
      className="w-screen h-screen bg-black flex justify-center items-center">
      <div
        id="screen"
        className={
          "w-full h-full tabletAndDesktop:w-[375px] md:h-[667px] relative bg-gray-800 flex flex-col justify-center items-center"
        }>
        {!isWaiting ? (
          // SHOW THE EYE IMAGE AS BUTTON WHEN NOT WAITING
          <div
            className="w-[80%] relative flex flex-col justify-center items-center hover:cursor-pointer"
            onClick={handleClick}>
            <img
              className={`rounded-full ${
                isPlaying
                  ? "bg-green-400"
                  : isCaptured
                  ? "bg-yellow-200"
                  : "bg-gray-200 hover:bg-white"
              }`}
              src={eyeImg}
              alt="eye-image-as-button"
            />

            <div className="h-[15%] absolute bg-[rgba(255,255,255,0.8)] rounded-md px-[5%] text-[150%] flex items-center justify-center pointer-events-none z-20">
              <p className="text-[6vw] tabletAndDesktop:text-[25px]">
                {isPlaying
                  ? "Tap to stop the audio"
                  : audioURL
                  ? "Tap to play the answer"
                  : !isWaiting
                  ? "Tap to start"
                  : null}
              </p>
            </div>

            {isPlaying && (
              <FontAwesomeIcon
                className="text-5xl text-white absolute"
                icon={faVolumeHigh}
              />
            )}

            <audio
              ref={responseAudioRef}
              src={audioURL || ""}
              onPlay={() => setIsPlaying(true)}
              onEnded={() => {
                setIsPlaying(false);
                setAudioURL(null);
              }}
            />
          </div>
        ) : (
          // SHOW THE LOADER IF THERE IS A CURRENT PROCESSING
          <div className="w-full p-5 bg-gray-200 absolute flex flex-col justify-center items-center">
            <p className="w-full font-bold text-lg text-center text-black">
              Processing...
            </p>
            <RingLoader size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
