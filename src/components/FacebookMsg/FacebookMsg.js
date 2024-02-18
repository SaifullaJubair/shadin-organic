import React from "react";
import { FacebookProvider, CustomChat } from "react-facebook";

const FacebookMsg = () => {
  return (
    <FacebookProvider appId="370154442571073" chatSupport>
      <CustomChat pageId="105105092370646" minimized={true} />
    </FacebookProvider>
  );
};

export default FacebookMsg;
