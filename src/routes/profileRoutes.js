const express = require("express");
const profileController = require("../controllers/profileController");

const router = express.Router();

router.post("/", profileController.create);
router.get("/:id", profileController.findById);

module.exports = router;