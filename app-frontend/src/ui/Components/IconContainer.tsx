import { NamedButtonComponent } from "./NamedButtonComponent";
import { ShareIconComponent } from "../icons/ShareIcon";
import { AddIconComponent } from "../icons/AddIcon";
interface inputType{
  onClick: ()=>void
}
export const NamedIconsContainerComponent = (porps: inputType) => {

  return (
    <>
        <div className={"sm:flex sm:gap-4 sm:justify-end flex-1 "}>
            <div className="sm:my-4 my-4 pl-5">
            <NamedButtonComponent
              title={window.innerWidth<640? "": "Share Space"
              }
              size={window.innerWidth < 640 ? "sm" : "md"}
              type="light"
              startIcon={<ShareIconComponent />}
              onClick={() => {}}
            />
            </div>
          <div className="my-4 mr-4">
            <NamedButtonComponent
              title={window.innerWidth<640? "": "Add Content"}
              size={window.innerWidth<640?"md": "md"}
              type="bold"
              startIcon={<AddIconComponent />}
              onClick={porps.onClick}
            />
          </div>
        </div>
    </>

  );
};
