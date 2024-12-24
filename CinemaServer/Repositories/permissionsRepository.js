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

const updatePermissions = async (data) => {
    await jf.writeFile(FILE, data);
    return 'Updated Successfully';
}

module.exports = { getAllPermissions, addPremission, updatePermissions };