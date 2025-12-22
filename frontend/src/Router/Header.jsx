import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AddToCart from '../Pages/AddToCart';
import ProfileButton from '../Components/ProfileButton';
import { setSearchQuery } from '../redux/Slices/SearchSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-600 px-4 md:px-5 py-2 shadow-lg text-white z-50">
      <div className="flex items-center justify-between">
        {/* Brand + Mobile menu button */}
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold tracking-wide">Justit</Link>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 text-lg font-semibold">
          <li><Link to="/" className="hover:text-gray-200 transition-colors">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-200 transition-colors">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-200 transition-colors">Contact</Link></li>
          <li><Link to="/service" className="hover:text-gray-200 transition-colors">Service</Link></li>
        </ul>

        {/* Desktop search */}
        <div className="hidden md:block relative w-64">
          <input
            type="text"
            placeholder="Search for products..."
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-2 text-gray-700 bg-white rounded-full shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400 transition-all"
          />
          <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10"
                  aria-label="Toggle Menu"
                  onClick={() => setOpen(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <ProfileButton />
          <AddToCart />
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mt-3 space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-2 text-gray-700 bg-white rounded-full shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
            />
            <svg className="absolute left-1 top-2.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
          <ul className="flex flex-col gap-2 text-base font-medium">
            <li><Link onClick={() => setOpen(false)} to="/" className="block px-2 py-2 rounded hover:bg-white/10">Home</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/service" className="block px-2 py-2 rounded hover:bg-white/10">Service</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/contact" className="block px-2 py-2 rounded hover:bg-white/10">Contact</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/about" className="block px-2 py-2 rounded hover:bg-white/10">About</Link></li>
          
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;


