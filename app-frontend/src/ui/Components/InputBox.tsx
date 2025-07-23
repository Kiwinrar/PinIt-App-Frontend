import type { allRefTypes } from "./EntryBoxComponent";
import { useState } from "react";
import { EyeOpenComponent } from "../icons/eyeOpen";
import { EyeClosedComponent } from "../icons/eyeClosed";
interface inputType {
  placeholder: string;
  reference: allRefTypes;
  icon?: React.ReactNode;
  isPassword: boolean;
}
const defaultStyles: string =
  "bg-gray-100 w-full px-2 font-light font-sans my-3 h-8 shadow-sm outline-none text-lg";
export const InputBoxComponent = (props: inputType) => {
  if (props.isPassword == true) {
    const [isVisible, setIsVisible] = useState(true);
    const changeIcon = () => {
      setIsVisible((prev) => !prev);
    };
    let icon = isVisible ? (
      <EyeClosedComponent size="sm" />
    ) : (
      <EyeOpenComponent size="sm" />
    );
    let typeOfInputBox = isVisible ? "password" : "text";
    return (
      <div className="flex justify-end relative items-center">
        <div className="mx-2 absolute" onClick={changeIcon}>
          {icon}
        </div>
        <input
          type={typeOfInputBox}
          ref={
            props.reference.emailRef ||
            props.reference.passwordRef ||
            props.reference.usernameRef
          }
          placeholder={props.placeholder}
          className={`${defaultStyles}`}
        />
      </div>
    );
  } else {
    return (
      <>
        <input
          type={"text"}
          ref={
            props.reference.emailRef ||
            props.reference.passwordRef ||
            props.reference.usernameRef ||
            props.reference.typeRef ||
            props.reference.titleRef ||
            props.reference.linkRef ||
            props.reference.inputRef
          }
          placeholder={props.placeholder}
          className={`${defaultStyles}`}
        />
      </>
    );
  }
};
