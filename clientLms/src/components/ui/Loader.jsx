import React from 'react';

const Loader = ({ text = "Initializing Environment" }) => {
  return (
    <div className="loader-wrapper">
      <div className="loader-glass">
        <div className="pulser">
          <div className="pulser-ring"></div>
          <div className="pulser-core"></div>
        </div>
        <div className="loader-text">{text}</div>
      </div>
    </div>
  );
};

export default Loader;
