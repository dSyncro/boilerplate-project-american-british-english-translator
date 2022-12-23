const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

function getReverseDictionary(obj) {
  return Object.assign(
    {},
    ...Object.entries(obj).map(([k, v]) => ({ [v]: k }))
  );
}

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const americanToBritishDict = { ...americanOnly, ...americanToBritishSpelling };
const britishToAmericanDict = {
  ...britishOnly,
  ...getReverseDictionary(americanToBritishSpelling),
};

class Translator {
  AVAILABLE_LOCALES = {
    AmericanToBritish: "american-to-british",
    BritishToAmerican: "british-to-american",
  };

  get availableLocales() {
    return Object.values(this.AVAILABLE_LOCALES);
  }

  toBritishEnglish(text) {
    const translated = this.translate(
      text,
      this.AVAILABLE_LOCALES.AmericanToBritish
    );

    return translated || text;
  }

  toAmericanEnglish(text) {
    const translated = this.translate(
      text,
      this.AVAILABLE_LOCALES.BritishToAmerican
    );

    return translated || text;
  }

  translate(text, locale) {
    const targetDictionary =
      locale === this.AVAILABLE_LOCALES.BritishToAmerican
        ? britishToAmericanDict
        : americanToBritishDict;

    const targetTitles =
      locale === this.AVAILABLE_LOCALES.BritishToAmerican
        ? getReverseDictionary(americanToBritishTitles)
        : americanToBritishTitles;

    const timeRegex =
      locale === this.AVAILABLE_LOCALES.BritishToAmerican
        ? /([1-9]|1[012]).[0-5][0-9]/g
        : /([1-9]|1[012]):[0-5][0-9]/g;

    const lowerText = text.toLowerCase();
    const matchesMap = {};

    // Search for titles/honorifics
    Object.entries(targetTitles).forEach(([k, v]) => {
      if (!lowerText.includes(k)) return;
      matchesMap[k] = capitalizeFirstLetter(v);
    });

    // Filter words with spaces
    const wordsWithSpace = Object.fromEntries(
      Object.entries(targetDictionary).filter(([k, v]) => k.includes(" "))
    );

    // Search for spaced word matches
    Object.entries(wordsWithSpace).forEach(([k, v]) => {
      if (!lowerText.includes(k)) return;
      matchesMap[k] = v;
    });

    // Search for individual word matches
    const individualWords = lowerText.match(/(\w+([-'])(\w+)?['-]?(\w+))|\w+/g);
    individualWords.forEach((word) => {
      if (targetDictionary[word]) matchesMap[word] = targetDictionary[word];
    });

    // Search for time matches
    const matchedTimes = lowerText.match(timeRegex);
    if (matchedTimes) {
      matchedTimes.forEach((e) => {
        if (locale === this.AVAILABLE_LOCALES.AmericanToBritish)
          return (matchesMap[e] = e.replace(":", "."));
        return (matchesMap[e] = e.replace(".", ":"));
      });
    }

    if (Object.keys(matchesMap).length === 0) return undefined;

    const translation = this.replaceAll(text, matchesMap);
    const translationWithHighlight = this.replaceAllWithHighlight(
      text,
      matchesMap
    );

    return [translation, translationWithHighlight];
  }

  replaceAll(text, matchesMap) {
    const re = new RegExp(Object.keys(matchesMap).join("|"), "gi");
    return text.replace(re, (matched) => matchesMap[matched.toLowerCase()]);
  }

  replaceAllWithHighlight(text, matchesMap) {
    const re = new RegExp(Object.keys(matchesMap).join("|"), "gi");
    return text.replace(re, (matched) => {
      return `<span class="highlight">${
        matchesMap[matched.toLowerCase()]
      }</span>`;
    });
  }
}

module.exports = Translator;
