import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import AnimatedLogo from '../Sidebar/AnimatedLogo';
import { FaChevronRight, FaChevronLeft, FaSignOutAlt, FaUsers, FaUserPlus, FaChartBar, FaCog, FaHome, FaCalendarAlt, FaFileAlt, FaFolderOpen, FaUserCircle } from 'react-icons/fa';
import { useNavigate, NavLink } from 'react-router-dom';

export const AdminSidebarItem = ({ icon, text, path, expanded = true, onClick }) => {
  return (
    <li>
      {path ? (
        <NavLink
          to={path}
          className={({ isActive }) => 
            `flex items-center px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all duration-200 group mb-1 ${
              isActive ? 'bg-slate-800 text-blue-400 font-semibold shadow-sm border border-slate-700' : ''
            }`
          }
        >
          <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{icon}</span>
          {expanded && <span className="ml-3 text-sm tracking-wide">{text}</span>}
        </NavLink>
      ) : (
        <button
          onClick={onClick}
          className="flex items-center w-full px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all duration-200 group mb-1"
        >
          <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{icon}</span>
          {expanded && <span className="ml-3 text-sm tracking-wide">{text}</span>}
        </button>
      )}
    </li>
  );
};

const AdminSidebar = ({ expanded, setExpanded }) => {
  const { session, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.removeItem('theme');
      navigate('/');
    } catch(error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <aside className={`fixed top-0 left-0 h-screen bg-[#0f172a] shadow-2xl z-50 transition-all duration-300 border-r border-slate-800 ${expanded ? 'w-64' : 'w-20'} hidden sm:block`}>
        <nav className="h-full flex flex-col">
          {/* Header */}
          <div className={`p-4 flex ${expanded ? 'flex-col items-center' : 'justify-between items-center'} bg-[#0f172a] sticky top-0 z-10 border-b border-slate-800/50`}>
            {expanded && (
              <button 
                className="absolute right-4 top-4 p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
                onClick={() => setExpanded(false)}
              >
                <FaChevronLeft size={14} />
              </button>
            )}
            
            <div className="overflow-hidden w-full text-center">
               <AnimatedLogo isVisible={expanded} />
               {!expanded && (
                 <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/20">
                    <FaHome size={20} />
                 </div>
               )}
            </div>
            
            {!expanded && (
              <button 
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700 mx-auto mt-2"
                onClick={() => setExpanded(true)}
              >
                <FaChevronRight size={14} />
              </button>
            )}
          </div>

          {/* Navigation - Scrollable */}
          <ul className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
            <AdminSidebarItem 
              icon={<FaHome className="w-5 h-5" />} 
              text="Dashboard"
              path="/admin/dashboard"
              expanded={expanded}
            />
            <div className="my-4 border-t border-slate-800/50 mx-2" />
            <AdminSidebarItem 
              icon={<FaUsers className="w-5 h-5" />} 
              text="Manage Employees"
              path="/admin/employees"
              expanded={expanded}
            />
            <AdminSidebarItem 
              icon={<FaUserPlus className="w-5 h-5" />} 
              text="Add Employee"
              path="/admin/add-employee"
              expanded={expanded}
            />
            <AdminSidebarItem 
              icon={<FaCalendarAlt className="w-5 h-5" />} 
              text="Leave Requests"
              path="/admin/leave-requests"
              expanded={expanded}
            />
            <AdminSidebarItem 
              icon={<FaChartBar className="w-5 h-5" />} 
              text="Reports"
              path="/admin/reports"
              expanded={expanded}
            />
            <AdminSidebarItem 
              icon={<FaFileAlt className="w-5 h-5" />} 
              text="Daily Reports"
              path="/admin/daily-reports"
              expanded={expanded}
            />
            <AdminSidebarItem 
              icon={<FaFolderOpen className="w-5 h-5" />} 
              text="Projects"
              path="/admin/projects"
              expanded={expanded}
            />
            <AdminSidebarItem 
              icon={<FaCog className="w-5 h-5" />} 
              text="Settings"
              path="/admin/AdminSettings"
              expanded={expanded}
            />
          </ul>

          {/* Footer - Profile */}
          <div className="p-4 border-t border-slate-800/50 bg-[#0f172a]">
            {expanded ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/30">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <FaUserCircle className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-200 truncate capitalize">
                      {session?.user?.email?.split('@')[0] || 'Admin'}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate lowercase">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all duration-200 rounded-xl border border-red-500/10 group"
                >
                  <FaSignOutAlt className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>{t('signOut')}</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 border border-slate-700/50">
                  <FaUserCircle size={24} />
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                  title={t('signOut')}
                >
                  <FaSignOutAlt size={20} />
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}} />
    </>
  );
};

export default AdminSidebar;