export default function Icon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (name === "search") {
    return (
      <svg {...common}>
        <path
          d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16.2 16.2 21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg {...common}>
        <path
          d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 6v6l4 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg {...common}>
        <path
          d="M16 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M4 21a8 8 0 0 1 16 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "yt") {
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path
          d="M21.8 8.001a3 3 0 0 0-2.11-2.12C17.82 5.4 12 5.4 12 5.4s-5.82 0-7.69.48A3 3 0 0 0 2.2 8.001 31.3 31.3 0 0 0 2 12s0 2.8.2 3.999a3 3 0 0 0 2.11 2.12c1.87.481 7.69.481 7.69.481s5.82 0 7.69-.48a3 3 0 0 0 2.11-2.12C22 14.8 22 12 22 12s0-2.8-.2-3.999Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path d="M10 15.5v-7l6 3.5-6 3.5Z" fill="#fff" />
      </svg>
    );
  }

  return null;
}