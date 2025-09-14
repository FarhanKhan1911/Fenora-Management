const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/buyer-data", authMiddleware, roleMiddleware(["buyer"]), (req, res) => {
  res.json({ message: "Buyer-only content" });
});

router.get("/seller-data", authMiddleware, roleMiddleware(["seller"]), (req, res) => {
  res.json({ message: "Seller-only content" });
});

module.exports = router;
