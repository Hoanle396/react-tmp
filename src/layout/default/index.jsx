import React from "react";

import { NavSidebar } from "../../components/SideBar";
import BodyWrapper from "./Body";
import './index.css'
const Layout = ({ children }) => {
  return (
    <BodyWrapper>
      <div className="flex">
        <NavSidebar />

        <div className="flex flex-col flex-1">
          <main className="content">
              <div
                className="content-box"
                style={{ flexGrow: 2, flexBasis: "0%" }}
              >
                {children}
              </div>
          </main>
        </div>
      </div>
    </BodyWrapper>
  );
};
export default Layout