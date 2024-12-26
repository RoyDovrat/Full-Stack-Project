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
    console.log('add service', obj)
    const users = await usersDBrepository.getAllUsers();
    const isUserNameExists = users.some(user => user.userName.toLowerCase() === obj.userName.toLowerCase());

    if (isUserNameExists) {
        throw new Error("Username already exists.");
    }

    const dbUser = await usersDBrepository.addUser({ userName: obj.userName, password: obj.password })

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

    return obj;
};

const updateUser = async (id, obj) => {
    const user = getUserById(id);

    await usersDBrepository.updateUser(id, { userName: obj.userName, password: user.password });

    const updatedFileUser = {
        id,
        firstName: obj.firstName,
        lastName: obj.lastName,
        createdDate: user.createdDate,
        sessionTimeOut: obj.sessionTimeOut
    }
    await usersFileRepository.updateUser(id, updatedFileUser)


    const updatedFilePermissions = {
        id,
        permissions: obj.permissions
    }
    await permissionsRepository.updateUserPermissions(id, updatedFilePermissions)

    return {
        _id: id,
        userName: obj.userName,
        firstName: updatedFileUser.firstName,
        lastName: updatedFileUser.lastName,
        createdDate: updatedFileUser.createdDate,
        sessionTimeOut: updatedFileUser.sessionTimeOut,
        permissions: updatedFilePermissions.permissions
    };
};


const deleteUser = async (id) => {

    const dbUser = await usersDBrepository.getUserById(id);

    if (dbUser.userName === ADMIN_USER_NAME) {
        throw new Error("Cannot delete the admin user!");
    }

    const deletedUser = await usersDBrepository.deleteUser(id);

    await usersFileRepository.deleteUser(id);

    await permissionsRepository.deletePermissions(id);

    return deletedUser;
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUserName,
    addUser,
    updateUser,
    deleteUser,
}