import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import eyeImg from "../assets/eye.png";
import RingLoader from "react-spinners/RingLoader";
import cameraStarted from "../data/camera-started.mp3";
import photoCaptured from "../data/photo-captured.mp3";

const localhost = import.meta.env.VITE_LOCALHOST;

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { audioURL, isWaiting, isCaptured, isCamStarted, setIsCamStarted } =
    useDataContext();

  const responseAudioRef = useRef(null);
  const startFeedbackRef = useRef(null);
  const capturedFeedbackRef = useRef(null);

  const navigate = useNavigate();

  // PLAY FEEDBACK AUDIO WHEN CAMERA IS STARTED AND NAVIGATE TO CAPTURE PAGE
  useEffect(() => {
    if (isCamStarted) {
      startFeedbackRef.current.play();
      setTimeout(() => {
        navigate("/capture");
      }, 1500);
    }
  }, [isCamStarted]);

  // PLAY RESPONSE AUDIO WHEN AUDIOURL IS SET AND SHOW THE AUDIO ICON
  useEffect(() => {
    if (audioURL) {
      setIsPlaying(true);
      responseAudioRef.current.play();
    }
  }, [audioURL]);

  // PLAY FEEDBACK AUDIO WHEN IMAGE IS CAPTURED
  useEffect(() => {
    if (isCaptured) {
      // capturedFeedbackRef.current.play();
    }
  }, [isCaptured]);

  return (
    <div
      id="container"
      className="w-screen h-screen bg-black flex justify-center items-center"
      onClick={() => setIsCamStarted(true)}>
      <div
        id="screen"
        className={
          "w-[375px] h-[667px] relative bg-gray-800 flex flex-col justify-center items-center"
        }>
        {!isWaiting ? (
          // SHOW THE BUTTON IF THERE IS NO CURRENT PROCESSING
          <div className="w-[80%] relative flex flex-col justify-center items-center">
            <img
              className={`rounded-full ${
                isCamStarted
                  ? "bg-green-200"
                  : isPlaying
                  ? "bg-red-200"
                  : "bg-gray-200"
              }`}
              src={eyeImg}
              alt="eye-image-as-button"
            />
            <audio
              ref={responseAudioRef}
              src={`${localhost}/${audioURL}`}
              onPlay={() => setIsPlaying(true)}
              onEnded={() => setIsPlaying(false)}
            />
            <audio ref={startFeedbackRef} src={cameraStarted} />
            <audio ref={capturedFeedbackRef} src={photoCaptured} />
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
