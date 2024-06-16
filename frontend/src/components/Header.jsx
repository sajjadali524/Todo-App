import { Link } from "react-router-dom"
import axios from "axios";

const Header = () => {
  const isLoggedin = window.localStorage.getItem("token");

  const logoutUser = async(e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:8000/api/auth/logout");
      window.localStorage.removeItem("token");
      window.location.href="/";
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex items-center justify-around bg-green-500 text-center py-3">
      <Link to="/">Logo</Link>
      <div className="flex items-center justify-center space-x-20">
        <Link to={isLoggedin ? "/" : "/login"}>{isLoggedin ? "Dashboard" : "Login"}</Link>
        <Link to={isLoggedin ? "/todo" : "/register"}>{isLoggedin ? "Todo" : "Register"}</Link>
        {isLoggedin && <button onClick={logoutUser}>Logout</button>}
      </div>
    </div>
  )
}

export default Header