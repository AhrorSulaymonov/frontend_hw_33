import React from "react";
import { SidebarWrapper } from "./Sidebar.styles";
import Link from "next/link";
import { useRouter } from "next/router"; // useRouter ni import qilamiz

const Sidebar = () => {
  const router = useRouter(); // useRouter hookini ishlatamiz
  const menuItems = [
    {
      title: "O'quvchilar",
      route: "/students",
    },
    {
      title: "Sinflar",
      route: "/classes",
    },
    {
      title: "O'qituvchilar",
      route: "/teachers",
    },
    {
      title: "Maktab sozlamalari", // Yangi menyu
      route: "/school",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login"); // Kirish sahifasiga yo'naltirish
  };

  return (
    <SidebarWrapper>
      <div className="logo">Maktab Paneli</div>
      <div className="menu-items">
        {menuItems.map((mItem) => {
          return (
            <Link key={mItem.route} href={mItem.route} legacyBehavior>
              <a
                className={
                  router.pathname.startsWith(mItem.route) ? "active" : ""
                }
              >
                {mItem.title}
              </a>
            </Link>
          );
        })}
      </div>
      <div className="logout-section">
        <button onClick={handleLogout}>Chiqish</button>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
