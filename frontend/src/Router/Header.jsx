import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AddToCart from '../Pages/AddToCart';
import ProfileButton from '../Components/ProfileButton';
import { setSearchQuery } from '../redux/Slices/SearchSlice';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <nav className="flex justify-between items-center sticky top-0 bg-gradient-to-r from-gray-900 to-gray-600   px-5 py-2 shadow-lg text-white z-50 ">
      
      <ul className="flex gap-8 text-lg font-semibold">
        <li><Link to="/" className="hover:text-gray-200 transition-colors">Home</Link></li>
        <li><Link to="/about" className="hover:text-gray-200 transition-colors">About</Link></li>
        <li><Link to="/contact" className="hover:text-gray-200 transition-colors">Contact</Link></li>
        <li><Link to="/service" className="hover:text-gray-200 transition-colors">Service</Link></li>
      </ul>

      <div className="relative w-150">
        <input
          type="text"
          placeholder="Search for products..."
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full pl-12 pr-4 py-2 text-gray-700 bg-white rounded-full shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400 transition-all"
        />
        <svg
          className="absolute left-4 top-2.5 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2M10 18a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-8">
        <ProfileButton />
        <AddToCart />
      </div>
    </nav>
  );
};

export default Header;


