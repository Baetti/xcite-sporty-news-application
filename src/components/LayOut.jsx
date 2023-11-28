import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { MdMenuOpen } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

function LayOut(props) {
  const [showSideBar, setShowSideBar] = useState(true);
  return (
    <div className="layout flex w-full h-full">
      <div className="sidebar bg-primary">
        <Sidebar showSideBar={showSideBar} />
      </div>

      <div className="w-full h-full">
        <div className="header bg-primary h-20 w-full flex items-center justify-between">
          <MdMenuOpen
            color="white"
            size={50}
            className="cursor-pointer"
            onClick={() => setShowSideBar(!showSideBar)}
          />
          <div className="mr-5 text-white flex item-center space-x-2">
            <FaRegUserCircle />
            <span>
              {JSON.parse(
                localStorage.getItem("xcitesporty-user")
              ).name.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="content max-h[85vh] overflow-y-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default LayOut;
