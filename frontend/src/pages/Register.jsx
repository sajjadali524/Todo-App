import { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();
  
  const handleForm = (event) => {
    setForm({...form, [event.target.name] : event.target.value})
  }
  const registerUser = async(event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", form)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/3 shadow-lg p-5 space-y-5">
        <h1 className="text-center">Register</h1>
        <form className="space-y-3" onSubmit={registerUser}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name">Name</label>
            <input type="text" className="outline-none py-1 border border-gray-200 rounded-lg px-3" name="name" placeholder="john doe" onChange={handleForm} />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input type="email" className="outline-none py-1 border border-gray-200 rounded-lg px-3" name="email" placeholder="example@gmail.com" onChange={handleForm} />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input type="password" className="outline-none py-1 border border-gray-200 rounded-lg px-3" name="password" placeholder="***" onChange={handleForm} />
          </div>
          <div className="flex flex-col space-y-1">
            <h1>Already have an account? <Link to="/login" className="text-blue-400">Login</Link></h1>
          </div>
          <div className="flex flex-col space-y-1">
            <button type="submit" className="w-full bg-green-300 py-2 rounded-lg">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register