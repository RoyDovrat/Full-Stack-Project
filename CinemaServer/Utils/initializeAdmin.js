const usersDBrepository = require('../Repositories/usersDBrepository');
const usersFileRepository = require('../Repositories/usersFileRepository');
const permissionsRepository = require('../Repositories/permissionsRepository');

const initializeAdminUser = async () => {
  const adminUserName = "admin";
  const adminPassword = "admin123";

  //check if admin exists
  const users = await usersDBrepository.getAllUsers();
  const isAdminExists = users.some(user => user.userName === adminUserName);

  if (!isAdminExists) {
    //create admin in UsersDB
    const adminDB = await usersDBrepository.addUser({ userName: adminUserName, password: adminPassword });

    //add admin to Users.json
    await usersFileRepository.addUser({
      id: adminDB._id.toString(),
      firstName: "Admin",
      lastName: "User",
      createdDate: new Date().toISOString(),
      sessionTimeOut: 60 
    });

    //add admin permissions 
    await permissionsRepository.addPremission({
      id: adminDB._id.toString(),
      permissions: [
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "View Movies",
        "Create Movies",
        "Delete Movies"
      ]
    });

    console.log("Admin user initialized!");
  } else {
    console.log("Admin user already exists!");
  }
};

module.exports = initializeAdminUser;
