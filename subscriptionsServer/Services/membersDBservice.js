const membersRepository = require('../Repositories/membersDBrepository');

const getAllMembers = (filters) => {
  return membersRepository.getAllMembers(filters);
};

const getMemberById = (id) => {
  return membersRepository.getMemberById(id);
};

const addMember = (obj) => {
  return membersRepository.addMember(obj);
};

const updateMember = (id, obj) => {
  return membersRepository.updateMember(id, obj);
};

const deleteMember = (id) => {
  return membersRepository.deleteMember(id);
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
}