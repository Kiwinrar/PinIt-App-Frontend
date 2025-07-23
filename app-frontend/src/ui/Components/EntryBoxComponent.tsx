import type { RefObject } from "react";
import { InputBoxComponent } from "./InputBox";
import { SubmitButton } from "./SubmitButton";
import { EyeClosedComponent } from "../icons/eyeClosed";
export interface allRefTypes {
  emailRef?: React.RefObject<HTMLInputElement>;
  usernameRef?: React.RefObject<HTMLInputElement>;
  passwordRef?: React.RefObject<HTMLInputElement>;
  typeRef?: React.RefObject<HTMLInputElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
  linkRef?: React.RefObject<HTMLInputElement>;
  titleRef?: React.RefObject<HTMLInputElement>;
}
interface inputType {
  emailPlaceholder?: string;
  usernamePlaceholder?: string;
  passwordPlaceholder?: string;
  type: "Signup" | "Signin";
  reference: allRefTypes;
  onclick: () => void;
}
export const EntryBoxComponent = (props: inputType) => {
  return (
    <>
      <div className="bg-white border-2 border-white rounded-md max-h-96 w-72 m-8">
        <div className="flex justify-center my-4">
          <div className="font-extrabold text-4xl bg-linear-to-bl from-indigo-400 to-indigo-900 text-transparent bg-clip-text">
            {props.type}
          </div>
        </div>

        <div className="flex w-full justify-center">
          {CheckCondtions(props)}
        </div>
        <div className="flex justify-center mx-7">
          <SubmitButton
            typeOfPage={props.type}
            onClick={props.onclick}
            length="long"
            color="bg-linear-to-bl from-indigo-300 to-indigo-700"
            name="Submit"
          />
        </div>
      </div>
    </>
  );
};

const CheckCondtions = (props: inputType) => {
  if (
    props.emailPlaceholder &&
    props.passwordPlaceholder &&
    props.usernamePlaceholder
  ) {
    return (
      <>
        <div className="w-full mx-8">
          <InputBoxComponent
            isPassword={false}
            reference={{
              emailRef: props.reference.emailRef as RefObject<HTMLInputElement>,
            }}
            placeholder={props.emailPlaceholder}
          />
          <InputBoxComponent
            isPassword={false}
            reference={{
              usernameRef: props.reference
                .usernameRef as RefObject<HTMLInputElement>,
            }}
            placeholder={props.usernamePlaceholder}
          />
          <InputBoxComponent
            isPassword={true}
            icon={<EyeClosedComponent size="sm" />}
            reference={{
              passwordRef: props.reference
                .passwordRef as RefObject<HTMLInputElement>,
            }}
            placeholder={props.passwordPlaceholder}
          />
        </div>
      </>
    );
  }

  if (props.passwordPlaceholder && props.usernamePlaceholder) {
    return (
      <>
        <div className="w-full mx-8 my-6">
          <InputBoxComponent
            isPassword={false}
            reference={{
              usernameRef: props.reference
                .usernameRef as RefObject<HTMLInputElement>,
            }}
            placeholder={props.usernamePlaceholder}
          />
          <InputBoxComponent
            isPassword={true}
            icon={<EyeClosedComponent size="sm" />}
            reference={{
              passwordRef: props.reference
                .passwordRef as RefObject<HTMLInputElement>,
            }}
            placeholder={props.passwordPlaceholder}
          />
        </div>
      </>
    );
  }
};
