const express = require("express");
const plantController = require("../Controllers/plantController");
const upload = require("../Middlewares/multerMiddleware");
const router = express.Router();

router
  .route("/")
  .get(plantController.getAllPlants)
  .post(upload.array("images", 4), plantController.addPlant);
router.route("/popular").get(plantController.getPopularPlants);
router.route("/:id").get(plantController.getPlant);
router.patch(
  "/:plantId/:vendorId/setoutofstock",
  plantController.setPlantOutofStock
);

module.exports = router;
