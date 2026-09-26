module.exports = {
  openapi: "3.0.3",
  info: {
    title: "DevShowcase API",
    version: "2.0.0",
    description: "API de perfis, tecnologias, projetos e feedbacks."
  },
  servers: [{ url: "/" }],
  paths: {
    "/api/projects": {
      get: {
        summary: "Lista projetos com filtro por tecnologia e paginação",
        parameters: [
          {
            name: "technology",
            in: "query",
            schema: { type: "string" }
          },
          {
            name: "page",
            in: "query",
            schema: { type: "integer", minimum: 1 }
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", minimum: 1, maximum: 100 }
          }
        ],
        responses: {
          200: { description: "Lista paginada de projetos" },
          400: { description: "Parâmetros inválidos" }
        }
      }
    },
    "/api/projects/{id}/feedbacks": {
      post: {
        summary: "Cadastra feedback e atualiza a nota média",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["comment", "rating"],
                properties: {
                  authorName: {
                    type: "string",
                    example: "Clerciane Lopes"
                  },
                  comment: {
                    type: "string",
                    example: "Projeto bem organizado."
                  },
                  rating: {
                    type: "integer",
                    minimum: 1,
                    maximum: 5,
                    example: 5
                  }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Feedback cadastrado e média atualizada" },
          400: { description: "Dados inválidos" },
          404: { description: "Projeto não encontrado" }
        }
      }
    },
    "/api/projects/{id}/upvote": {
      put: {
        summary: "Incrementa as curtidas de um projeto",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          200: { description: "Curtida adicionada" },
          400: { description: "Id inválido" },
          404: { description: "Projeto não encontrado" }
        }
      }
    }
  }
};