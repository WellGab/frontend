import React from "react";

const Switch = ({
  checked,
  update,
}: {
  checked: boolean;
  update: () => void;
}) => {
  return (
    <label
      className="relative inline-block w-12 h-6 rounded-full"
      style={{ backgroundColor: checked ? "rgba(15, 151, 61, 1)" : "gray" }}
    >
      <input
        type="checkbox"
        className="absolute w-4 h-4 rounded-full appearance-none cursor-pointer"
        checked={checked}
        onChange={() => update()}
      />
      <span
        className={`absolute left-0 ${
          checked ? "translate-x-7" : "translate-x-1"
        } w-4 h-4 rounded-full transition-transform top-1 bg-white`}
      ></span>
    </label>
  );
};

export default Switch;
