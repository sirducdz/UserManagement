// client/src/App.js
import React, { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, toggleUserStatus, deleteUser } from "./services/api";
import "./App.css";

function App() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ fullName: "", email: "", role: "User", isActive: true });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        console.log("Loading users...");
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("API connection error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateUser(editingId, formData);
            } else {
                await createUser(formData);
            }
            // Reset form
            setFormData({ fullName: "", email: "", role: "User", isActive: true });
            setEditingId(null);
            loadUsers();
        } catch (error) {
            alert("An error occurred while saving!");
        }
    };

    const handleEdit = (user) => {
        setFormData({
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        });
        setEditingId(user.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
            loadUsers();
        }
    };

    return (
        <div className="container">
            <h1>User Management</h1>
            
            {/* Input Form */}
            <div className="form-card">
                <h3>{editingId ? "Update User" : "Add New User"}</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" placeholder="Full Name" required 
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                    <input 
                        type="email" placeholder="Email" required 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <select 
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value})}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button type="submit" className="btn-primary">
                        {editingId ? "Save Changes" : "Add New"}
                    </button>
                    {editingId && (
                        <button type="button" className="btn-secondary" onClick={() => {
                            setEditingId(null);
                            setFormData({ fullName: "", email: "", role: "User", isActive: true });
                        }}>Cancel</button>
                    )}
                </form>
            </div>

            {/* User List */}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => handleEdit(user)} className="btn-edit">Edit</button>
                                <button onClick={async () => {
                                    await toggleUserStatus(user.id);
                                    loadUsers();
                                }} className="btn-toggle">
                                    {user.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <button onClick={() => handleDelete(user.id)} className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
