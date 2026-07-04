"use client";

import { useRef, useState } from "react";

const TRANSITION_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260704_120235_eefd6148-e58d-476a-9090-c9130e54b9ff.mp4";
const LOOP_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260704_120002_32aa913b-84ed-48ae-981e-d523c15ea188.mp4";
const POSTER =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260703_110106_b272cb33-03c5-4375-9304-cd32379e2673.png";

export default function HeroBackground() {
  const loopRef = useRef<HTMLVideoElement>(null);
  const [transitioned, setTransitioned] = useState(false);

  function handleTransitionEnded() {
    setTransitioned(true);
    loopRef.current?.play();
  }

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-brand-dark">
      <video
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${transitioned ? "opacity-0" : "opacity-100"}`}
        src={TRANSITION_VIDEO}
        poster={POSTER}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleTransitionEnded}
      />
      <video
        ref={loopRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${transitioned ? "opacity-100" : "opacity-0"}`}
        src={LOOP_VIDEO}
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
