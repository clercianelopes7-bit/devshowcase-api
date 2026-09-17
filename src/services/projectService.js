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

async function listProjects() {
  const projects = await projectRepository.findAll();

  return projects.map(projectOutputDto);
}

module.exports = {
  createProject,
  listProjects
};