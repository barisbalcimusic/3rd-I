import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import eyeImg from "../assets/eye.png";
import soundImg from "../assets/sound.png";
import RingLoader from "react-spinners/RingLoader";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioURL, isWaiting } = useDataContext();
  const audioRef = useRef(null);

  const localhost = import.meta.env.VITE_LOCALHOST;

  useEffect(() => {
    if (audioURL) {
      audioRef.current.play();
    }
  }, [audioURL]);

  return (
    <div
      id="container"
      className="w-screen h-screen bg-black flex justify-center items-center">
      <div
        id="screen"
        className="w-[375px] h-[667px] relative bg-blue-200 flex flex-col justify-center items-center">
        {!isWaiting ? (
          <div className="flex flex-col justify-center items-center">
            <Link to={"/capture"} className="w-[80%]">
              <img
                className="rounded-full hover:shadow-[0px_0px_40px_4px_rgba(0,0,0,0.3)] bg-blue-300"
                src={eyeImg}
                alt="eye-as-button"
              />
              {audioURL && (
                <audio ref={audioRef} src={`${localhost}/${audioURL}`} />
              )}
            </Link>
          </div>
        ) : (
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
