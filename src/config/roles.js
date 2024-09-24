const allRoles = {
  user: ["user","sendInvitationToCoach","getCoachList"],
  admin: ['getUsers', 'manageUsers'],
  coach:["invitationLink","updateInvitation","clientList"]
  
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
