export default function FlyingPlane({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        className="absolute h-10 w-10 animate-fly-across text-white/90 drop-shadow-lg sm:h-14 sm:w-14"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M22 16.5v-2l-8.5-5V4.5c0-1-.8-2-1.8-2s-1.8 1-1.8 2V9.5l-8.5 5v2l8.5-2.6v5.1L7.5 21v1.5l4.5-1.2 4.5 1.2V21l-2.4-2.5v-5.1z" />
      </svg>
      <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
        <line
          x1="-5%"
          y1="15%"
          x2="105%"
          y2="-10%"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
      </svg>
    </div>
  );
}
