const { z } = require("zod");

const createTechnologySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome da tecnologia deve ter pelo menos 2 caracteres.")
    .max(50, "O nome da tecnologia deve ter no máximo 50 caracteres.")
});

function technologyOutputDto(technology) {
  return {
    id: technology.id,
    name: technology.name,
    createdAt: technology.createdAt
  };
}

module.exports = {
  createTechnologySchema,
  technologyOutputDto
};