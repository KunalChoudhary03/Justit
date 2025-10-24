import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate();
  const handleSubmit = ()=>{
    navigate('/register')
  }
  return (
    <div>
      <button onClick={handleSubmit}>Profile</button>
    </div>
  )
}

export default Profile
