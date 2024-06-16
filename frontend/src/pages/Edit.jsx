import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [form, setForm] = useState({title: ""})
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/api/todo/getuser/${id}`);
        if (result.data && result.data.title) {
          setForm({ title: result.data.title });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleForm = (event) => {
    setForm({...form, [event.target.name] : event.target.value})
  }
  const navigate = useNavigate();

  const formSubmitted = async(event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/todo/edit/${id}`, form)
      navigate("/todo")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center m-5">
      <form className="flex w-1/2 space-x-3" onSubmit={formSubmitted}>
        <input type="text" className="w-full border border-gray-400 rounded-lg outline-none px-5 py-1" value={form.title} name="title" onChange={handleForm} />
        <button className="bg-green-400 px-5 py-1 rounded-lg" type="submit">Save</button>
      </form>
    </div>
  )
}

export default Edit;