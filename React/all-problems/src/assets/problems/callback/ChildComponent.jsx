import React, { memo } from "react";

function ChildComponent({ handleChild }) {
  console.log("ChildComponent");
  return (
    <div className="text-center mt-5">
      <button
        onClick={handleChild}
        className="bg-green-600 text-white rounded-md p-2"
      >
        Click Child Count
      </button>
    </div>
  );
}

export default memo(ChildComponent);
