"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;
    if (!locale || text === undefined)
      return res.json({ error: "Required field(s) missing" });

    if (text === "") return res.json({ error: "No text to translate" });

    if (!translator.availableLocales.includes(locale))
      return res.json({ error: "Invalid value for locale field" });

    const translation =
      locale === translator.AVAILABLE_LOCALES.AmericanToBritish
        ? translator.toBritishEnglish(text)
        : translator.toAmericanEnglish(text);

    if (translation === text || !translation)
      return res.json({ text, translation: "Everything looks good to me!" });

    return res.json({ text, translation: translation[1] });
  });
};
