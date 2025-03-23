import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Bookmark, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  return (
    <aside className={`bg-base-100 h-screen shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 lg:w-64'} overflow-hidden`}>
      <div className="p-4">
        <div className="space-y-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-base-200'
              }`
            }
            end
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/courses" 
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-base-200'
              }`
            }
          >
            <BookOpen size={20} />
            <span>My Courses</span>
          </NavLink>
          
          <NavLink 
            to="/bookmarks" 
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-base-200'
              }`
            }
          >
            <Bookmark size={20} />
            <span>Bookmarks</span>
          </NavLink>
          
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-base-200'
              }`
            }
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
          
          <NavLink 
            to="/help" 
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-content' 
                  : 'hover:bg-base-200'
              }`
            }
          >
            <HelpCircle size={20} />
            <span>Help Center</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
