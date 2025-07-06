import React, { useState, useEffect, useRef } from 'react';
import { LogOut, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleUpgrade = () => {
    setDropdownOpen(false);
    navigate('/pricing');
  };

  const handleLogout = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      credentials: 'include', 
    });

    if (!res.ok) {
      throw new Error('Logout failed');
    }

    setDropdownOpen(false);
    navigate('/loginsignup');
  } catch (err) {
    console.error('Logout error:', err);
  }
};


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent backdrop-blur-lg border-b border-gray-800/40" style={{minHeight: '64px'}}>
      <div className="flex items-center justify-end w-full min-h-16 h-16 px-2 sm:px-6">
        {/* Profile Icon and Dropdown */}
        <div className="relative mr-4 sm:mr-8" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
            aria-label="Open profile menu"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            {/* Avatar initials or icon can go here */}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-lg rounded-md shadow-lg z-20 border border-gray-700/50 overflow-hidden">
              <div className="py-1">
                <button
                  onClick={handleUpgrade}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-300 hover:bg-purple-500/30 hover:text-white transition-all duration-200"
                >
                  <Zap size={16} />
                  <span>Upgrade Plan</span>
                </button>
                <div className="my-1 h-px bg-gray-700/50" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-300 hover:bg-red-500/30 hover:text-white transition-all duration-200"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
