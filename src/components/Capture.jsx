import { useRef, useState } from "react";
import { useDataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { sendImage } from "../libs/sendImage";
import Webcam from "react-webcam";
import ClipLoader from "react-spinners/ClipLoader";

const Capture = () => {
  const [isCamReady, setIsCamReady] = useState(false);

  const { setAudioURL, setIsCaptured, setIsWaiting } = useDataContext();

  const webcamRef = useRef(null);
  const navigate = useNavigate();

  // CAPTURE IMAGE WHEN SCREEN IS TAPPED
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setIsCaptured(true);
    setIsWaiting(true);

    // SEND IMAGE TO SERVER
    sendImage(imageSrc)
      .then((data) => {
        setAudioURL(data.audioUrl);
      })
      .catch((err) => {
        setIsCaptured(false);
        console.error(err);
      })
      .finally(() => setIsWaiting(false));

    // //! ONLY FOR TESTING PURPOSES
    // setAudioURL("/generated_audio.mp3");

    navigate("/");
  };

  return (
    <div
      id="container"
      className="w-screen h-screen bg-black flex justify-center items-center">
      <div
        id="screen"
        className="w-full h-full md:w-[375px] md:h-[667px] relative bg-gray-800  flex flex-col justify-center items-center"
        onClick={handleCapture}>
        <div>
          {!isCamReady && (
            <div className="w-full h-full absolute top-0 left-0 z-10 flex flex-col justify-center items-center gap-[1vw] bg-gray-800 text-white font-bold">
              <p>Camera starting...</p>
              <ClipLoader size={50} color="white" />
            </div>
          )}
          (
          <div className="flex justify-center items-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              onUserMedia={() => setIsCamReady(true)}
              // videoConstraints={{
              //   facingMode: { exact: "environment" },
              // }}
            />
            <p className="absolute bg-[rgba(0,0,0,0.4)] p-3 rounded-md text-gray-200 tracking-wider font-bold">
              Tap the screen to take a picture
            </p>
          </div>
          )
        </div>
      </div>
    </div>
  );
};

export default Capture;
