const projectService = require("../services/projectService");
const { createProjectSchema } = require("../dtos/projectDto");

async function create(req, res, next) {
  try {
    const validation = createProjectSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Dados inválidos.",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }

    const project = await projectService.createProject(validation.data);

    return res.status(201).json(project);
  } catch (error) {
    return next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const projects = await projectService.listProjects();

    return res.status(200).json(projects);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  findAll
};