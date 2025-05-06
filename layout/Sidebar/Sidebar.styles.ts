import styled from "styled-components";

export const SidebarWrapper = styled.nav`
  width: 240px;
  height: 100vh;
  background-color: #001529;
  color: white;
  display: flex;
  flex-direction: column; // Elementlarni vertikal joylashtirish

  .logo {
    padding: 10px 15px; // Paddingni o'zgartirdim
    height: 55px;
    display: flex;
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
    border-bottom: 1px solid #000c17; // Ajratuvchi chiziq
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 5px; // Oraliqni kamaytirdim
    padding: 15px 10px; // Paddingni o'zgartirdim
    flex-grow: 1; // Qolgan bo'sh joyni egallash uchun

    a {
      color: #a6adb4;
      text-decoration: none;
      padding: 10px 15px;
      border-radius: 4px;
      transition: background-color 0.2s, color 0.2s;

      &:hover {
        background-color: #1890ff; // Ant Design primary color
        color: white;
      }

      &.active {
        background-color: #1890ff;
        color: white;
        font-weight: bold;
      }
    }
  }

  .logout-section {
    padding: 15px;
    border-top: 1px solid #000c17; // Ajratuvchi chiziq

    button {
      width: 100%;
      padding: 10px;
      background-color: #ff4d4f; // Qizil rang
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
      transition: background-color 0.2s;

      &:hover {
        background-color: #cf1322; // To'qroq qizil
      }
    }
  }
`;
