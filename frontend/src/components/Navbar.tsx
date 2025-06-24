import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-purple-400 border-purple-500'
      : 'text-gray-300 border-transparent hover:text-white hover:border-purple-500';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="border-b border-gray-800 relative z-10">
      {/* Add padding-right to compensate for scrollbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Logo - Always visible */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-lg sm:text-xl font-bold">PDFQG</span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-1 flex-shrink-0">
          <Link to="/product" className={`font-medium px-3 xl:px-4 py-2 border-b-2 transition-colors whitespace-nowrap text-sm xl:text-base ${isActive('/product')}`}>Product</Link>
          <span className="text-gray-600 text-sm">|</span>
          <Link to="/pricing" className={`font-medium px-3 xl:px-4 py-2 border-b-2 transition-colors whitespace-nowrap text-sm xl:text-base ${isActive('/pricing')}`}>Pricing</Link>
          <span className="text-gray-600 text-sm">|</span>
          <Link to="/resources" className={`font-medium px-3 xl:px-4 py-2 border-b-2 transition-colors whitespace-nowrap text-sm xl:text-base ${isActive('/resources')}`}>Resources</Link>
          <span className="text-gray-600 text-sm">|</span>
          <Link to="/features" className={`font-medium px-3 xl:px-4 py-2 border-b-2 transition-colors whitespace-nowrap text-sm xl:text-base ${isActive('/features')}`}>Features</Link>
          <span className="text-gray-600 text-sm">|</span>
          <Link to="/about" className={`font-medium px-3 xl:px-4 py-2 border-b-2 transition-colors whitespace-nowrap text-sm xl:text-base ${isActive('/about')}`}>About</Link>
        </div>

        {/* Right side - CTA and Mobile Menu */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          {/* CTA Button */}
          <Link
            to="/loginsignup"
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 sm:px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Try it free</span>
            <span className="sm:hidden">Try free</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-black">
          <div className="px-4 py-4 space-y-2">
            <Link 
              to="/product" 
              className={`block font-medium py-3 px-4 rounded-lg transition-colors ${location.pathname === '/product' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Product
            </Link>
            <Link 
              to="/pricing" 
              className={`block font-medium py-3 px-4 rounded-lg transition-colors ${location.pathname === '/pricing' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/resources" 
              className={`block font-medium py-3 px-4 rounded-lg transition-colors ${location.pathname === '/resources' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              to="/features" 
              className={`block font-medium py-3 px-4 rounded-lg transition-colors ${location.pathname === '/features' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className={`block font-medium py-3 px-4 rounded-lg transition-colors ${location.pathname === '/about' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}


    </nav>
  );
};

export default Navbar;