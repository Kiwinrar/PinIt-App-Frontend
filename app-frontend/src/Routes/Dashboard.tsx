import { useEffect, useRef, useState, type RefObject } from "react";
import Masonry from "masonry-layout";
import { NamedIconsContainerComponent } from "../ui/Components/IconContainer";
import { ContentCardComponent } from "../ui/Components/ContentCard";
import { ContentCreationModal } from "../ui/Components/CreateContentModal";
import axios from "axios";
import { useContent } from "./hooks/useContent";
import { ShowContentModalComponent } from "../ui/Components/ShowContentModal";

export const DashboardPage = () => {
  const { contents, timerFunc } = useContent();

  useEffect(() => {
    const scroll = window.scrollY;
    let masonry: InstanceType<typeof Masonry> | null = null;

    const getColumnWidth = () => {
      const width = window.innerWidth;
      if (width < 640) return 100; // sm and below
      if (width < 768) return 100; // sm
      if (width < 1024) return 100; // md
      if (width < 1280) return 160; //lg
      return 150; // xl
    };

    const initializeMasonry = () => {
      if (masonry && typeof masonry.destroy === "function") {
        masonry.destroy();
      }
      masonry = new Masonry("#masonry-grid", {
        itemSelector: ".grid-item",
        columnWidth: getColumnWidth(),
        gutter: 8,
        fitWidth: true,
      });
      console.log(document.querySelector("#masonry-grid"));
    };

    // Initialize on first render
    initializeMasonry();

    // Update on window resize
    const handleResize = () => {
      initializeMasonry();
    };

    window.addEventListener("resize", handleResize);

    window.scrollTo(0, scroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (masonry && typeof masonry.destroy === "function") masonry.destroy();
    };
  }, [contents]);
  const [isOpen, setIsOpen] = useState(false);
  const [isContentModalOpen, setContentModalOpen] = useState(false);

  useEffect(() => {
    if (isContentModalOpen) {
      document.body.style.overflow = "hidden";
    }
    if (isContentModalOpen && contentRef.current) {
      contentRef.current.focus();
    } else {
      document.body.style.overflow = "";
      timerFunc();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isContentModalOpen]);

  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const isOpenContent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    timerFunc();
    if (isOpen && isOpenContent.current) {
      isOpenContent.current.focus();
    }
  }, [isOpen]);

  const typeRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const addContent = async () => {
    const type = typeRef.current?.value;
    const info = inputRef.current?.value;
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const response = await axios.post(
      "http://localhost:3000" + "/api/v1/user/contents/add",
      {
        type,
        info,
        title,
        link,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      },
    );
    if (response.data.message) {
      console.log(response.data.message);
    }
  };
  return (
    <>
      <ShowContentModalComponent
        contentRef={contentRef}
        titleReference={selectedTitle}
        isContentModalOpen={isContentModalOpen}
        onClick={() => {}}
        onClose={() => {
          setContentModalOpen((c) => !c);
        }}
      />
      <ContentCreationModal
        contentRef={isOpenContent}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen((c) => !c);
        }}
        reference={{
          typeRef: typeRef as RefObject<HTMLInputElement>,
          inputRef: inputRef as RefObject<HTMLInputElement>,
          titleRef: titleRef as RefObject<HTMLInputElement>,
          linkRef: linkRef as RefObject<HTMLInputElement>,
        }}
        onClick={addContent}
      />
      <div
        className={`min-h-screen bg-indigo-200  overflow-hidden w-auto ${
          isOpen ? "blur-xs" : ""
        } ${isContentModalOpen ? "blur-xs" : ""}`}
      >
        <div className="flex min-h-screen">
          <div className="bg-gradient-to-bl from-indigo-300 to-indigo-700 lg:static lg:min-w-36 lg:max-w-36 sm:static sm:min-w-10 sm:w-auto fixed bottom-0 left-0 w-full min-h-12 z-50">
            Sidebar
          </div>
          <div className="flex-1 pb-10 sm:pb-0">
            <div className="sm:flex sm:items-center sm:justify-between sm:pt-2 flex items-center justify-center pt-2">
              <h1 className="text-indigo-500 sm:text-5xl text-4xl font-extrabold px-14 ">
                Your Pins
              </h1>
              <div className="sm:static fixed bottom-10 right-0 z-50">
                <NamedIconsContainerComponent
                  onClick={() => {
                    setIsOpen((c) => !c);
                  }}
                />
              </div>
            </div>
            <div className="">
              <div id="masonry-grid" className={`sm:px-10 mx-auto py-4`}>
                {Array.isArray(contents) && contents.length > 0 ? (
                  contents.map(({ _id, type, info, title, link }, index) => (
                    <div key={index} className="grid-item sm:mb-6 mb-6">
                      <ContentCardComponent
                        id={_id}
                        title={title}
                        type={type}
                        link={link}
                        info={info}
                        typeOfCard="pageCard"
                        onClose={() => {}}
                        onClick={() => {
                          setContentModalOpen((c) => !c);
                          setSelectedTitle(title);
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400">
                    No pins to show
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
