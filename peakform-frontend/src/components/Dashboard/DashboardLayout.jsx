"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import UserProfile from "./UserProfile";
import MobileMenuButton from "./MobileMenuButton";
import SidebarMenuButton from "./SidebarMenuButton";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Close mobile menus when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
      setIsMobileSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close sidebar if opening menu
    if (!isMobileMenuOpen) setIsMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
    // Close menu if opening sidebar
    if (!isMobileSidebarOpen) setIsMobileMenuOpen(false);
  };

  return (
    <main className="flex flex-wrap gap-9 items-start self-stretch my-auto min-w-60 max-md:max-w-full relative">
      <Sidebar isOpen={isMobileSidebarOpen} toggleOpen={toggleMobileSidebar} />
      <MainContent />
      <UserProfile isOpen={isMobileMenuOpen} toggleOpen={toggleMobileMenu} />
      {isMobile && (
        <>
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            toggleOpen={toggleMobileMenu}
          />
          <SidebarMenuButton
            isOpen={isMobileSidebarOpen}
            toggleOpen={toggleMobileSidebar}
          />
        </>
      )}
    </main>
  );
};

export default DashboardLayout;
