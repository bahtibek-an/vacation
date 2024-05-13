import React, { ReactNode } from "react";
import Header from "../Header/Header.tsx";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
