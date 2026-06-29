const { Translate } = require('@google-cloud/translate').v2;

// Initialize the Google Translate client.
// Requires the GOOGLE_CLOUD_PROJECT env var (or pass { projectId } explicitly),
// and GOOGLE_APPLICATION_CREDENTIALS pointing to a service-account key file.
const translate = new Translate();

/**
 * Fetch the list of supported BCP-47 language codes from the Google Translate API.
 *
 * @returns {Promise<Set<string>>} A Set of supported language codes (e.g. 'en', 'fr', 'de').
 */
async function getSupportedCodes() {
  const [languages] = await translate.getLanguages();
  return new Set(languages.map((lang) => lang.code));
}

/**
 * Translate text between languages using the Google Cloud Translate API.
 *
 * @param {string} text            - The text to translate.
 * @param {string} [sourceLang='en'] - BCP-47 language code for the source language.
 * @param {string} [targetLang='fr'] - BCP-47 language code for the target language.
 * @returns {Promise<string>}      - The translated text.
 * @throws {Error} If an unsupported language code is provided or translation fails.
 */
async function translateText(text, sourceLang = 'en', targetLang = 'fr') {
  const supportedCodes = await getSupportedCodes();

  if (sourceLang !== 'auto' && !supportedCodes.has(sourceLang)) {
    throw new Error(
      `Unsupported source language code: '${sourceLang}'. ` +
      `Supported codes: ${[...supportedCodes].sort().join(', ')}`
    );
  }

  if (!supportedCodes.has(targetLang)) {
    throw new Error(
      `Unsupported target language code: '${targetLang}'. ` +
      `Supported codes: ${[...supportedCodes].sort().join(', ')}`
    );
  }

  try {
    const options = { from: sourceLang === 'auto' ? undefined : sourceLang, to: targetLang };
    const [translation] = await translate.translate(text, options);
    return translation;
  } catch (err) {
    throw new Error(`Translation failed: ${err.message}`);
  }
}

// ── Example usage ────────────────────────────────────────────────────────────
if (require.main === module) {
  const examples = [
    { text: 'Hello, how are you?', src: 'en', tgt: 'fr' },
    { text: 'Good morning!',       src: 'en', tgt: 'es' },
    { text: 'I love programming.', src: 'en', tgt: 'de' },
    { text: 'Bonjour le monde',    src: 'fr', tgt: 'en' },
  ];

  (async () => {
    for (const { text, src, tgt } of examples) {
      try {
        const translated = await translateText(text, src, tgt);
        console.log(`[${src} → ${tgt}] "${text}"  →  "${translated}"`);
      } catch (err) {
        console.error(`Error translating "${text}": ${err.message}`);
      }
    }
  })();
}

module.exports = { translateText };
