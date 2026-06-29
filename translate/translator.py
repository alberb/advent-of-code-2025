from deep_translator import GoogleTranslator


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
    supported = GoogleTranslator().get_supported_languages(as_dict=True)
    # supported is a dict of {language_name: code}
    supported_codes = set(supported.values())

    if source_lang != 'auto' and source_lang not in supported_codes:
        raise ValueError(
            f"Unsupported source language code: '{source_lang}'. "
            f"Supported codes: {sorted(supported_codes)}"
        )
    if target_lang not in supported_codes:
        raise ValueError(
            f"Unsupported target language code: '{target_lang}'. "
            f"Supported codes: {sorted(supported_codes)}"
        )

    try:
        translator = GoogleTranslator(source=source_lang, target=target_lang)
        return translator.translate(text)
    except Exception as e:
        raise Exception(f"Translation failed: {e}") from e


if __name__ == "__main__":
    examples = [
        ("Hello, how are you?", "en", "fr"),
        ("Good morning!", "en", "es"),
        ("I love programming.", "en", "de"),
        ("Bonjour le monde", "fr", "en"),
    ]

    for text, src, tgt in examples:
        translated = translate_text(text, src, tgt)
        print(f"[{src} → {tgt}] {text!r}  →  {translated!r}")
