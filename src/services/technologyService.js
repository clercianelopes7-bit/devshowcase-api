const technologyRepository = require("../repositories/technologyRepository");
const { technologyOutputDto } = require("../dtos/technologyDto");

async function createTechnology(data) {
  const existingTechnology = await technologyRepository.findByName(data.name);

  if (existingTechnology) {
    const error = new Error("Já existe uma tecnologia com este nome.");
    error.statusCode = 409;
    throw error;
  }

  const technology = await technologyRepository.create(data);

  return technologyOutputDto(technology);
}

async function listTechnologies() {
  const technologies = await technologyRepository.findAll();

  return technologies.map(technologyOutputDto);
}

module.exports = {
  createTechnology,
  listTechnologies
};