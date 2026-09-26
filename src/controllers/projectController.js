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
    const pageText = req.query.page ?? "1";
    const limitText = req.query.limit ?? "10";
    const technology = req.query.technology;

    if (
      typeof pageText !== "string" ||
      !/^[1-9]\d*$/.test(pageText) ||
      typeof limitText !== "string" ||
      !/^[1-9]\d*$/.test(limitText) ||
      (technology !== undefined &&
        (typeof technology !== "string" || !technology.trim()))
    ) {
      return res.status(400).json({
        message: "Informe page e limit como inteiros positivos e uma tecnologia válida."
      });
    }

    const page = Number(pageText);
    const limit = Number(limitText);

    if (!Number.isSafeInteger(page) || !Number.isSafeInteger(limit) || limit > 100) {
      return res.status(400).json({
        message: "page deve ser positivo e limit deve estar entre 1 e 100."
      });
    }

    const result = await projectService.listProjects({
      page,
      limit,
      technology: technology?.trim()
    });

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}
async function upvote(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "O id do projeto deve ser um número inteiro positivo."
      });
    }

    const project = await projectService.upvoteProject(id);
    return res.status(200).json(project);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  upvote,
  findAll
};