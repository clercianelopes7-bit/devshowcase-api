const prisma = require("../config/prisma");

async function createFeedback(projectId, data) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { id: true }
  });

  if (!project) {
    const error = new Error("Projeto não encontrado.");
    error.statusCode = 404;
    throw error;
  }

  return prisma.$transaction(async (tx) => {
    const feedback = await tx.feedback.create({
      data: {
        projectId,
        authorName: data.authorName,
        comment: data.comment,
        rating: data.rating
      }
    });

    const result = await tx.feedback.aggregate({
      where: { projectId },
      _avg: { rating: true }
    });

    const updatedProject = await tx.project.update({
      where: { id: projectId },
      data: { averageRating: result._avg.rating }
    });

    return {
      feedback,
      averageRating: updatedProject.averageRating
    };
  });
}

module.exports = { createFeedback };