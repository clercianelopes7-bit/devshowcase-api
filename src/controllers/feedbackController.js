const feedbackService = require("../services/feedbackService");
const { createFeedbackSchema } = require("../dtos/feedbackDto");

async function create(req, res, next) {
  try {
    const projectId = Number(req.params.id);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      return res.status(400).json({
        message: "O id do projeto deve ser um número inteiro positivo."
      });
    }

    const validation = createFeedbackSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Dados inválidos.",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }

    const result = await feedbackService.createFeedback(
      projectId,
      validation.data
    );

    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { create };