const technologyService = require("../services/technologyService");
const { createTechnologySchema } = require("../dtos/technologyDto");

async function create(req, res, next) {
  try {
    const validation = createTechnologySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Dados inválidos.",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }

    const technology = await technologyService.createTechnology(
      validation.data
    );

    return res.status(201).json(technology);
  } catch (error) {
    return next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const technologies = await technologyService.listTechnologies();

    return res.status(200).json(technologies);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  findAll
};