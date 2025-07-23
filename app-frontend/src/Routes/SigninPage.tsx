import { EntryBoxComponent } from "../ui/Components/EntryBoxComponent";
import { useRef, type RefObject } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogoComponent } from "../ui/icons/Logo";

export const SignInPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const signinEndpoint = async () => {
    const name = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(
      "http://localhost:3000" + "/api/v1/user/signin",
      {
        name,
        password,
      }
    );
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  };

  return (
    <>
      <div className="bg-linear-to-bl from-indigo-300 to-indigo-700 w-screen h-screen grid grid-cols-4 items-center">
        <div className="flex justify-center mx-16 col-span-3">
          <h1 className=" text-white font-bold text-7xl">
            <div className="flex items-center font-extrabold bg-linear-to-bl from-indigo-500 to-indigo-900 bg-clip-text text-transparent text-8xl">
              {/* <LogoComponent size="xxl" color="fill-indigo-800" /> */}
              <h1>Welcome Back!</h1>
            </div>
            Login To See Your Amazing Pins
          </h1>
        </div>
        <div className="h-screen flex justify-end items-center col-span-1">
          {" "}
          <EntryBoxComponent
            reference={{
              usernameRef: usernameRef as RefObject<HTMLInputElement>,
              passwordRef: passwordRef as RefObject<HTMLInputElement>,
            }}
            usernamePlaceholder="Username"
            passwordPlaceholder="Password"
            type="Signin"
            onclick={signinEndpoint}
          />
        </div>
      </div>
    </>
  );
};
