import React from "react";
import pelindoLogo from "../assets/loader.png";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-40 w-full">
      <img
        src={pelindoLogo}
        alt="Loading..."
        className="w-12 h-12 animate-pulse"
      />
      <span className="ml-3 text-pelindoBlue font-medium animate-pulse">
        Memuat data...
      </span>
    </div>
  );
};

export default Loader;
