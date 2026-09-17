const profileService = require("../services/profileService");
const { createProfileSchema } = require("../dtos/profileDto");

async function create(req, res, next) {
  try {
    const validation = createProfileSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Dados inválidos.",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }

    const profile = await profileService.createProfile(validation.data);

    return res.status(201).json(profile);
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "O id do perfil deve ser um número inteiro positivo."
      });
    }

    const profile = await profileService.getProfileById(id);

    return res.status(200).json(profile);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  findById
};