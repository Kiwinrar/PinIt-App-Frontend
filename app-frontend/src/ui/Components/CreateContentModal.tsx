import { CrossButtonComponent } from "../icons/CrossButton";
import type { allRefTypes } from "./EntryBoxComponent";
import { InputBoxComponent } from "./InputBox";
import { SubmitButton } from "./SubmitButton";

type inputType = {
  isOpen: boolean;
  reference: allRefTypes;
  contentRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onClick: () => void;
};
export const ContentCreationModal = (props: inputType) => {
  const handledownkey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key);
    if (e.key === "Escape") {
      props.onClose();
    }
  };
  if (props.isOpen == true) {
    return (
      <>
        <div
          ref={props.contentRef}
          onKeyDown={handledownkey}
          tabIndex={0}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          <div
            className="bg-slate-400 inset-0 absolute opacity-40 "
            onClick={props.onClose}></div>
          <div className="bg-white relative rounded-lg max-w-80 sm:max-w-100 mx-4 overflow-x-hidden">
            <div className="sm:px-10 sm:py-4 px-6 py-8 ">
              <div className="flex justify-center pt-4">
                <h1>Create A New Pin</h1>
              </div>
              <div className="pt-4">
                <InputBoxComponent
                  placeholder="Type"
                  reference={{
                    typeRef: props.reference.typeRef,
                  }}
                  isPassword={false}
                />

                <InputBoxComponent
                  placeholder="Title"
                  reference={{
                    titleRef: props.reference.titleRef,
                  }}
                  isPassword={false}
                />
                <InputBoxComponent
                  placeholder="Link"
                  reference={{
                    linkRef: props.reference.linkRef,
                  }}
                  isPassword={false}
                />
                <InputBoxComponent
                  placeholder="Info"
                  reference={{
                    inputRef: props.reference.inputRef,
                  }}
                  isPassword={false}
                />
                <SubmitButton
                  length="long"
                  color="bg-linear-to-bl from-indigo-300 to-indigo-700"
                  typeOfPage="Submit"
                  name="Submit"
                  onClick={() => {
                    props.onClick();
                    const timer = setTimeout(() => {
                      props.onClose();
                    }, 1000);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
