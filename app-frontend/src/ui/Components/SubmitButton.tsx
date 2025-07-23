import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface inputType {
  length: "long" | "short";
  color: string;
  name: string;
  typeOfPage: "Signup" | "Signin" | "Submit";
  onClick: () => void;
}
const length = {
  long: "w-full",
  short: "w-10",
};
const defaultStyles = "h-10 text-white my-4 cursor-pointer ";
const disabledStyles = "h-10 text-white my-4 cursor-wait bg-gray-400 ";
export const SubmitButton = (props: inputType) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate=useNavigate();
    const callSignin=()=>{
        navigate('/signin')
    }
  useEffect(() => {
    if (isDisabled) {
      const timer = setTimeout(() => {
        setIsDisabled((c) => !c);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isDisabled]);
  const setDisabled = () => {
    setIsDisabled((c) => !c);
  };
  let stateOfDisabled = isDisabled ? true : false;
  return (
    <><div className="w-full grid grid-cols-1">
        {props.typeOfPage=='Signup' && <div onClick={callSignin}className="flex my-2 text-blue-800 cursor-pointer text-sm justify-end w-full  span-col-1"><p>Already a user?</p></div>}
        <div className="w-full span-col-1">
      <button
        disabled={stateOfDisabled}
        onClick={() => {
          props.onClick();
          setDisabled();
        }}
        className={`${
          stateOfDisabled
            ? `${length[props.length]} ${disabledStyles}`
            : `${length[props.length]} ${props.color} ${defaultStyles}`
        }`}>
        {props.name}
      </button>


        </div>
    </div>
    </>
  );
};
