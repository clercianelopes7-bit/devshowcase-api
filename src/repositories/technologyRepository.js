const prisma = require("../config/prisma");

async function create(data) {
  return prisma.technology.create({
    data
  });
}

async function findAll() {
  return prisma.technology.findMany({
    orderBy: {
      name: "asc"
    }
  });
}

async function findByName(name) {
  return prisma.technology.findUnique({
    where: { name }
  });
}

module.exports = {
  create,
  findAll,
  findByName
};