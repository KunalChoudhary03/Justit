import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/Thunk/AuthThunk';
import { resetAuth } from '../redux/Slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import Login from '../Pages/Login';

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state)=>state.auth.token);
  console.log(token);
  const navigate  = useNavigate();
  const user = useSelector((state)=> state.auth.user)
  const handleLogout = async ()=>{
    try{
  await  dispatch(logoutUser()).unwrap();
  dispatch(resetAuth());
  navigate("/login")
    }
  catch(error){
    console.log(error);
  }
 }
 if(!token){
  return (
   <div>
    <p>You are Not logged in Please login</p>
    <Login />
   </div>
 )
 }
 return (
    <div>
      <p>Wellcome {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

 
}

export default Profile
