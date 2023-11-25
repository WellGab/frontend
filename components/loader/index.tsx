import React from "react";
import { BallTriangle } from "react-loader-spinner";
export const PageLoader = () => {
  return (
    <div className="fixed z-20 flex items-center justify-center min-h-screen bg-black bg-opacity-25 w-screen h-screen top-0 left-0 well-gab-spinner">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#078"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );
};
