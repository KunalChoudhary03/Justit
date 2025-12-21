import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/Thunk/AuthThunk';
import { resetAuth } from '../redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import Login from '../Pages/Login';
import OrderBtn from './OrderBtn';

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

const handleLogout = async () => {
  try {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    await dispatch(logoutUser()).unwrap();

    dispatch(resetAuth());
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};


  if (!token) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-2">Welcome 👋</h1>
        <p className="text-lg font-medium text-blue-600">{user?.name || 'User'}</p>

        <div className="flex flex-col mt-6 gap-3">
          {user?.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 shadow-md"
            >
              Go to Admin Dashboard
            </button>
          )}
          <OrderBtn />
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
