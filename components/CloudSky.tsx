const SKY_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FzLTlt28p4tBZh58xHOYeBE65G/hf_20260704_115952_95d371f7-9acc-44f5-bc3d-96ba654bd9cf.mp4";

export default function CloudSky() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        className="h-full w-full object-cover opacity-50"
        src={SKY_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef4f2]/70 via-[#f8f5ef]/60 to-[#eef4f2]/70" />
    </div>
  );
}
