"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import UserProfile from "./UserProfile";
import MobileMenuButton from "./MobileMenuButton";
import SidebarMenuButton from "./SidebarMenuButton";
import axios from "axios";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userTarget, setUserTarget] = useState(null);
  const [storedUuid, setStoredUuid] = useState(null);

  useEffect(() => {
    const uuid = localStorage.getItem("user_uuid");
    setStoredUuid(uuid);
  }, []);

  useEffect(() => {
    console.log("storedUuid state updated:", storedUuid);
  }, [storedUuid]);

  useEffect(() => {
    const uuid = localStorage.getItem("user_uuid");
    const FetchUserData = async () => {
      try {
        const statsResponse = await fetch(
          // "http://localhost:8080/user-schedules/records?userUuid=" + data.userUuid,
          `http://localhost:8080/user-stats?userUuid=${uuid}`,

          {
            method: "GET",
            credentials: "include", // Include session cookies
          }
        );

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setUserData(statsData);
          console.log("User stats:", statsData);
        } else {
          const statsError = await statsResponse.text();
          console.error("User stats failed:", statsError);
        }
      } catch (error) {
        console.error("Error during login or fetching gym data:", error);
      }
    };

    FetchUserData();
  }, []);

  useEffect(() => {
    const uuid = localStorage.getItem("user_uuid");
    const FetchUserTarget = async () => {
      try {
        const statsResponse = await fetch(
          // "http://localhost:8080/user-schedules/records?userUuid=" + data.userUuid,
          `http://localhost:8080/user-target?userUuid=${uuid}`,

          {
            method: "GET",
            credentials: "include", // Include session cookies
          }
        );

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setUserTarget(statsData);
          console.log("User target:", statsData);
        } else {
          const statsError = await statsResponse.text();
          console.error("User stats failed:", statsError);
        }
      } catch (error) {
        console.error("Error during login or fetching gym data:", error);
      }
    };

    FetchUserTarget();
  }, []);

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
      <MainContent
        userData={userData}
        userUuid={storedUuid}
        userTarget={userTarget}
      />
      <UserProfile
        isOpen={isMobileMenuOpen}
        toggleOpen={toggleMobileMenu}
        userData={userData}
        userUuid={storedUuid}
      />
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
