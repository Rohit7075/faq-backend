const express = require("express");
const { getFAQs, addFAQ, updateFAQ, deleteFAQ } = require("../controllers/faqControllers");
const router = express.Router();

router.get("/faqs", getFAQs);
router.post("/faqs", addFAQ);
router.put("/faqs/:id", updateFAQ);
router.delete("/faqs/:id", deleteFAQ);

module.exports = router;
