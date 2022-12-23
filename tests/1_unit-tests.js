const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", () => {
  test("Translate Mangoes are my favorite fruit. to British English", () => {
    const input = "Mangoes are my favorite fruit.";
    const output = "Mangoes are my favourite fruit.";

    const [translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate I ate yogurt for breakfast. to British English", () => {
    const input = "I ate yogurt for breakfast.";
    const output = "I ate yoghurt for breakfast.";

    const [translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate We had a party at my friend's condo. to British English", () => {
    const input = "We had a party at my friend's condo.";
    const output = "We had a party at my friend's flat.";

    const [translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate Can you toss this in the trashcan for me? to British English", () => {
    const input = "Can you toss this in the trashcan for me?";
    const output = "Can you toss this in the bin for me?";

    const [translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate The parking lot was full. to British English", () => {
    const input = "The parking lot was full.";
    const output = "The car park was full.";

    const [translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate Like a high tech Rube Goldberg machine. to British English", () => {
    const input = "Like a high tech Rube Goldberg machine.";
    const output = "Like a high tech Heath Robinson device.";

    const [translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate To play hooky means to skip class or work. to British English", () => {
    const input = "To play hooky means to skip class or work.";
    const output = "To bunk off means to skip class or work.";

    const [translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate No Mr. Bond, I expect you to die. to British English", () => {
    const input = "No Mr. Bond, I expect you to die.";
    const output = "No Mr Bond, I expect you to die.";

    const [translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate Dr. Grosh will see you now. to British English", () => {
    const input = "Dr. Grosh will see you now.";
    const output = "Dr Grosh will see you now.";

    const [translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate Lunch is at 12:15 today. to British English", () => {
    const input = "Lunch is at 12:15 today.";
    const output = "Lunch is at 12.15 today.";

    const [translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate We watched the footie match for a while. to American English", () => {
    const input = "We watched the footie match for a while.";
    const output = "We watched the soccer match for a while.";

    const [translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate Paracetamol takes up to an hour to work. to American English", () => {
    const input = "Paracetamol takes up to an hour to work.";
    const output = "Tylenol takes up to an hour to work.";

    const [translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate First, caramelise the onions. to American English", () => {
    const input = "First, caramelise the onions.";
    const output = "First, caramelize the onions.";

    const [translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate I spent the bank holiday at the funfair. to American English", () => {
    const input = "I spent the bank holiday at the funfair.";
    const output = "I spent the public holiday at the carnival.";

    const [translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate I had a bicky then went to the chippy. to American English", () => {
    const input = "I had a bicky then went to the chippy.";
    const output = "I had a cookie then went to the fish-and-chip shop.";

    const [translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate I've just got bits and bobs in my bum bag. to American English", () => {
    const input = "I've just got bits and bobs in my bum bag.";
    const output = "I've just got odds and ends in my fanny pack.";

    const [translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate The car boot sale at Boxted Airfield was called off. to American English", () => {
    const input = "The car boot sale at Boxted Airfield was called off.";
    const output = "The swap meet at Boxted Airfield was called off.";

    const [translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate Have you met Mrs Kalyani? to American English", () => {
    const input = "Have you met Mrs Kalyani?";
    const output = "Have you met Mrs. Kalyani?";

    const [translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate Prof Joyner of King's College, London. to American English", () => {
    const input = "Prof Joyner of King's College, London.";
    const output = "Prof. Joyner of King's College, London.";

    const [translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Translate Tea time is usually around 4 or 4.30. to American English", () => {
    const input = "Tea time is usually around 4 or 4.30.";
    const output = "Tea time is usually around 4 or 4:30.";

    const [translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Highlight translation in Mangoes are my favorite fruit.", () => {
    const input = "Mangoes are my favorite fruit.";
    const output =
      'Mangoes are my <span class="highlight">favourite</span> fruit.';

    const [, translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Highlight translation in I ate yogurt for breakfast.", () => {
    const input = "I ate yogurt for breakfast.";
    const output =
      'I ate <span class="highlight">yoghurt</span> for breakfast.';

    const [, translation] = translator.toBritishEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Highlight translation in We watched the footie match for a while.", () => {
    const input = "We watched the footie match for a while.";
    const output =
      'We watched the <span class="highlight">soccer</span> match for a while.';

    const [, translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });

  test("Highlight translation in Paracetamol takes up to an hour to work.", () => {
    const input = "Paracetamol takes up to an hour to work.";
    const output =
      '<span class="highlight">Tylenol</span> takes up to an hour to work.';

    const [, translation] = translator.toAmericanEnglish(input);
    assert.strictEqual(translation, output);
  });
});
