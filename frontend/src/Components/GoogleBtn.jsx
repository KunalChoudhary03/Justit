import axios from "axios";

const GoogleBtn = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  
  const handleGoogleBtn = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleBtn}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        className="w-5 h-5"
      />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
};

export default GoogleBtn;
