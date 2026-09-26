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

async function findAll({ technology, page, limit }) {
  const where = technology
    ? { technologies: { some: { name: technology } } }
    : {};

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: projectRelations,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.project.count({ where })
  ]);

  return { projects, total };
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
async function incrementUpvotes(id) {
  return prisma.project.update({
    where: { id },
    data: {
      upvotes: { increment: 1 }
    }
  });
}

module.exports = {
 incrementUpvotes,
  create,
  findAll,
  findProfileById,
  findTechnologiesByIds
};