import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Bookmark, Settings, HelpCircle, Database, Bell } from 'lucide-react';
import { isAdmin } from '../services/authService';

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const userIsAdmin = isAdmin();
  
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
          
          {userIsAdmin && (
            <div className="pt-4 pb-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-base-content/60 px-3 mb-2">
                Management
              </div>
              
              <NavLink 
                to="/admin/courses" 
                className={({ isActive }) => 
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-content' 
                      : 'hover:bg-base-200'
                  }`
                }
              >
                <Database size={20} />
                <span>Courses</span>
              </NavLink>
              
              <NavLink 
                to="/admin/notifications" 
                className={({ isActive }) => 
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-content' 
                      : 'hover:bg-base-200'
                  }`
                }
              >
                <Bell size={20} />
                <span>Notifications</span>
              </NavLink>
            </div>
          )}
          
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
