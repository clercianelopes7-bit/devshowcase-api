const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const openapiDocument = require("./docs/openapi");

const prisma = require("./config/prisma");
const profileRoutes = require("./routes/profileRoutes");
const technologyRoutes = require("./routes/technologyRoutes");
const projectRoutes = require("./routes/projectRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "DevShowcase API está funcionando!"
  });
});

app.get("/database-test", async (req, res, next) => {
  try {
    const totalProfiles = await prisma.profile.count();

    return res.status(200).json({
      message: "Conexão com o banco realizada com sucesso!",
      totalProfiles
    });
  } catch (error) {
    return next(error);
  }
});

app.use("/api/profiles", profileRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/projects", projectRoutes);
app.use((req, res, next) => {
  const error = new Error("Rota não encontrada.");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor executando em http://localhost:${PORT}`);
});