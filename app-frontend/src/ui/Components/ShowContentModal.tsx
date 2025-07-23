
import { useRef, useState, useEffect } from "react";
import { useShowContent } from "../../Routes/hooks/useShowContent";
import { ContentCardComponent } from "./ContentCard";
import { useUpdate } from "../../Routes/hooks/useUpdate";
import { useContent } from "../../Routes/hooks/useContent";

type inputType = {
  isContentModalOpen: boolean;
  contentRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  titleReference: string | undefined | null;
  onClick: () => void;
};
export const ShowContentModalComponent = (props: inputType) => {
  const [idValue, setIdValue]=useState<string | null>(null)
  const [isEditable, setIsEditable]=useState(false);
  const [functionCallState, setFunctionCallState]=useState(false);

  const editedTitleRef=useRef<HTMLDivElement>(null);
  const editedInfoRef=useRef<HTMLDivElement>(null);

  const funcCallHandler=functionCallState? true : false;

  console.log('this is the value of the funcCallHandler', funcCallHandler);
  
// Always call hooks at the top level
const { timerFunc } = useContent();
const { timerFuncEditedValue } = useUpdate({
  idValue: idValue,
  editedTitleRef: editedTitleRef.current?.textContent,
  editedInfoRef: editedInfoRef.current?.textContent
});
const { openContents, setOpenContents, timerFuncOpenContents } = useShowContent({
  titleReference: props.titleReference,
});
useEffect(()=>{
  if(props.isContentModalOpen==false){
    setOpenContents(["Loading..."])
  }
  else if(props.isContentModalOpen==true){
    const timer=setTimeout(()=>{
      timerFuncOpenContents();
    },500);
    return ()=>{
      clearTimeout(timer)
    }
  }
}, [props.isContentModalOpen])
useEffect(() => {
  if (functionCallState) {
    timerFuncEditedValue();
    timerFunc();
    timerFuncOpenContents();
    console.log(editedInfoRef.current?.textContent);
    console.log(editedTitleRef.current?.textContent);
    console.log(idValue);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [functionCallState]);
console.log("ShowContentModal titleReference:", props.titleReference);
  const handledownkey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key)
    if (e.key === "Escape") {
      props.onClose();
      setIsEditable(false)
      setFunctionCallState(false)
    }
  };


  if (props.isContentModalOpen == true) {
    return (
      <>
        <div
          ref={props.contentRef}
          onKeyDown={handledownkey}
          tabIndex={0}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden blur-none">
          <div
            className="bg-slate-400 inset-0 absolute opacity-40 "
            onClick={()=>{
              props.onClose()
              setIsEditable(false)
              setFunctionCallState(false)
              }}></div>
          <div className="bg-white relative rounded-lg w-[90vh] h-[90vh] mx-10 my-10 overflow-hidden">
            {Array.isArray(openContents) && openContents.length > 0 ? (
              openContents.map((item) =>
                typeof item === "string" ? (
                  <div className="flex h-full w-full font text-xl justify-center items-center">
                    {item}
                  </div>
                ) : (
                  <ContentCardComponent
                    id={item._id}
                    title={item.title}
                    type={item.type}
                    link={item.link}
                    info={item.info}
                    typeOfCard="fullScreenCard"
                    onClose={props.onClose}
                    onClick={() => {}}
                    isEditable={isEditable}
                    setIsEditable={setIsEditable}
                    setFunctionCallState={setFunctionCallState}
                    editedInfoRef={editedInfoRef}
                    editedTitleRef={editedTitleRef}
                    setIdValue={setIdValue}
                  />
                )
              )
            ) : (
              <div className="text-center text-gray-400">No pins to show</div>
            )}
          </div>
        </div>
      </>
    );
  }
};
