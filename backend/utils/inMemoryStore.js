// In-memory storage for testing when MongoDB is not available
let inMemoryUsers = [];
let userIdCounter = 1;

export const inMemoryStore = {
  users: inMemoryUsers,
  
  createUser: (userData) => {
    const user = {
      _id: userIdCounter++,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    inMemoryUsers.push(user);
    return user;
  },
  
  findUserByEmail: (email) => {
    return inMemoryUsers.find(user => user.email === email);
  },
  
  findUserById: (id) => {
    return inMemoryUsers.find(user => user._id == id);
  },
  
  updateUser: (id, updateData) => {
    const userIndex = inMemoryUsers.findIndex(user => user._id == id);
    if (userIndex !== -1) {
      inMemoryUsers[userIndex] = { ...inMemoryUsers[userIndex], ...updateData, updatedAt: new Date() };
      return inMemoryUsers[userIndex];
    }
    return null;
  },
  
  clearStore: () => {
    inMemoryUsers = [];
    userIdCounter = 1;
  }
};