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
  const textRef = useRef();

  useEffect(() => {
    alert("click on the screen to start celebration!")
    // Play birthday song
    const sound = new Howl({
      src: [music], // Place this in public/assets/
      volume: 0.5,
    });
    sound.play();
    
    // // Animate birthday message
    // gsap.from(textRef.current, {
    //   opacity: 0,
    //   y: 30,
    //   duration: 1.5,
    //   delay: 1,
    // });

    
  }, []);
  const playMusic=()=>{
    sound.play();
    setPlay(true);
  }

  return (
    <div className="relative bg-pink-100 w-full h-screen overflow-hidden" onClick={playMusic}>
      {/* Confetti */}
      {1 && <Confetti numberOfPieces={300} recycle={true} />}

      {/* Scrolling Images */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 .scroll-container">
        <div className="flex h-full w-max animate-scroll-x scroll-track">
          {[...images, ...images].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`img${index}`}
              className="h-full w-auto object-cover mx-2"
              loading="lazy"
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
