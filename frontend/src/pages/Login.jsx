import { useState } from "react";
import {  Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  
  const handleForm = (event) => {
    setForm({...form, [event.target.name] : event.target.value})
  }
  
  axios.defaults.withCredentials = true;
  const loginUser = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", form)
      window.localStorage.setItem("token", response.data.token)
      window.location.href = "/";
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/3 shadow-lg p-5 space-y-5">
        <h1 className="text-center">Login</h1>
        <form className="space-y-3" onSubmit={loginUser}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input type="email" className="outline-none py-1 border border-gray-200 rounded-lg px-3" name="email" placeholder="example@gmail.com" onChange={handleForm} />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input type="password" className="outline-none py-1 border border-gray-200 rounded-lg px-3" name="password" placeholder="***" onChange={handleForm} />
          </div>
          <div className="flex flex-col space-y-1">
            <h1>Dont have an account? <Link to="/register" className="text-blue-400">Register</Link></h1>
          </div>
          <div className="flex flex-col space-y-1">
            <button type="submit" className="w-full bg-green-300 py-2 rounded-lg">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login