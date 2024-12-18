const membersRepository = require('../Repositories/membersWSrepository')

const getAllMembersData = async () => {
    const { data: members } = await membersRepository.getAllMembers();

    return members.map((member) => {
        return {
            name: member.name,
            email: member.email,
            city: member.address?.city,
        }
    })
}
module.exports = { getAllMembersData }