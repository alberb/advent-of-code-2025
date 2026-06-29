const translate = require('google-translate-api-x');

/**
 * Translate text between languages using google-translate-api-x.
 *
 * @param {string} text - The text to translate.
 * @param {string} sourceLang - BCP-47 language code for the source language (default: 'en').
 * @param {string} targetLang - BCP-47 language code for the target language (default: 'fr').
 * @returns {Promise<string>} The translated text.
 * @throws {Error} If translation fails or unsupported language codes are provided.
 *
 * @example
 * const result = await translateText('Hello, how are you?', 'en', 'fr');
 * console.log(result); // "Bonjour, comment allez-vous?"
 */
async function translateText(text, sourceLang = 'en', targetLang = 'fr') {
  // Validate inputs
  if (!text || typeof text !== 'string') {
    throw new Error('Text must be a non-empty string');
  }

  if (typeof sourceLang !== 'string' || typeof targetLang !== 'string') {
    throw new Error('Language codes must be strings');
  }

  try {
    const result = await translate(text, {
      from: sourceLang,
      to: targetLang,
    });

    return result.text;
  } catch (error) {
    throw new Error(`Translation failed: ${error.message}`);
  }
}

// Main execution for testing
if (require.main === module) {
  const examples = [
    { text: 'Hello, how are you?', src: 'en', tgt: 'fr' },
    { text: 'Good morning!', src: 'en', tgt: 'es' },
    { text: 'I love programming.', src: 'en', tgt: 'de' },
    { text: 'Bonjour le monde', src: 'fr', tgt: 'en' },
  ];

  (async () => {
    for (const example of examples) {
      try {
        const translated = await translateText(example.text, example.src, example.tgt);
        console.log(`[${example.src} → ${example.tgt}] ${JSON.stringify(example.text)}  →  ${JSON.stringify(translated)}`);
      } catch (error) {
        console.error(`Error translating "${example.text}": ${error.message}`);
      }
    }
  })();
}

module.exports = { translateText };
