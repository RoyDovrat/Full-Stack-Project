const Member = require('../Models/memberModel');

const getAllMembers = (filters) => {
    return Member.find(filters);
};

const getMemberById = (id) => {
    return Member.findById(id);
};

const addMember = (obj) => {
    const member = new Member(obj);
    return member.save();
};

const updateMember = (id, obj) => {
    return Member.findByIdAndUpdate(id, obj);
};

const deleteMember = (id) => {
    return Member.findByIdAndDelete(id);
};

module.exports = {
    getAllMembers,
    getMemberById,
    addMember,
    updateMember,
    deleteMember,
};