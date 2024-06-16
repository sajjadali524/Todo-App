import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom"

const Todo = () => {
  const [form, setForm] = useState({title: ""})
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/todo/read', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
  
    fetchTodos();
  }, []);

  const addTodo = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/todo/create", form, {withCredentials: true})
      window.location.href = "/todo"
    } catch (error) {
      console.log(error)
    }
  }

  // function for delete todo item
  const deleteItem = async(id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todo/delete/${id}`);
      window.location.href = "/todo"
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className="flex p-10 justify-center h-screen">
      <div className="w-1/3 bg-slate-200">
        <form className="flex justify-center space-x-2 py-5" onSubmit={addTodo}>
          <input type="text" className="rounded-lg py-1 border border-gray-300 px-2 outline-none w-[80%]" value={form.title} name="title" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <button type="submit" className="bg-green-300 px-3 py-1 rounded-lg">Add +</button>
        </form>
        <ol>
          <h1 className="text-[26px] font-semibold px-3">Todo List</h1>
          {todos.map(todo => {
             return (<div key={todo._id} className="flex items-center justify-between px-5 bg-yellow-200 my-2">
              <li>{todo.title}</li>
              <div className="flex space-x-3">
                <Link className="bg-green-300 py-1 px-2" to={`/edit/${todo._id}`}>Edit</Link>
                <button className="bg-red-300 py-1 px-2" onClick={() => deleteItem(todo._id)}>Delete</button>
              </div>
            </div>)
          })}
        </ol>
      </div>
    </div>
  )
}

export default Todo