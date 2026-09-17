const prisma = require("../config/prisma");

async function create(data) {
  return prisma.profile.create({
    data
  });
}

async function findById(id) {
  return prisma.profile.findUnique({
    where: { id },
    include: {
      projects: {
        include: {
          technologies: true,
          feedbacks: true
        }
      }
    }
  });
}

async function findByEmail(email) {
  return prisma.profile.findUnique({
    where: { email }
  });
}

module.exports = {
  create,
  findById,
  findByEmail
};