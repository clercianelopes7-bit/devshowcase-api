const { z } = require("zod");

const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "O título deve ter pelo menos 2 caracteres."),

  description: z
    .string()
    .trim()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),

  repositoryUrl: z
    .string()
    .url("Informe uma URL válida para o repositório."),

  demoUrl: z
    .string()
    .url("Informe uma URL válida para a demonstração.")
    .optional(),

  profileId: z
    .number()
    .int("O id do perfil deve ser um número inteiro.")
    .positive("O id do perfil deve ser positivo."),

  technologyIds: z
    .array(
      z
        .number()
        .int("Cada tecnologia deve possuir um id inteiro.")
        .positive("O id da tecnologia deve ser positivo.")
    )
    .min(1, "Informe pelo menos uma tecnologia.")
});

function projectOutputDto(project) {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    repositoryUrl: project.repositoryUrl,
    demoUrl: project.demoUrl,
    profileId: project.profileId,
    profile: project.profile,
    technologies: project.technologies,
    feedbacks: project.feedbacks,
    averageRating: project.averageRating,
upvotes: project.upvotes,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  };
}

module.exports = {
  createProjectSchema,
  projectOutputDto
};