import React from "react";
import { SidebarWrapper } from "./Sidebar.styles";
import Link from "next/link";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Students",
      route: "/students",
    },
    {
      title: "Classes",
      route: "/classes",
    },
    {
      title: "Teachers",
      route: "/teachers",
    },
  ];

  return (
    <SidebarWrapper>
      <div className="logo">Logo side</div>
      <div className="menu-items">
        {menuItems.map((mItem) => {
          return (
            <Link key={mItem.route} href={mItem.route}>
              {mItem.title}
            </Link>
          );
        })}
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
