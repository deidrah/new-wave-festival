const express = require("express");
const router = express.Router();
const TestimonialController = require("../controllers/testimonials.controller");

router.get("/testimonials", TestimonialController.getAll);

router.get("/testimonials/random", TestimonialController.getRandom);

router.get("/testimonials/:id", TestimonialController.getId);

router.post("/testimonials", TestimonialController.post);

router.put("/testimonials/:id", TestimonialController.putId);
router.delete("/testimonials/:id", TestimonialController.deleteId);

module.exports = router;