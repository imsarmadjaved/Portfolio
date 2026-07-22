import { useState } from "react";

const LogoMark = ({ className = "", title = "MSJ logo" }) => {
  const [usePng, setUsePng] = useState(false);

  return (
    <img
      src={usePng ? "/logo.png" : "/logo.svg"}
      alt={title}
      className={`logo-mark ${className}`}
      decoding="async"
      onError={() => {
        if (!usePng) setUsePng(true);
      }}
    />
  );
};

export default LogoMark;
