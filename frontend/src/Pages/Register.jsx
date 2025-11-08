import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/Thunk/AuthThunk';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "", adminPasskey: "" });
  const [registerError, setRegisterError] = useState();
  const [wantAdmin, setWantAdmin] = useState(false); // toggle for admin input
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate('/');
    } catch (error) {
      setRegisterError(error?.message || "User Already Exists");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {registerError && <p className='text-red-400'>{registerError}</p>}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              name="name"
              onChange={handleChange}
              value={data.name}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              name="email"
              onChange={handleChange}
              value={data.email}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              name="password"
              onChange={handleChange}
              value={data.password}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Checkbox to show admin input */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="wantAdmin"
              checked={wantAdmin}
              onChange={() => setWantAdmin(!wantAdmin)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
            />
            <label htmlFor="wantAdmin" className="text-gray-700 font-medium">
              I want to become an admin
            </label>
          </div>

          {/* Conditionally show admin passkey input */}
          {wantAdmin && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Admin's Passkey
              </label>
              <input
                name="adminPasskey"
                onChange={handleChange}
                value={data.adminPasskey}
                type="password"
                placeholder="Enter your Passkey to become an admin"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required={wantAdmin} // required only if admin checked
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
