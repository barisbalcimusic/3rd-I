import { useEffect, useRef, useState } from "react";
import { useDataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { sendImage } from "../libs/sendImage";
import Webcam from "react-webcam";
import ClipLoader from "react-spinners/ClipLoader";

const Capture = () => {
  const [isCamReady, setIsCamReady] = useState(false);

  const {
    setAudioURL,
    setIsWaiting,
    isCaptured,
    setIsCaptured,
    isCamStarted,
    setIsCamStarted,
  } = useDataContext();

  const webcamRef = useRef(null);
  const navigate = useNavigate();

  // RESET STATES WHEN COMPONENT MOUNTS
  useEffect(() => {
    setIsCaptured(false);
    setAudioURL(null);
  }, []);

  // CAPTURE IMAGE WHEN SCREEN IS TAPPED
  useEffect(() => {
    if (isCaptured) {
      const imageSrc = webcamRef.current.getScreenshot();
      setIsWaiting(true);

      // SEND IMAGE TO SERVER
      sendImage(imageSrc)
        .then((data) => setAudioURL(data.audioUrl))
        .catch((err) => console.error(err))
        .finally(() => setIsWaiting(false));

      // //! TESTING PURPOSES
      // setAudioURL("/generated_audio.mp3");
      // setIsWaiting(false);

      setIsCamStarted(false);
      navigate("/");
    }
  }, [isCaptured]);

  return (
    <div
      id="container"
      className="w-screen h-screen bg-black flex justify-center items-center">
      <div
        id="screen"
        className="w-[375px] h-[667px] relative bg-gray-800  flex flex-col justify-center items-center"
        onClick={() => setIsCaptured(true)}>
        <div>
          {!isCamReady && (
            <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center bg-gray-800">
              <ClipLoader size={50} color="white" />
            </div>
          )}
          {isCamStarted && (
            <div className="flex justify-center items-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                onUserMedia={() => setIsCamReady(true)}
              />
              <p className="absolute bg-[rgba(0,0,0,0.4)] p-3 rounded-md text-gray-200 tracking-wider font-bold">
                Tap the screen to take a picture
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Capture;
