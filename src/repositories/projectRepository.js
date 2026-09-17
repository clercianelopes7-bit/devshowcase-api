const prisma = require("../config/prisma");

const projectRelations = {
  profile: {
    select: {
      id: true,
      name: true,
      email: true
    }
  },
  technologies: true,
  feedbacks: true
};

async function create(data) {
  const {
    title,
    description,
    repositoryUrl,
    demoUrl,
    profileId,
    technologyIds
  } = data;

  return prisma.project.create({
    data: {
      title,
      description,
      repositoryUrl,
      demoUrl,
      profileId,
      technologies: {
        connect: technologyIds.map((id) => ({ id }))
      }
    },
    include: projectRelations
  });
}

async function findAll() {
  return prisma.project.findMany({
    include: projectRelations,
    orderBy: {
      createdAt: "desc"
    }
  });
}

async function findProfileById(id) {
  return prisma.profile.findUnique({
    where: { id },
    select: { id: true }
  });
}

async function findTechnologiesByIds(ids) {
  return prisma.technology.findMany({
    where: {
      id: {
        in: ids
      }
    },
    select: { id: true }
  });
}

module.exports = {
  create,
  findAll,
  findProfileById,
  findTechnologiesByIds
};