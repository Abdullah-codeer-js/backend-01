const fs = require("fs").promises;
const path = require("path");
const filePath = path.join(__dirname, "../data/userSettings.json");

// Read all users
const getAllUsers = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

// Save users
const saveUsers = async (users) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  } catch (error) {
    throw error;
  }
};

// Find user by ID
const getUserById = async (userId) => {
  try {
    const users = await getAllUsers();
    return users.find((user) => user.userId === userId);
  } catch (error) {
    throw error;
  }
};

// Add user
const createUser = async (newUser) => {
  try {
    const users = await getAllUsers();
    users.push(newUser);
    await saveUsers(users);
    return newUser;
  } catch (error) {
    throw error;
  }
};

// Update user
const updateUser = async (userId, updatedUser) => {
  try {
    const users = await getAllUsers();
    const index = users.findIndex((user) => user.userId === userId);
    if (index === -1) {
      return null;
    }
    users[index] = updatedUser;
    await saveUsers(users);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Delete user
const deleteUser = async (userId) => {
  try {
    const users = await getAllUsers();
    const index = users.findIndex((user) => user.userId === userId);
    if (index === -1) {
      return null;
    }
    const deletedUser = users[index];
    users.splice(index, 1);
    await saveUsers(users);
    return deletedUser;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
