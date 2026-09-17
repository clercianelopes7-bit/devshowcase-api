const { z } = require("zod");

const createProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres."),

  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido."),

  bio: z
    .string()
    .trim()
    .max(500, "A biografia deve ter no máximo 500 caracteres.")
    .optional(),

  githubUrl: z
    .string()
    .url("Informe uma URL válida para o GitHub.")
    .optional(),

  linkedinUrl: z
    .string()
    .url("Informe uma URL válida para o LinkedIn.")
    .optional()
});

function profileOutputDto(profile) {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt
  };
}

module.exports = {
  createProfileSchema,
  profileOutputDto
};