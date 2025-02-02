// const FAQ = require("../models/faqModel");
// const client = require("../config/redis");
// const translateText = require("../utils/translate");

// // Get FAQs
// exports.getFAQs = async (req, res) => {
//   try {
//     const { lang = "en" } = req.query;

//     // Check Redis cache
//     const cachedFAQs = await client.get(`faqs:${lang}`);
//     if (cachedFAQs) return res.json(JSON.parse(cachedFAQs));

//     // Fetch FAQs from MongoDB
//     const faqs = await FAQ.find();

//     // Apply translations if necessary
//     const translatedFAQs = await Promise.all(
//       faqs.map(async (faq) => ({
//         id: faq._id,
//         question: lang === "en" ? faq.question : faq.translations[lang] || faq.question,
//         answer: faq.answer,
//       }))
//     );

//     // Store in Redis cache
//     await client.setEx(`faqs:${lang}`, 3600, JSON.stringify(translatedFAQs));

//     res.json(translatedFAQs);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving FAQs", error });
//   }
// };

// // Add FAQ
// exports.addFAQ = async (req, res) => {
//   try {
//     const { question, answer } = req.body;

//     // Translate question into Hindi & Bengali
//     const question_hi = await translateText(question, "hi");
//     const question_bn = await translateText(question, "bn");

//     const faq = new FAQ({
//       question,
//       answer,
//       translations: { hi: question_hi, bn: question_bn },
//     });

//     await faq.save();
//     res.status(201).json(faq);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding FAQ", error });
//   }
// };

// // Update FAQ
// exports.updateFAQ = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { question, answer } = req.body;

//     // Translate updated question
//     const question_hi = await translateText(question, "hi");
//     const question_bn = await translateText(question, "bn");

//     const updatedFAQ = await FAQ.findByIdAndUpdate(
//       id,
//       { question, answer, translations: { hi: question_hi, bn: question_bn } },
//       { new: true }
//     );

//     if (!updatedFAQ) return res.status(404).json({ message: "FAQ not found" });

//     res.json(updatedFAQ);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating FAQ", error });
//   }
// };

// // Delete FAQ
// exports.deleteFAQ = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedFAQ = await FAQ.findByIdAndDelete(id);

//     if (!deletedFAQ) return res.status(404).json({ message: "FAQ not found" });

//     res.json({ message: "FAQ deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting FAQ", error });
//   }
// };


// const FAQ = require("../models/faqModels");
// const client = require("../config/redis.js");
// const translate = require("google-translate-api");

// exports.getFAQs = async (req, res) => {
//   const { lang } = req.query || "en";

//   // Check Redis cache
//   const cachedFAQs = await client.get(`faqs:${lang}`);
//   if (cachedFAQs) {
//     return res.json(JSON.parse(cachedFAQs));
//   }

//   // Fetch FAQs from MongoDB
//   const faqs = await FAQ.find();

//   // Apply translations if necessary
//   const translatedFAQs = faqs.map((faq) => ({
//     id: faq._id,
//     question: faq.translations[lang] || faq.question,
//     answer: faq.answer,
//   }));

//   // Store in Redis cache
//   client.setex(`faqs:${lang}`, 3600, JSON.stringify(translatedFAQs));

//   res.json(translatedFAQs);
// };

// // Add FAQ
// exports.addFAQ = async (req, res) => {
//   const { question, answer } = req.body;

//   // Translate question
//   const question_hi = (await translate(question, { to: "hi" })).text;
//   const question_bn = (await translate(question, { to: "bn" })).text;

//   const faq = new FAQ({
//     question,
//     answer,
//     translations: { hi: question_hi, bn: question_bn },
//   });

//   await faq.save();
//   res.status(201).json(faq);
// };


// const FAQ = require("../models/faqModels");
// const client = require("../config/redis.js");
// const { Translate } = require('@google-cloud/translate').v2;

// // Instantiate Google Translate client
// const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });

// exports.getFAQs = async (req, res) => {
//   const { lang = "en" } = req.query || "en";

//   // Check Redis cache
//   const cachedFAQs = await client.get(`faqs:${lang}`);
//   if (cachedFAQs) {
//     return res.json(JSON.parse(cachedFAQs));
//   }

//   // Fetch FAQs from MongoDB
//   const faqs = await FAQ.find();

