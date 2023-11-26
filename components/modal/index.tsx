import React from "react";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ children, open, handleClose }: ModalProps) => {
  return (
    <>
      {open ? (
        <div
          className="fixed w-screen h-screen left-0 top-0 bg-black bg-opacity-40 flex  justify-center z-[15]"
          onClick={() => handleClose()}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-max mt-[20vh] z-[15] h-max"
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
