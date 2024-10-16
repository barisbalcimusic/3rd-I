import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useDataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { sendImage } from "../libs/sendImage";

const Capture = () => {
  const [isShooted, setIsShooted] = useState(false);
  const [camOpened, setCamOpened] = useState(false);

  const webcamRef = useRef(null);
  const { setAudioURL, setIsWaiting } = useDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    setCamOpened(true);
    setIsShooted(false);
    setAudioURL(null);
  }, []);

  useEffect(() => {
    if (isShooted) {
      const imageSrc = webcamRef.current.getScreenshot();
      setIsWaiting(true);

      // SEND IMAGE TO SERVER
      sendImage(imageSrc)
        .then((data) => setAudioURL(data.audioUrl))
        .catch((err) => console.error(err))
        .finally(() => setIsWaiting(false));

      // //! TESTING PURPOSES
      // setTimeout(() => {
      //   setAudioURL("test");
      //   setIsWaiting(false);
      // }, 5000);

      setCamOpened(false);
      navigate("/");
    }
  }, [isShooted]);

  return (
    <div
      id="container"
      className="w-screen h-screen bg-black flex justify-center items-center">
      <div
        id="screen"
        className="w-[375px] h-[667px] bg-blue-200 flex flex-col justify-center items-center"
        onClick={() => setIsShooted(true)}>
        <div>
          {camOpened && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Capture;
