"use client";

import Link from 'next/link';
import { User, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const isUsersPage = pathname === '/dashboard/users';
  const isDashboardPage = pathname === '/dashboard';
  const heading = isUsersPage ? 'Dashboard/Users' : 'Dashboard';

  return (
    <div className="w-[243px] lg:flex hidden h-[89vh] fixed left-0 mt-20 dark:bg-black border-r dark:border-white dark:border-opacity-15 bg-white dark:text-white text-black">
      <div className="p-4">
        <h2 className="text-lg font-medium">{heading}</h2>
        <ul className="mt-6">
          <li className="mb-2">
            <Link
              href="/dashboard"
              className={`flex items-center p-2 pr-6 rounded ${
                isDashboardPage
                  ? 'bg-slate-100 dark:bg-gray-900'
                  : 'hover:bg-slate-100 dark:hover:bg-gray-900'
              }`}
            >
              <Home className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/dashboard/users"
              className={`flex items-center p-2 pr-6 rounded ${
                isUsersPage
                  ? 'bg-slate-100 dark:bg-gray-900'
                  : 'hover:bg-slate-100 dark:hover:bg-gray-900'
              }`}
            >
              <User className="w-5 h-5 mr-2" />
              Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
