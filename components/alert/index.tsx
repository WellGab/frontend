import React, { useEffect } from "react";

interface AlertProps {
  message: string;
  type: string;
  header: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Alert({
  message,
  type,
  header,
  show,
  setShow,
}: AlertProps) {
  function closeAlert() {
    setShow(false);
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (show) {
      timeout = setTimeout(() => {
        setShow(false);
      }, 10000);
    }

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const alertType = {
    warning: "bg-gray-200 text-yellow-900",
    success: "bg-green-100 text-green-900",
    danger: "bg-red-100 text-red-900",
    info: "bg-blue-100 text-blue-900",
  }[type];

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <main
        className={`flex flex-col items-center justify-center flex-1 px-2 text-center ${alertType} w-full`}
      >
        <div
          onClick={closeAlert}
          className="flex flex-row items-end justify-end flex-1 w-full font-black text-xl pt-2 cursor-pointer text-red-500 hover:font-bold hover:text-red-200"
        >
          X
        </div>
        <h1 className="text-2xl font-bold">{header}</h1>
        <p className="text-lg font-bold">{message}</p>
      </main>
    </div>
  );
}
