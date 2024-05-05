"use client";
import { useEffect, useRef } from "react";
import Button from "./Button";

type Props = {
  isOpened: boolean;
  children: React.ReactNode;
  title?: string;
  onProceed?: () => void;
  onClose: () => void;
};

const Dialog = ({ title, isOpened, onProceed, onClose, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.classList.add("fixed", "inset-0", "z-50", "overflow-auto");
      document.body.classList.add("modal-open");
    } else {
      ref.current?.classList.remove(
        "fixed",
        "inset-0",
        "z-50",
        "overflow-auto"
      );
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  return (
    <>
      {isOpened && (
        <div
          ref={ref}
          className="fixed 
          inset-0 z-50 overflow-auto bg-black bg-opacity-30 
          flex justify-center items-center"
          onClick={() => {
            if (ref.current) onClose();
          }}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-lg w-full"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            {children}
            <div className="mt-4 flex flex-col md:flex-row gap-2">
              {onProceed && (
                <Button
                  className="flex-grow"
                  onClick={() => {
                    onProceed();
                    onClose();
                  }}
                >
                  Proceed
                </Button>
              )}
              <Button
                className="flex-grow"
                variant="secondary"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
