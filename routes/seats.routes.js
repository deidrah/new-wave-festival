const express = require("express");
const router = express.Router();
const SeatsController = require("../controllers/seats.controller");

router.get("/seats", SeatsController.getAll);
router.get("/seats/random", SeatsController.getRandom);
router.get("/seats/:id", SeatsController.getId);
router.post("/seats", SeatsController.post);
router.put("/seats/:id", SeatsController.putId);
router.delete("/seats/:id", SeatsController.deleteId);

module.exports = router;