import React from "react";
import type { ReactElement } from "react";
import { ButtonComponent } from "./Button";

export interface inputType {
  title: string | React.ReactNode;
  startIcon?: ReactElement<{ size: string }>;
  endIcon?: ReactElement<{ size: string }>;
  size: "sm" | "md" | "lg";
  type: "bold" | "light";
  onClick?: () => void;
}

export const NamedButtonComponent = (props: inputType) => {
  return (
    <>
      <ButtonComponent
        title={<div>{props.title}</div>}
        size={props.size}
        type={props.type}
        onClick={props.onClick}
        startIcon={
          props.startIcon &&
          React.cloneElement(props.startIcon, { size: props.size })
        }
        endIcon={
          props.endIcon &&
          React.cloneElement(props.endIcon, { size: props.size })
        }
      />
    </>
  );
};
