const express = require("express");
const router = express.Router();
const carController = require("../controllers/CarController");


// Route to add a car model
router.post("/cars", carController.addCarModel);

// Route to get all car models grouped by make
router.get("/cars", carController.getAllCarModels);

module.exports = router;
