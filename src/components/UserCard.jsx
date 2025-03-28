import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 border rounded bg-white shadow-lg text-center">
      <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full mx-auto" />
      <h3 className="font-bold text-lg">{user.first_name} {user.last_name}</h3>
      <p className="text-gray-500">{user.email}</p>
      <div className="mt-3 space-x-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => deleteUser(user.id)}>Delete</button>
      </div>
    </div>
  );
};

const deleteUser = async (id) => {
  try {
    await axios.delete(`https://reqres.in/api/users/${id}`);
    alert("User deleted successfully!");
    window.location.reload();  // Refresh to update UI
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete user");
  }
};


export default UserCard;
