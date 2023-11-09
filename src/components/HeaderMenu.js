import React, { useState } from "react";
import "./HeaderMenu.css";

const MenuItem = ({ active, children, onClick }) => (
  <div className={`menu-item ${active ? 'active' : ''}`} onClick={onClick}>
    {children}
  </div>
);

const HeaderMenu = () => {
  const [activeItem, setActiveItem] = useState("정보");

  const handleItemClick = (item) => {
    setActiveItem(item === activeItem ? '' : item);
  };

  return (
    <div>
      <div className="logo"></div>
      <div className="menu">
        <MenuItem active={activeItem === "정보"} onClick={() => handleItemClick("정보")}>
          정보
        </MenuItem>
        <MenuItem active={activeItem === "리뷰"} onClick={() => handleItemClick("리뷰")}>
          리뷰
        </MenuItem>
      </div>
    </div>
  );
};

export default HeaderMenu;
