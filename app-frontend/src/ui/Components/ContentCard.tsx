import { YtEmbedder } from "../../misc/ytEmbedder";
import { DeleteIconComponent } from "../icons/delete";
import { DocumentComponent } from "../icons/document";
import { ShareIconComponent } from "../icons/ShareIcon";
import { YoutubeIconComponent } from "../icons/Youtube";
import { useEffect } from "react";
import axios from "axios";
import { useContent } from "../../Routes/hooks/useContent";
import { EditIconComponent } from "../icons/EditIcon";
import { ButtonComponent } from "./Button";

// Extend the Window interface to include 'twttr'
declare global {
  interface Window {
    twttr?: any;
  }
}

interface inputType {
  id: string;
  title: string;
  type: "document" | "youtube" | "twitter";
  link: string;
  info: string;
  typeOfCard: "pageCard" | "fullScreenCard";
  onClick: () => void;
  onClose: () => void;
  isEditable?: boolean;
  setIsEditable?: React.Dispatch<React.SetStateAction<boolean>>;
  setFunctionCallState?:  React.Dispatch<React.SetStateAction<boolean>>;
  editedTitleRef?: React.RefObject<HTMLDivElement | null>;
  editedInfoRef?: React.RefObject<HTMLDivElement | null>;
  setIdValue?: React.Dispatch<React.SetStateAction<string | null>>;
}
const iconTypePageCard = {
  document: <DocumentComponent size="sm" />,
  youtube: <YoutubeIconComponent size="sm" />,
  twitter: null,
};

const iconTypeFullscreenCard = {
  document: <DocumentComponent size="md" />,
  youtube: <YoutubeIconComponent size="md" />,
  twitter: null,
};
const cardTypeHandler = {
  pageCard:
    "bg-white h-auto w-50 md:w-72 rounded-md shadow-lg cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out ring-0 hover:ring-1 ring-indigo-400 px-2 py-2",
  fullScreenCard: "max-h-[90vh] px-10 py-10  overflow-y-auto",
};
const EditableStyles = {
  true: "text-blue-600",
  false: "",
};




export const ContentCardComponent = (props: inputType) => {
  if(props.typeOfCard=='fullScreenCard'){
    console.log('this is content id', props.id)
  }
  const EditableValue = props.isEditable ? "true" : "false";
  const { timerFunc } = useContent();
  useEffect(() => {
    // Check if the script is already present
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script is present, re-parse the page for new tweets
      window.twttr.widgets.load();
    }
  }, [props.link]);
  const embedYtLink = props.type === "youtube" ? YtEmbedder(props.link) : null;
  console.log("embeddedLink", embedYtLink);

  const deleteContent = async () => {
    const title = props.title;
    const response = await axios.post(
      "http://localhost:3000" + "/api/v1/user/contents/delete",
      {
        title,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    if (response) {
      console.log(localStorage.getItem("token"));
      console.log(response.data.message);
      console.log(response.data.response);
    }
  };
  return (
    <>
      <div
        onClick={props.onClick}
        className={` ${cardTypeHandler[props.typeOfCard]} `}>
        {props.typeOfCard == "pageCard" && (
          <div className="flex items-center justify-between">
            <div className="">{iconTypePageCard[props.type]}</div>
            <div className="flex">
              <div className="cursor-pointer px-2">
                {<ShareIconComponent size="sm" />}
              </div>
              <div
                className="cursor-pointer pl-2"
                onClick={async () => {
                  await deleteContent();
                  timerFunc();
                }}>
                {<DeleteIconComponent size="sm" />}
              </div>
            </div>
          </div>
        )}
        {props.typeOfCard == "fullScreenCard" && (
          <div className="flex items-center justify-between">
            <div className="">{iconTypeFullscreenCard[props.type]}</div>
            <div className="flex">
              <div
                className="cursor-pointer px-2"
                onClick={() => {
                  if (props.setIsEditable) {
                    props.setIsEditable((c) => !c);
                  }
                }}>
                {<EditIconComponent size="md" />}
              </div>
              <div className="cursor-pointer px-2">
                {<ShareIconComponent size="md" />}
              </div>

              <div
                className="cursor-pointer pl-2"
                onClick={async () => {
                  await deleteContent();
                  timerFunc();
                  props.onClose();
                  if (props.setIsEditable) {
                    props.setIsEditable(true);
                  }
                }}>
                {<DeleteIconComponent size="md" />}
              </div>
            </div>
          </div>
        )}
        <div className="px-2 py-4 min-h-fit">
          {props.typeOfCard == "pageCard" && (
            <div className="text-gray-800 font-semibold text-lg ">
              {props.title}
            </div>
          )}
          {props.typeOfCard == "fullScreenCard" && (
            <div
            ref={props.editedTitleRef} 
            className={`font-semibold text-3xl ${EditableStyles[EditableValue]} ${EditableValue && "focus:outline-none"}`} contentEditable={`${EditableValue}`}>
              {props.title}
            </div>
          )}
          <div className="pt-4">
            {props.typeOfCard == "pageCard" && (
              <>
                {props.type == "youtube" &&
                  (embedYtLink ? (
                    <iframe
                      className="w-full rounded-sm"
                      src={embedYtLink}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                      <a
                        href={props.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md text-blue-700 ">
                        {props.link}
                      </a>
                    </div>
                  ))}
                {props.type == "twitter" && (
                  <div className="w-full overflow-x-auto">
                    <blockquote className="twitter-tweet">
                      <a href={props.link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                  </div>
                )}
              </>
            )}
            {props.typeOfCard == "fullScreenCard" && (
              <>
                {props.type == "youtube" &&
                  (embedYtLink ? (
                    <iframe
                      className="w-full h-[40vh] rounded-sm"
                      src={embedYtLink}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="overflow-hidden ">
                      <a
                        href={props.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md text-blue-700 ">
                        {props.link}
                      </a>
                    </div>
                  ))}
                {props.type == "twitter" && (
                  <div className="w-full overflow-x-auto">
                    <blockquote className="twitter-tweet">
                      <a href={props.link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                  </div>
                )}
              </>
            )}
          </div>
          {props.typeOfCard == "pageCard" && (
            <div className="text-md overflow-hidden line-clamp-5 text-ellipsis pt-2">
              {props.info}
            </div>
          )}
          {props.typeOfCard == "fullScreenCard" && (
            <>
            <div
              ref={props.editedInfoRef}
              className={`text-md overflow-hidden mt-6 ${EditableStyles[EditableValue]} ${EditableValue && "focus:outline-none"}`}
              contentEditable={`${EditableValue}`}>
              {props.info}
            </div>
            {props.isEditable && 
            <div className="my-6">
              <div className="flex justify-end gap-4">
                <ButtonComponent title="cancel" onClick={()=>{
                  if(props.setIsEditable){
                    props.setIsEditable(false)
                  }
                }} size="sm" type="light"/>
                <ButtonComponent title="update" size="sm" type="bold" onClick={()=>{
                  if(props.setFunctionCallState && props.setIdValue && props.setIsEditable){
                    props.setIsEditable(false)
                    props.setFunctionCallState(true);
                    props.setIdValue(props.id);
                  }
                }}/>
              </div>
            </div>
            }
            </>
          )}
        </div>
      </div>
    </>
  );
};
