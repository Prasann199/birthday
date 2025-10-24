  import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { Howl } from "howler";
import gsap from "gsap";
import "./index.css";

import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img4.jpg";
import music from "./assets/birthdayMusic.mp3";

const images = [img1, img2, img3,img1, img2, img3,img1, img2, img3];

const App = () => {
  const [play, setPlay] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const textRef = useRef();
  const trackRef = useRef(null);
  const soundRef = useRef(null);

  useEffect(() => {
    alert("click on the screen to start celebration!");

    // prepare sound and play
    const sound = new Howl({
      src: [music],
      volume: 0.5,
    });
    soundRef.current = sound;
    // try to play (may fail on some mobile browsers until user interaction)
    try {
      sound.play();
      setPlay(true);
    } catch (e) {
      // autoplay blocked — user can tap to start
    }

    // cleanup
    return () => {
      if (soundRef.current) soundRef.current.unload();
    };
  }, []);
  const playMusic = () => {
    if (soundRef.current) {
      soundRef.current.play();
      setPlay(true);
    }
  };

  // total images in the scrolling track (we duplicate the array for seamless loop)
  const totalImages = images.length * 2;

  // when each image loads, increment counter
  const onImgLoad = () => {
    setImagesLoaded((n) => n + 1);
  };

  // start the CSS animation once all images are loaded to avoid jank
  useEffect(() => {
    if (imagesLoaded >= totalImages && trackRef.current) {
      const duration = window.innerWidth <= 600 ? 45 : 35;
      trackRef.current.style.setProperty("--scroll-duration", `${duration}s`);
      trackRef.current.classList.add("scrolling");
    }
  }, [imagesLoaded, totalImages]);

  return (
    <div className="relative bg-pink-100 w-full h-screen overflow-hidden" onClick={playMusic}>
      {/* Confetti: reduce pieces on small screens */}
      {typeof window !== "undefined" && (
        <Confetti numberOfPieces={window.innerWidth <= 600 ? 80 : 300} recycle={true} />
      )}

      {/* Scrolling Images */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 scroll-container">
        <div ref={trackRef} className="flex h-full w-max scroll-track">
          {[...images, ...images].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`img${index}`}
              className={`scroll-image h-full w-auto object-cover mx-2`}
              loading="lazy"
              onLoad={onImgLoad}
            />
          ))}
        </div>
      </div>

      {/* Birthday Message */}
      <div className="absolute bottom-10 w-full flex justify-center items-center z-10">
        <div
          ref={textRef}
          className="bg-white/70 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg max-w-2xl mx-4 text-center text-xl md:text-2xl font-semibold text-pink-700"
        >
           🎉 ಜನ್ಮ ದಿನದ ಶುಭಾಶಯಗಳು ಅಣ್ಣಾ! 🎉<br />
        Wishing you a day filled with laughter, joy, and all your favorite things. You deserve the best, always! 💖
        </div>
      </div>
    </div>
  );
};

export default App;
