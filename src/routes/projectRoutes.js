const express = require("express");
const projectController = require("../controllers/projectController");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

router.post("/", projectController.create);
router.get("/", projectController.findAll);
router.post("/:id/feedbacks", feedbackController.create);
router.put("/:id/upvote", projectController.upvote);

module.exports = router;