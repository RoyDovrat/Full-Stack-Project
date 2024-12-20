const usersDBrepository = require('../Repositories/usersDBrepository');
const usersFileRepository = require('../Repositories/usersFileRepository')
const permissionsRepository = require('../Repositories/permissionsRepository')

const getAllUsers = async () => {
    const usersDB = await usersDBrepository.getAllUsers();
    const usersFile = await usersFileRepository.getAllUsers();
    const premissions = await permissionsRepository.getAllPermissions();
    
    const users = usersDB.map((dbUser) => {

        const fileUser = usersFile.users.find((user) => user.id.toString() === dbUser._id.toString());
        const userPermissions = premissions.premissions.find((premissions) => premissions.id.toString() === dbUser._id.toString());

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
    const fileUser= fileUsers.users.find((user)=> user.id === id);

    const premissions = await permissionsRepository.getAllPermissions();
    const userPermissions = premissions.premissions.find((prem) => prem.id ===id);

    return {
        dbUser,
        fileUser,
        userPermissions
    }
};

const addUser = async (obj) => {
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

const updateUser = (id, obj) => {
    return usersDBrepository.updateUser(id, obj);
};

const deleteUser = async (id) => {
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
    addUser,
    updateUser,
    deleteUser,
}