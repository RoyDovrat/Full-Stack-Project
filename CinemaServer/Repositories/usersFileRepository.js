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

const updateUsers = async (data) => {
  await jf.writeFile(FILE, data);
  return 'Updated Successfully';
} 

module.exports = { getAllUsers, addUser, updateUsers };