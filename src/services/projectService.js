const projectRepository = require("../repositories/projectRepository");
const { projectOutputDto } = require("../dtos/projectDto");

async function createProject(data) {
  const profile = await projectRepository.findProfileById(data.profileId);

  if (!profile) {
    const error = new Error("O perfil informado não foi encontrado.");
    error.statusCode = 404;
    throw error;
  }

  const uniqueTechnologyIds = [...new Set(data.technologyIds)];

  const technologies = await projectRepository.findTechnologiesByIds(
    uniqueTechnologyIds
  );

  if (technologies.length !== uniqueTechnologyIds.length) {
    const error = new Error(
      "Uma ou mais tecnologias informadas não foram encontradas."
    );
    error.statusCode = 404;
    throw error;
  }

  const project = await projectRepository.create({
    ...data,
    technologyIds: uniqueTechnologyIds
  });
  return projectOutputDto(project);
}

async function listProjects(filters) {
  const { projects, total } = await projectRepository.findAll(filters);

  return {
    page: filters.page,
    limit: filters.limit,
    total,
    totalPages: Math.ceil(total / filters.limit),
    data: projects.map(projectOutputDto)
  };
}
async function upvoteProject(id) {
  try {
    const project = await projectRepository.incrementUpvotes(id);

    return {
      id: project.id,
      title: project.title,
      upvotes: project.upvotes
    };
  } catch (error) {
    if (error.code === "P2025") {
      const notFound = new Error("Projeto não encontrado.");
      notFound.statusCode = 404;
      throw notFound;
    }

    throw error;
  }
}

module.exports = {
 upvoteProject,
  createProject,
  listProjects
};