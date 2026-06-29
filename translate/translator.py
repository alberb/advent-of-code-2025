import logging
from deep_translator import GoogleTranslator

# Configure module logger
logger = logging.getLogger(__name__)


def translate_text(text, source_lang='en', target_lang='fr'):
    """
    Translate text between languages using deep_translator.

    Args:
        text (str): The text to translate.
        source_lang (str): BCP-47 language code for the source language (default: 'en').
        target_lang (str): BCP-47 language code for the target language (default: 'fr').

    Returns:
        str: The translated text.

    Raises:
        ValueError: If an unsupported language code is provided.
        Exception: Re-raises any unexpected translation errors.
    """
    logger.debug(f"translate_text() called with source_lang='{source_lang}', target_lang='{target_lang}', text_length={len(text)}")
    
    try:
        supported = GoogleTranslator().get_supported_languages(as_dict=True)
        # supported is a dict of {language_name: code}
        supported_codes = set(supported.values())
        logger.debug(f"Retrieved {len(supported_codes)} supported language codes from GoogleTranslator")

        if source_lang != 'auto' and source_lang not in supported_codes:
            error_msg = f"Unsupported source language code: '{source_lang}'. Supported codes: {sorted(supported_codes)}"
            logger.error(error_msg)
            raise ValueError(error_msg)
        
        logger.debug(f"Source language '{source_lang}' validated successfully")
        
        if target_lang not in supported_codes:
            error_msg = f"Unsupported target language code: '{target_lang}'. Supported codes: {sorted(supported_codes)}"
            logger.error(error_msg)
            raise ValueError(error_msg)
        
        logger.debug(f"Target language '{target_lang}' validated successfully")

        logger.info(f"Translating text from '{source_lang}' to '{target_lang}' (text length: {len(text)} chars)")
        translator = GoogleTranslator(source=source_lang, target=target_lang)
        result = translator.translate(text)
        
        logger.info(f"Translation successful: '{source_lang}' → '{target_lang}' (result length: {len(result)} chars)")
        logger.debug(f"Translation result: {result!r}")
        
        return result
    except ValueError as e:
        logger.error(f"Validation error in translate_text(): {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error during translation: {e}", exc_info=True)
        raise Exception(f"Translation failed: {e}") from e


if __name__ == "__main__":
    # Configure logging for example execution
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    logger.info("Starting translation examples")
    
    examples = [
        ("Hello, how are you?", "en", "fr"),
        ("Good morning!", "en", "es"),
        ("I love programming.", "en", "de"),
        ("Bonjour le monde", "fr", "en"),
    ]

    for i, (text, src, tgt) in enumerate(examples, 1):
        try:
            logger.info(f"Example {i}/{len(examples)}: Translating from {src} to {tgt}")
            translated = translate_text(text, src, tgt)
            print(f"[{src} → {tgt}] {text!r}  →  {translated!r}")
        except Exception as e:
            logger.error(f"Example {i} failed: {e}")
    
    logger.info("Translation examples completed")
