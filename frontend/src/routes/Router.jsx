import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Todo from "../pages/Todo";
import Dashboard from "../pages/Dashboard";
import Edit from "../pages/Edit";

const Router = () => {
  const isLoggedin = localStorage.getItem("token");
  return (
    <Routes>
        <Route path="/" element={isLoggedin ? <Dashboard /> : <Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  )
}

export default Router