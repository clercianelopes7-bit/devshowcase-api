const { z } = require("zod");

const createFeedbackSchema = z.object({
  authorName: z.string().trim().min(2).default("Anônimo"),
  comment: z.string().trim().min(1, "Informe um comentário."),
  rating: z.number().int().min(1).max(5)
});

module.exports = { createFeedbackSchema };