"use client";

import Link from 'next/link';
import { User, Home, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isUsersPage = pathname === '/dashboard/users';
  const isDashboardPage = pathname === '/dashboard';
  const heading = isUsersPage ? 'Dashboard/Users' : 'Dashboard';

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger menu for small screens - hide when sidebar is open */}
      {!isSidebarOpen && (
        <button 
          onClick={toggleSidebar}
          className="lg:hidden fixed top-28 left-0 z-50 p-2 rounded-r-full bg-black dark:bg-gray-800 text-white shadow-lg transform -translate-y-1/2"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-[243px] h-full dark:bg-black bg-white dark:text-white text-black border-r dark:border-white dark:border-opacity-15 p-4 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:flex lg:flex-col lg:h-[89vh] lg:mt-20`}
      >
        <h2 className="text-lg font-medium mt-20 lg:mt-0">{heading}</h2>
        <ul className="mt-6">
          <li className="mb-2 text-sm font-semibold">
            <Link
              href="/dashboard"
              className={`flex items-center p-2 pr-6 rounded ${
                isDashboardPage
                  ? 'bg-black text-white dark:bg-[#27272A]'
                  : 'hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]'
              }`}
            >
              <Home className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="mb-2 text-sm font-semibold">
            <Link
              href="/dashboard/users"
              className={`flex items-center p-2 pr-6 rounded ${
                isUsersPage
                  ? 'bg-black text-white dark:bg-[#27272A]'
                  : 'hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]'
              }`}
            >
              <User className="w-5 h-5 mr-2" />
              Users
            </Link>
          </li>
        </ul>
      </div>

      {/* Backdrop for when sidebar is open on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
