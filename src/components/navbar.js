import { React } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

  let navigate = useNavigate();

  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate("/Login");
  }

  return (
    <div id='navbar'>
      <div id='logo'><a href={`${localStorage.getItem('token') ? "/Notes" : "/"}`}><b>iNoteBook</b></a></div>

      {!localStorage.getItem('token') ? <div>
        <Link to="/Login" ><button style={{ backgroundColor: `${location.pathname === "/Login" ? "rgb(219, 70, 70)" : ""}` }} id='loginbutton'>Login</button></Link>
        <Link to="/Signup"><button style={{ backgroundColor: `${location.pathname === "/Signup" ? "rgb(219, 70, 70)" : ""}` }} id='signupbutton'>Sign Up</button></Link>
      </div> : <div><div id='useremail' >{localStorage.getItem('currentUser')}</div><button id='logoutbutton' onClick={handleLogout}>Logout</button></div>}
    </div>
  )
}

export default Navbar