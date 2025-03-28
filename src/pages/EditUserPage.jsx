import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`).then((res) => {
      setUser(res.data.data);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://reqres.in/api/users/${id}`, user);
      console.log("User updated:", res.data);  // Check the response in console
      alert("User updated successfully!");  
      navigate("/users");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update user");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleUpdate} className="p-6 bg-white rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Edit User</h2>
        <input type="text" className="w-full p-2 border rounded mb-3" placeholder="First Name" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
        <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Last Name" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
        <input type="email" className="w-full p-2 border rounded mb-3" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditUserPage;
