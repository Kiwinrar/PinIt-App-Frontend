import { EntryBoxComponent } from "../ui/Components/EntryBoxComponent";
import { useEffect, useRef, type RefObject } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const signupEndpoint = async () => {
    const name = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;
    const response = await axios.post(
      "http://localhost:3000" + "/api/v1/user/signup",
      {
        name,
        email,
        password,
      },
    );
    if (response.data.message) {
      navigate("/signin");
    }
  };

  return (
    <>
      <div className="bg-linear-to-bl from-indigo-300 to-indigo-700 w-screen h-screen grid grid-cols-4 items-center">
        <div className="flex justify-center mx-16 col-span-3 ">
          <h1 className=" text-white font-bold text-7xl">
            <div className="flex items-center font-extrabold bg-linear-to-bl from-indigo-500 to-indigo-900 bg-clip-text text-transparent text-9xl">
              {/* <LogoComponent size="xxl" color="fill-indigo-800" /> */}
              <h1>#PinUP</h1>
            </div>
            your next world changing idea
          </h1>
        </div>
        <div className="h-screen flex justify-end items-center col-span-1">
          <EntryBoxComponent
            emailPlaceholder="Email"
            usernamePlaceholder="Username"
            passwordPlaceholder="Password"
            type="Signup"
            onclick={signupEndpoint}
            reference={{
              usernameRef: usernameRef as RefObject<HTMLInputElement>,
              emailRef: emailRef as RefObject<HTMLInputElement>,
              passwordRef: passwordRef as RefObject<HTMLInputElement>,
            }}
          />
        </div>
      </div>
    </>
  );
};
