// client/src/services/api.js
const API_URL = "http://localhost:5099/api/users";

export const getUsers = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createUser = async (user) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
};

export const updateUser = async (id, user) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return response.json();
};

export const toggleUserStatus = async (id) => {
    const response = await fetch(`${API_URL}/${id}/toggle-status`, {
        method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to toggle status");
    return true;
};

export const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return true;
};
