import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const ProfileButton = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/profile')} 
      className="cursor-pointer flex flex-col items-center group"
    >
      <FaUserCircle className="text-4xl text-white group-hover:text-yellow-300 transition-colors" />
      <span className="text-sm font-medium mt-1 group-hover:text-yellow-100">Login</span>
    </div>
  );
};

export default ProfileButton;
