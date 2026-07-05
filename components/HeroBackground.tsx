"use client";

import { useRef, useState } from "react";

const TRANSITION_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260705_005529_050723da-8a37-4c16-b525-f074536ddffb.mp4";
const LOOP_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260704_115952_95d371f7-9acc-44f5-bc3d-96ba654bd9cf.mp4";

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
