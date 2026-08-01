import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { cart, wishlist, user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Jewelry', path: '/shop?category=Jewelry' },
    { label: 'Watches', path: '/shop?category=Watches' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path.includes('category=')) {
      return location.search === path.substring(path.indexOf('?'));
    }
    return location.pathname === path && location.search === '';
  };

  return (
    <header className="w-full z-40 bg-white" id="main_header">
      {/* Announcement Bar */}
      <div className="w-full bg-[#0f2c59] text-[#c8a35f] text-center py-2 px-4 text-[10px] tracking-[0.2em] uppercase font-sans font-medium flex items-center justify-center gap-6">
        <span>COMPLIMENTARY SECURE INSURED SHIPPING OVER $2,000</span>
        <span className="hidden md:inline-block">|</span>
        <span className="hidden md:inline-block">LIFETIME CRAFTSMANSHIP GUARANTEE</span>
      </div>

      {/* Main Navbar */}
      <div className="w-full border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col justify-center items-start group" id="logo_link">
            <span className="font-serif text-xl md:text-2xl tracking-[0.15em] text-[#0f2c59] font-bold transition-colors">
              LUX GROWN
            </span>
            <span className="font-sans text-[8px] tracking-[0.3em] text-[#c8a35f] uppercase mt-0.5">
              LAB DIAMONDS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 font-sans text-xs uppercase tracking-[0.15em] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`transition-colors duration-200 py-2 relative ${
                  isActive(link.path) 
                    ? 'text-[#0f2c59] font-semibold' 
                    : 'text-gray-500 hover:text-[#0f2c59]'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="activeUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c8a35f]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Icon Toolbar */}
          <div className="flex items-center space-x-5 text-gray-600">
            {/* Search Toggle */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 hover:text-[#0f2c59] transition-colors focus:outline-none"
                aria-label="Search"
                id="search_toggle_btn"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Account Icon */}
            <Link 
              to="/account" 
              className="p-1.5 hover:text-[#0f2c59] transition-colors flex items-center gap-1 focus:outline-none"
              aria-label="Account"
              id="account_link_btn"
            >
              <User size={18} />
              {user && (
                <span className="hidden md:inline font-sans text-[10px] tracking-wider uppercase text-gray-500 hover:text-[#0f2c59]">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </Link>

            {/* Wishlist Link */}
            <Link 
              to="/account?tab=wishlist" 
              className="p-1.5 hover:text-[#0f2c59] transition-colors relative focus:outline-none"
              aria-label="Wishlist"
              id="wishlist_link_btn"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c8a35f] text-white text-[8px] font-mono h-4 w-4 rounded-full flex items-center justify-center scale-90">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link 
              to="/cart" 
              className="p-1.5 hover:text-[#0f2c59] transition-colors relative focus:outline-none"
              aria-label="Shopping Cart"
              id="cart_link_btn"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0f2c59] text-white text-[8px] font-mono h-4 w-4 rounded-full flex items-center justify-center scale-90">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 hover:text-[#0f2c59] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile_menu_toggle_btn"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Expandable Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-white border-b border-gray-100 py-6 px-6 absolute top-[112px] left-0 right-0 z-30 shadow-md"
            id="search_overlay_panel"
          >
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="SEARCH OUR EXQUISITE COLLECTIONS (e.g. SOLITAIRE, OVAL, 18K White Gold...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-b border-[#0f2c59]/20 py-3 text-sm font-sans tracking-wide focus:border-[#0f2c59] focus:outline-none placeholder-gray-400 text-gray-800 uppercase"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="bg-[#0f2c59] text-white px-6 py-2.5 rounded-sm font-sans text-xs tracking-widest hover:bg-[#c8a35f] transition-colors duration-300"
                  id="search_submit_btn"
                >
                  SEARCH
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-[360px] bg-white z-50 p-8 shadow-2xl flex flex-col justify-between lg:hidden"
              id="mobile_drawer_panel"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                  <span className="font-serif text-lg tracking-[0.15em] text-[#0f2c59] font-bold">LUX GROWN</span>
                  <button onClick={() => setMobileOpen(false)} className="p-1 focus:outline-none" id="mobile_close_btn">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col space-y-6 font-sans text-sm uppercase tracking-wider font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`py-2 border-b border-gray-50 ${isActive(link.path) ? 'text-[#c8a35f]' : 'text-gray-700 hover:text-[#0f2c59]'}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="border-t border-gray-100 pt-8 flex flex-col space-y-4">
                {user ? (
                  <div className="flex flex-col space-y-3">
                    <span className="font-sans text-xs text-gray-500 tracking-wider">SIGNED IN AS: {user.name}</span>
                  </div>
                ) : (
                  <Link
                    to="/account"
                    onClick={() => setMobileOpen(false)}
                    className="w-full bg-[#0f2c59] text-white py-3 text-center font-sans text-xs tracking-widest uppercase hover:bg-[#c8a35f] transition-colors"
                    id="mobile_login_btn"
                  >
                    Log In / Register
                  </Link>
                )}
                <div className="text-center font-sans text-[10px] text-gray-400 tracking-widest uppercase">
                  © 2026 LUX GROWN JEWELRY
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
