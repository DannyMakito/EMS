import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import AnimatedLogo from './AnimatedLogo';
import { FaChevronRight, FaChevronLeft, FaSignOutAlt, FaComments, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SidebarContext = React.createContext();

export const SidebarItem = ({ icon, text, path, onClick }) => {
  const { expanded } = React.useContext(SidebarContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick();
    if (path) navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200 rounded-lg group mb-1`}
    >
      <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      {expanded && <span className="ml-3 font-medium text-sm tracking-wide">{text}</span>}
    </button>
  );
};

const Sidebar = ({ children }) => {
  const { session, signOut } = useAuth();
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(true);
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
    <SidebarContext.Provider value={{ expanded }}>
      <aside className={`fixed inset-y-0 left-0 z-50 bg-[#1e293b] shadow-xl transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}>
        <nav className="h-full flex flex-col">
          {/* Header */}
          <div className={`p-4 flex ${expanded ? 'flex-col items-center' : 'justify-between items-center'} bg-[#1e293b] sticky top-0 z-10 border-b border-slate-700/50`}>
            {expanded && (
              <button 
                className="absolute right-4 top-4 p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
                onClick={() => setExpanded(false)}
              >
                <FaChevronLeft size={14} />
              </button>
            )}
            
            <div className="overflow-hidden w-full">
               <AnimatedLogo isVisible={expanded} />
               {!expanded && (
                 <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white mx-auto shadow-lg mb-0.5">
                    <span className="text-xs font-bold">G</span>
                 </div>
               )}
            </div>
            
            {!expanded && (
              <button 
                className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 mx-auto mt-2"
                onClick={() => setExpanded(true)}
              >
                <FaChevronRight size={14} />
              </button>
            )}
          </div>

          {/* Nav Links */}
          <ul className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
            {children}
            <div className="my-4 border-t border-slate-700/30" />
            <SidebarItem 
              icon={<FaComments className="w-5 h-5" />}
              text={t('chat')}
              path="/chat"
            />
          </ul>

          {/* Footer / User Profile */}
          <div className="p-4 border-t border-slate-700/50 bg-[#1e293b]/50 backdrop-blur-sm">
            {expanded ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/40">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <FaUserCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-200 truncate capitalize">
                      {session?.user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate lowercase">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors rounded-lg border border-red-500/10"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span>{t('signOut')}</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <FaUserCircle className="w-5 h-5" />
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                  title={t('signOut')}
                >
                  <FaSignOutAlt className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}} />
    </SidebarContext.Provider>
  );
};

export default Sidebar;
