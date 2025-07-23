import { useEffect, useState, type ReactElement } from "react";
import type { inputType } from "./NamedButtonComponent";
const sizeVariable = {
  sm: "text-sm px-2 py-2",
  md: "text-md px-4 py-4",
  lg: "text-xl px-6 py-6",
};
const typeVariable = {
  bold: "bg-indigo-500 text-white",
  light: "bg-indigo-300 text-indigo-700",
};
type startIconHandler = ReactElement | undefined;
const defaultVariables: string = "cursor-pointer rounded-md hover:scale-105 transition-all duration-200 ease-in-out";
export const ButtonComponent = (props: inputType) => {
  const startIcon: startIconHandler = props.startIcon;

  return (
    <>
    <button
      onClick={props.onClick}
      className={`${sizeVariable[props.size]} ${
        typeVariable[props.type]
      } ${defaultVariables} `}>
      <div className="flex items-center">
        <div className={`${startIcon ? "px-2" : undefined}`}>
          {props.startIcon}
        </div>
        {props.title}
        {props.endIcon}
      </div>
    </button>
    </>
  );
};
