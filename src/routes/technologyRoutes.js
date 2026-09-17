const express = require("express");
const technologyController = require("../controllers/technologyController");

const router = express.Router();

router.post("/", technologyController.create);
router.get("/", technologyController.findAll);

module.exports = router;