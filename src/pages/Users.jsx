import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ first_name: "", last_name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null); // Track user being edited

  // Fetch users from API
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=1")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Create new user (simulated)
  const addUser = async () => {
    if (!newUser.first_name || !newUser.last_name || !newUser.email) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.post("https://reqres.in/api/users", newUser);
      setUsers([...users, { ...res.data, id: users.length + 1 }]); // Simulated ID
      setNewUser({ first_name: "", last_name: "", email: "" });
      alert("User added successfully!");
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Edit user (open edit form)
  const startEditing = (user) => {
    setEditingUser(user);
  };

  // Update user (simulated)
  const updateUser = async () => {
    if (!editingUser.first_name || !editingUser.last_name || !editingUser.email) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      await axios.put(`https://reqres.in/api/users/${editingUser.id}`, editingUser);
      setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null);
      alert("User updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Users List</h2>

      {/* Add User Form */}
      <div className="card p-4 mb-4 shadow">
        <h4 className="mb-3">Add User</h4>
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="First Name"
              value={newUser.first_name}
              onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Last Name"
              value={newUser.last_name}
              onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-success w-100" onClick={addUser}>
          Add User
        </button>
      </div>

      {/* User List */}
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-4 mb-3">
            <div className="card text-center shadow p-3">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="rounded-circle mx-auto d-block"
                width="80"
              />
              {editingUser && editingUser.id === user.id ? (
                // Edit Mode
                <div>
                  <input
                    type="text"
                    className="form-control my-2"
                    value={editingUser.first_name}
                    onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control my-2"
                    value={editingUser.last_name}
                    onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                  />
                  <input
                    type="email"
                    className="form-control my-2"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                  <button className="btn btn-primary w-100 mb-2" onClick={updateUser}>
                    Save
                  </button>
                  <button className="btn btn-secondary w-100" onClick={() => setEditingUser(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                // Display Mode
                <>
                  <h5 className="mt-2">{user.first_name} {user.last_name}</h5>
                  <p className="text-muted">{user.email}</p>
                  <button className="btn btn-warning w-100 mb-2" onClick={() => startEditing(user)}>
                    Edit
                  </button>
                  <button className="btn btn-danger w-100" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
