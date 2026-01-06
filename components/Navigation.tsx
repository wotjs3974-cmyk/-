
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'PHILOSOPHY' },
    { path: '/resume', label: 'RESUME' },
    { path: '/works', label: 'WORKS' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Logo Section - Always visible */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
          <div className="w-7 h-7 md:w-10 md:h-10 bg-[#11d493] rounded-none flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(17,212,147,0.3)]">
            <span className="text-black font-black text-lg md:text-2xl leading-none">S</span>
          </div>
          <span className="font-black text-[12px] md:text-xl tracking-tighter text-white">PORTFOLIO</span>
        </Link>
        
        {/* Menu Section - Scrollable on small screens */}
        <div className="flex items-center gap-2 sm:gap-6 md:gap-10 overflow-hidden">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-10 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-[8px] md:text-[10px] font-black tracking-[0.1em] md:tracking-[0.2em] py-2 transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  isActive(item.path) 
                    ? 'text-white' 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {item.label}
                <div 
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#11d493] transition-all duration-300 ${
                    isActive(item.path) ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>
            ))}
          </div>
          <Link 
            to="/admin" 
            className="w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors text-neutral-500 flex-shrink-0 ml-1"
          >
            <Lock size={10} className="md:w-[14px] md:h-[14px]" />
          </Link>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
