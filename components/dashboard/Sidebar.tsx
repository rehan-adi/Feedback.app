import Link from 'next/link';
import { User, MessageCircle } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-56 h-[89vh] fixed left-0 mt-20 dark:bg-black border-r dark:border-white dark:border-opacity-15 bg-white dark:text-white text-black">
      <div className="p-4">
        <h2 className="text-lg font-medium">Dashboard</h2>
        <ul className="mt-6">
          <li className="mb-2">
            <Link href="/dashboard/users" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <User className="w-5 h-5 mr-2" />
              Users
            </Link>
          </li>
          <li>
            <Link href="/dashboard/messages" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <MessageCircle className="w-5 h-5 mr-2" />
              Messages
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;