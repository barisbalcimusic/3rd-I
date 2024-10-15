import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useImageContext } from "../contexts/ImageContext";

const Capture = () => {
  const webcamRef = useRef(null);
  const { imgSrc, setImgSrc } = useImageContext();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} />}
    </>
  );
};

export default Capture;
