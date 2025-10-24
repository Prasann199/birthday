import { useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { Howl } from "howler";
import "./index.css";

import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img4.jpg";
import music from "./assets/birthdayMusic.mp3";

const images = [img1, img2, img3];

const App = () => {
  const soundRef = useRef(null);

  useEffect(() => {
    alert("Click on the screen to start celebration!");

    soundRef.current = new Howl({
      src: [music],
      volume: 0.5,
    });
  }, []);

  const playMusic = () => {
    soundRef.current.play();
  };

  return (
    <div
      className="relative bg-pink-100 w-full h-screen overflow-hidden"
      onClick={playMusic}
    >
      <Confetti numberOfPieces={300} recycle={true} />

      {/* Scrolling Images */}
      <div className="scroll-container">
        <div className="scroll-track">
          {[...images, ...images].map((img, i) => (
            <img key={i} src={img} alt={`scroll-${i}`} className="scroll-image" />
          ))}
        </div>
      </div>

      {/* Birthday Message */}
      <div className="absolute bottom-10 w-full flex justify-center items-center z-10">
        <div className="bg-white/70 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg max-w-2xl mx-4 text-center text-xl md:text-2xl font-semibold text-pink-700">
          🎉 ಜನ್ಮ ದಿನದ ಶುಭಾಶಯಗಳು ಅಣ್ಣಾ! 🎉<br />
          Wishing you a day filled with laughter, joy, and all your favorite
          things. You deserve the best, always! 💖
        </div>
      </div>
    </div>
  );
};

export default App;
