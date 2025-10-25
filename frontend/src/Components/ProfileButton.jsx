import React from 'react'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom';

const ProfileButton = () => {
    const navigate = useNavigate();
  return (
    <div onClick={()=>navigate('/Profile')} className="cursor-pointer bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
      Profile
    </div>
  )
}

export default ProfileButton
