const jf = require('jsonfile');

const FILE = 'Files/Permissions.json';

const getAllPermissions = () => {
    return jf.readFile(FILE);
};

const addPremission = async (Obj) => {
    const data = await jf.readFile(FILE);
    data.premissions.push(Obj);
    await jf.writeFile(FILE, data);
    return 'Added Successfully';
};

const updateUserPermissions = async (userId, updatedPermissions) => {
    const data = await jf.readFile(FILE);
    
    const userPermissionsIndex = data.premissions.findIndex(userPerm => userPerm.id === userId);
    if (userPermissionsIndex === -1) {
      throw new Error(`User with ID ${userId} not found.`);
    }
  
    data.premissions[userPermissionsIndex] = { ...data.premissions[userPermissionsIndex], ...updatedPermissions };
  
    await jf.writeFile(FILE, data);
    return 'User Permissions Updated Successfully';
  };

  const deletePermissions = async (userId) => {
    const data = await jf.readFile(FILE);
  
    const updatedPermissions = data.premissions.filter(permission => permission.id !== userId);
    if (updatedPermissions.length === data.premissions.length) {
      throw new Error(`Permission with ID ${userId} not found.`);
    }
  
    data.premissions = updatedPermissions;
    await jf.writeFile(FILE, data);
    return userId;
  };

module.exports = { getAllPermissions, addPremission, updateUserPermissions, deletePermissions };