//   // Apply translations if necessary
//   const translatedFAQs = faqs.map((faq) => ({
//     id: faq._id,
//     question: faq.translations[lang] || faq.question,
//     answer: faq.answer,
//   }));

//   // Store in Redis cache
//   client.setex(`faqs:${lang}`, 3600, JSON.stringify(translatedFAQs));

//   res.json(translatedFAQs);
// };

// // Add FAQ
// exports.addFAQ = async (req, res) => {
//   const { question, answer } = req.body;

//   try {
//     // Translate question into Hindi and Bengali
//     const [question_hi] = await translate.translate(question, "hi");
//     const [question_bn] = await translate.translate(question, "bn");

//     const faq = new FAQ({
//       question,
//       answer,
//       translations: { hi: question_hi, bn: question_bn },
//     });

//     await faq.save();
//     res.status(201).json(faq);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding FAQ", error });
//   }
// };
// const FAQ = require("../models/faqModels");
// const client = require("../config/redis.js");
// const translate = require("google-translate-api-x");  // Using the free package

// exports.getFAQs = async (req, res) => {
//   const { lang = "en" } = req.query || "en";

//   // Check Redis cache
//   const cachedFAQs = await client.get(`faqs:${lang}`);
//   if (cachedFAQs) {
//     return res.json(JSON.parse(cachedFAQs));
//   }

//   // Fetch FAQs from MongoDB
//   const faqs = await FAQ.find();

//   // Apply translations if necessary
//   const translatedFAQs = faqs.map((faq) => ({
//     id: faq._id,
//     question: faq.translations[lang] || faq.question,
//     answer: faq.translations[lang] || faq.answer,
//   }));

//   // Store in Redis cache
//   client.setex(`faqs:${lang}`, 3600, JSON.stringify(translatedFAQs));

//   res.json(translatedFAQs);
// };

// // Add FAQ
// exports.addFAQ = async (req, res) => {
//   const { question, answer } = req.body;

//   try {
//     // Translate question into Hindi and Bengali
//     const question_hi = (await translate(question, { to: "hi" })).text;
//     const question_bn = (await translate(question, { to: "bn" })).text;
//     // Translate answer into Hindi and Bengali
//     const answer_hi = (await translate(answer, { to: "hi" })).text;
//     const answer_bn = (await translate(answer, { to: "bn" })).text;

//     const faq = new FAQ({
//       question,
//       answer,
//       translations: { hi: question_hi, bn: question_bn ,hi:answer_hi, bn:answer_bn} 
//     });

//     await faq.save();
//     res.status(201).json(faq);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding FAQ", error });
//   }
// };
const FAQ = require("../models/faqModels");
const client = require("../config/redis");
const translate = require("google-translate-api-x");  

// Get all FAQs (with optional language translation)
exports.getFAQs = async (req, res) => {
  try {
    const { lang } = req.query || "en";

    // Check Redis cache
    const cachedFAQs = await client.get(`faqs:${lang}`);
    if (cachedFAQs) return res.json(JSON.parse(cachedFAQs));

    // Fetch from MongoDB
    const faqs = await FAQ.find();

    // Translate if needed
    const translatedFAQs = faqs.map((faq) => ({
      id: faq._id,
      question: faq.translations[lang] || faq.question,
      answer: faq.answer,
    }));

    // Store in cache for 1 hour
    await client.setEx(`faqs:${lang}`, 3600, JSON.stringify(translatedFAQs));

    res.json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add FAQ (with auto-translation)
exports.addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Translate question
    const question_hi = (await translate(question, { to: "hi" })).text;
    const question_bn = (await translate(question, { to: "bn" })).text;

    const faq = new FAQ({ question, answer, translations: { hi: question_hi, bn: question_bn } });

    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: "Error adding FAQ" });
  }
};

// Delete FAQ
exports.deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting FAQ" });
  }
};

// Update FAQ
exports.updateFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = await FAQ.findById(req.params.id);

    if (!faq) return res.status(404).json({ error: "FAQ not found" });

    // Update fields
    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;

    // Re-translate
    faq.translations.hi = (await translate(faq.question, { to: "hi" })).text;
    faq.translations.bn = (await translate(faq.question, { to: "bn" })).text;

    await faq.save();
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: "Error updating FAQ" });
  }
};
