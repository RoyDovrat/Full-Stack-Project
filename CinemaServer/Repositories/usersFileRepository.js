const jf = require('jsonfile');

const FILE = 'Files/Users.json';

const getAllUsers = () => {
  return jf.readFile(FILE);
};

const addUser = async (Obj) => {
    const data = await jf.readFile(FILE);
    data.users.push(Obj);
    await jf.writeFile(FILE, data);
    return 'Added Successfully';
};

const updateUser = async (userId, updatedUser) => {
  const data = await jf.readFile(FILE);
  
  const userIndex = data.users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  data.users[userIndex] = { ...data.users[userIndex], ...updatedUser };

  await jf.writeFile(FILE, data);
  return 'User Updated Successfully';
};

const deleteUser = async (userId) => {
  const data = await jf.readFile(FILE);

  const updatedUsers = data.users.filter(user => user.id !== userId);
  if (updatedUsers.length === data.users.length) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  data.users = updatedUsers;
  await jf.writeFile(FILE, data);
  return userId;
};


module.exports = { getAllUsers, addUser, updateUser, deleteUser };