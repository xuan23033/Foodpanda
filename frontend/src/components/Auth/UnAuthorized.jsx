import React from "react";

const UnAuthorized = () => {
  return (
    <div className="p-3">
      <img
        src="https://stories.freepiklabs.com/storage/23269/401-error-unauthorized-pana-2856.png"
        alt="error"
        height={250}
        width={250}
      ></img>
      <h4>Looks like you're trying to access something unauthorized to you</h4>
    </div>
  );
};

export default UnAuthorized;
