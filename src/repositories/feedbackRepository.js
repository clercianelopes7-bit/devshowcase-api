const prisma = require("../config/prisma");

async function create(data) {
  return prisma.feedback.create({
    data,
  });
}

async function findById(id) {
  return prisma.feedback.findUnique({
    where: { id },
  });
}

async function findByProjectId(projectId) {
  return prisma.feedback.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
}

module.exports = {
  create,
  findById,
  findByProjectId,
};