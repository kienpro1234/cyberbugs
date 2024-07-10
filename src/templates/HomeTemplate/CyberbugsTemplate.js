import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import "../../index.css";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberbugs from "../../components/Cyberbugs/ModalCyberbugs/ModalCyberbugs";

export default function UserLoginTemplate({ Component }) {
  const { Sider, Content, Header, Footer } = Layout;
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });


  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);

  return (
    <>
      <div className="jira">
        <ModalCyberbugs />
        {/* Sider Bar  */}
        <SidebarCyberbugs />
        {/* Menu */}
        <MenuCyberbugs />
        {/* {/* {/* Main Board * /} * /} */}
        <Component/>
      </div>
    </>
  );
}
