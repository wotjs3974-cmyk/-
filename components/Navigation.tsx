import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';

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
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#11d493] rounded-none flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(17,212,147,0.3)]">
            <span className="text-black font-black text-xl md:text-2xl leading-none">S</span>
          </div>
          <span className="font-black text-lg md:text-xl tracking-tighter text-white hidden sm:inline">PORTFOLIO</span>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-10">
          <div className="flex items-center gap-3 md:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-[8px] md:text-[10px] font-black tracking-[0.1em] md:tracking-[0.2em] py-2 transition-all duration-300 ${
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

          {/* Admin Entry Button */}
          <Link 
            to="/admin" 
            className="p-2 text-neutral-600 hover:text-[#11d493] transition-colors"
            title="Admin Settings"
          >
            <Settings size={16} className="md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;