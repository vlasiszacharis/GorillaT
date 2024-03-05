import React from "react";

import { ButtonProps } from "./types/componentTypes";
function Button({
  message,
  bgColor,
  hoverBgColor,
  textColor,
  icon,
}: ButtonProps) {
  return (
    <>
      <div className="p-1  flex flew-row  font-manrope">
        <button
          className={`items-center min-w-28 justify-center p-2 px-3  ${bgColor} ${hoverBgColor} flex flex-row gap-2 rounded-xl text-${textColor}`}
        >
          <div>{icon}</div>
          <div>{message}</div>
        </button>
      </div>
    </>
  );
}

export default Button;
