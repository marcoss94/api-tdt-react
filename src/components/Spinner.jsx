import React from "react";

export const Spinner = ({ spinner }) => {
  return (
    <div id="spinner" className={`spinner ${spinner ? "show" : "hidden"}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};
