const usersDBrepository = require('../Repositories/usersDBrepository');
const usersFileRepository = require('../Repositories/usersFileRepository')
const permissionsRepository = require('../Repositories/permissionsRepository')
const ADMIN_USER_NAME = "admin";

const getAllUsers = async () => {
    const usersDB = await usersDBrepository.getAllUsers();
    const usersFile = await usersFileRepository.getAllUsers();
    const premissions = await permissionsRepository.getAllPermissions();

    const users = usersDB.map((dbUser) => {

        const fileUser = usersFile.users.find((user) => user.id.toString() === dbUser._id.toString());
        const userPermissions = premissions.premissions.find((perm) => perm.id.toString() === dbUser._id.toString());

        return {
            _id: dbUser._id,
            password: dbUser.password,
            userName: dbUser.userName,
            firstName: fileUser?.firstName || '',
            lastName: fileUser?.lastName || '',
            createdDate: fileUser?.createdDate || '',
            sessionTimeOut: fileUser?.sessionTimeOut || 0,
            permissions: userPermissions?.permissions || []
        }
    });

    return users;

};

const getUserById = async (id) => {
    const dbUser = await usersDBrepository.getUserById(id);

    const fileUsers = await usersFileRepository.getAllUsers();
    const fileUser = fileUsers.users.find((user) => user.id === id);

    const premissions = await permissionsRepository.getAllPermissions();
    const userPermissions = premissions.premissions.find((prem) => prem.id === id);

    return {
        dbUser,
        fileUser,
        userPermissions
    }
};

const getUserByUserName = async (userName) => {
    const users = await usersDBrepository.getAllUsers();
    const user = users.find(user => user.userName.toLowerCase() === userName.toLowerCase());
    return user;

}

const addUser = async (obj) => {
    const users = await usersDBrepository.getAllUsers();
    const isUserNameExists = users.some(user => user.userName.toLowerCase() === obj.userName.toLowerCase());

    if (isUserNameExists) {
        throw new Error("Username already exists.");
    }

    const dbUser = await usersDBrepository.addUser({ userName: obj.userName, password: user.password })

    await usersFileRepository.addUser({
        id: dbUser._id.toString(),
        firstName: obj.firstName,
        lastName: obj.lastName,
        createdDate: new Date().toISOString(),
        sessionTimeOut: obj.sessionTimeOut
    });

    await permissionsRepository.addPremission({
        id: dbUser._id.toString(),
        permissions: obj.permissions
    });

    return dbUser;
};

const updateFileUsers = async (id, obj) => {

    const updatedFileUser = {
        id,
        firstName: obj.firstName,
        lastName: obj.lastName,
        createdDate: user.createdDate,
        sessionTimeOut: obj.sessionTimeOut
    }
    const fileUsers = await usersFileRepository.getAllUsers();
    const userFileIndex = fileUsers.users.findIndex((user) => user.id === id);
    if (userFileIndex === -1) {
        await usersFileRepository.addUser(updatedFileUser);
    }

    else {
        fileUsers.users[userFileIndex] = { updatedFileUser };
        await usersFileRepository.updateUsers(fileUsers)
    }
}

const updateFilePermissions = async (id, obj) => {

    const updatedFilePermissions = {
        id,
        permissions: obj.permissions
    }
    const permissionsUsers = await permissionsRepository.getAllPermissions();
    const permissionsFileIndex = permissionsUsers.permissions.findIndex((perm) => perm.id === id);
    if (permissionsFileIndex === -1) {
        await permissionsRepository.addPremission(updatedFilePermissions);
    }

    else {
        permissionsUsers.permissions[permissionsFileIndex] = { updatedFilePermissions };
        await permissionsRepository.updatePermissions(permissionsUsers)
    }
}




const updateUser = async (id, obj) => {
    const user = getUserById(id);

    const dbUser = await usersDBrepository.updateUser(id, { userName: obj.userName, password: user.password });

    await updateFileUsers(id, obj);


    await updateFilePermissions(id, obj);

    return  'User updated successfully!'
};


const deleteUser = async (id) => {

    const dbUser = await usersDBrepository.getUserById(id);

    if (dbUser.userName === ADMIN_USER_NAME) {
        throw new Error("Cannot delete the admin user!");
    }

    await usersDBrepository.deleteUser(id);

    const usersFile = await usersFileRepository.getAllUsers();
    const updatedUsersFile = usersFile.users.filter((user) => user.Id !== id);
    await usersFileRepository.updateUsers({ users: updatedUsersFile });


    const permissionsFile = await permissionsRepository.getAllPermissions();
    const updatedPermissionsFile = permissionsFile.premissions.filter(
        (permission) => permission.Id !== id
    );
    await permissionsRepository.updatePermissions({ premissions: updatedPermissionsFile });

    return 'User deleted successfully!';
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUserName,
    addUser,
    updateUser,
    deleteUser,
}