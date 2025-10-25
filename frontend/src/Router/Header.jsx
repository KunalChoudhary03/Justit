import AddToCart from '../Pages/AddToCart'
import { useDispatch } from 'react-redux'
import { rmvAll } from '../redux/Slices/Slice'
import { Link } from 'react-router-dom'
import ProfileButton from '../Components/ProfileButton'

const Header = () => {
  const dispatch = useDispatch()

  return (
    <nav className="flex justify-between items-center top-0 sticky bg-blue-400 p-4 shadow-md text-white z-20">
      <ul className="flex gap-8 text-xl font-medium">
         <li><Link to="/" className="hover:text-gray-200 transition">Home</Link></li>
         <li><Link to="/about" className="hover:text-gray-200 transition">About</Link></li>
         <li><Link to="/contact" className="hover:text-gray-200 transition">Contact</Link></li>
         <li><Link to="/service" className="hover:text-gray-200 transition">Service</Link></li>
      </ul>

      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(rmvAll())}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200"
        >
          Clear Cart
        </button>
        <AddToCart />
      <ProfileButton />
      </div>
    </nav>
  )
}

export default Header



