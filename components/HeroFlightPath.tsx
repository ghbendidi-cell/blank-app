export default function HeroFlightPath() {
  return (
    <svg
      viewBox="0 0 1200 300"
      className="pointer-events-none absolute inset-x-0 top-0 h-[220px] w-full opacity-70 lg:h-[300px]"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        id="hero-flight-path"
        d="M-50,240 C 250,60 650,10 1250,120"
        fill="none"
        stroke="#F7F3EC"
        strokeOpacity={0.35}
        strokeWidth={2}
        strokeDasharray="2 12"
        strokeLinecap="round"
      />
      <g>
        <path d="M-9 -5 L10 0 L-9 5 L-3 0 Z" fill="#F69F83">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
            <mpath href="#hero-flight-path" />
          </animateMotion>
        </path>
      </g>
    </svg>
  );
}
