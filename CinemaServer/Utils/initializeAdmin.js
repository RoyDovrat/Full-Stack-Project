const usersDBrepository = require('../Repositories/usersDBrepository');
const usersFileRepository = require('../Repositories/usersFileRepository');
const permissionsRepository = require('../Repositories/permissionsRepository');

const ADMIN_PERMISSION = "Admin Permissions"

const initializeAdminUser = async () => {
  const adminUserName = "admin";
  const adminPassword = "admin123";

  const users = await usersDBrepository.getAllUsers();
  const isAdminExists = users.some(user => user.userName.toLowerCase() === adminUserName.toLowerCase());

  if (!isAdminExists) {
    // Create admin in UsersDB
    const adminDB = await usersDBrepository.addUser({ userName: adminUserName, password: adminPassword });

    // add admin to Users.json
    await usersFileRepository.addUser({
      id: adminDB._id.toString(),
      firstName: "Admin",
      lastName: "User",
      createdDate: new Date().toISOString(),
      sessionTimeOut: 60
    });

    // add admin to permissions.json
    await permissionsRepository.addPremission({
      id: adminDB._id.toString(),
      permissions: [
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "View Movies",
        "Create Movies",
        "Delete Movies",
        ADMIN_PERMISSION // Permission only for the admin
      ]
    });

    console.log("Admin user initialized!");
  } else {
    console.log("Admin user already exists!");
  }
};


module.exports = initializeAdminUser;
