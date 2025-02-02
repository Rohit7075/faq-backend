// const { Translate } = require("@google-cloud/translate").v2;
// require("dotenv").config();

// const translate = new Translate({
//   key: process.env.GOOGLE_TRANSLATE_API_KEY,
// });

// const translateText = async (text, targetLang) => {
//   try {
//     if (!text) return "";
//     const [translation] = await translate.translate(text, targetLang);
//     return translation;
//   } catch (error) {
//     console.error("Translation Error:", error);
//     return text; // Return original text if translation fails
//   }
// };

// module.exports = translateText;
// // 