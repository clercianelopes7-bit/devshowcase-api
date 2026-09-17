const profileRepository = require("../repositories/profileRepository");
const { profileOutputDto } = require("../dtos/profileDto");

async function createProfile(data) {
  const existingProfile = await profileRepository.findByEmail(data.email);

  if (existingProfile) {
    const error = new Error("Já existe um perfil cadastrado com este e-mail.");
    error.statusCode = 409;
    throw error;
  }

  const profile = await profileRepository.create(data);

  return profileOutputDto(profile);
}

async function getProfileById(id) {
  const profile = await profileRepository.findById(id);

  if (!profile) {
    const error = new Error("Perfil não encontrado.");
    error.statusCode = 404;
    throw error;
  }

  return {
    ...profileOutputDto(profile),
    projects: profile.projects
  };
}

module.exports = {
  createProfile,
  getProfileById
};