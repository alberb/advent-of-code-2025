# Node.js Translator Module

This is a Node.js port of the Python `translator.py` module. It provides a simple interface for translating text between different languages using the Google Translate API.

## Installation

```bash
cd translate
npm install
```

## Usage

### As a Module

```javascript
const { translateText } = require('./translator');

(async () => {
  try {
    const result = await translateText('Hello, how are you?', 'en', 'fr');
    console.log(result); // "Bonjour, comment allez-vous?"
  } catch (error) {
    console.error('Translation error:', error.message);
  }
})();
```

### Running Examples

```bash
node translate.js
# or
npm start
```

## API Reference

### `translateText(text, sourceLang, targetLang)`

Translates text from one language to another.

**Parameters:**
- `text` (string): The text to translate
- `sourceLang` (string, optional): BCP-47 language code for source language (default: `'en'`)
- `targetLang` (string, optional): BCP-47 language code for target language (default: `'fr'`)

**Returns:**
- `Promise<string>`: The translated text

**Throws:**
- `Error`: If translation fails or invalid parameters are provided

**Example:**
```javascript
const result = await translateText('Good morning!', 'en', 'es');
console.log(result); // "¡Buenos días!"
```

## Supported Languages

The module supports all languages supported by Google Translate, including:
- English (en)
- French (fr)
- Spanish (es)
- German (de)
- Chinese (zh)
- Japanese (ja)
- And many more...

For a complete list, refer to the [google-translate-api-x documentation](https://github.com/AnyISalIn/google-translate-api-x).

## Differences from Python Version

- **Async/Await**: The Node.js version uses async/await since the Google Translate API is asynchronous
- **Error Handling**: Errors are thrown and should be caught with try/catch blocks
- **Language Validation**: The Node.js version relies on the underlying API for language validation

## Requirements

- Node.js >= 14.0.0
- npm or yarn

## License

MIT
