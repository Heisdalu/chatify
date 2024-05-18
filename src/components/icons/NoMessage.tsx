import React from "react";

function NoMessage() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={150}
      width={150}
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      viewBox="0 0 24 24"
    >
      <g>
        <path
          fill="#059cf7"
          strokeWidth="0"
          d="M22 2L22 16 14 16 8 21 8 16 2 16 2 2 22 2z"
          opacity="0.1"
        ></path>
        <path d="M22 2L22 16 14 16 8 21 8 16 2 16 2 2 22 2z"></path>
        <path d="M15 9L9 9"></path>
      </g>
    </svg>
  );
}

export default NoMessage;
