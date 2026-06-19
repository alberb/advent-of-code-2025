"""
english_to_french_translator.py
--------------------------------
Translates English text to French using the LibreTranslate API.

Usage:
    Run directly:  python english_to_french_translator.py
    Import:        from english_to_french_translator import translate_english_to_french

Requirements:
    pip install requests

API:
    This script uses the free LibreTranslate instance at https://libretranslate.de.
    No API key is required for basic usage, but rate limits may apply.
"""

import requests


LIBRETRANSLATE_URL = "https://libretranslate.de/translate"


def translate_english_to_french(text: str) -> str:
    """
    Translate a string from English to French using the LibreTranslate API.

    Args:
        text (str): The English text to translate.

    Returns:
        str: The translated French text, or an error message if the call fails.

    Raises:
        ValueError: If the input text is empty.
    """
    if not text or not text.strip():
        raise ValueError("Input text must not be empty.")

    payload = {
        "q": text,
        "source": "en",
        "target": "fr",
        "format": "text",
    }

    headers = {
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(
            LIBRETRANSLATE_URL,
            json=payload,
            headers=headers,
            timeout=10,
        )
        response.raise_for_status()  # Raises HTTPError for 4xx/5xx responses

        data = response.json()
        translated_text = data.get("translatedText")

        if translated_text is None:
            raise ValueError(f"Unexpected API response format: {data}")

        return translated_text

    except requests.exceptions.ConnectionError:
        return "[Error] Could not connect to the LibreTranslate API. Check your internet connection."
    except requests.exceptions.Timeout:
        return "[Error] The request to LibreTranslate timed out. Please try again."
    except requests.exceptions.HTTPError as e:
        return f"[Error] HTTP error from LibreTranslate API: {e}"
    except requests.exceptions.RequestException as e:
        return f"[Error] An unexpected error occurred: {e}"


def main():
    """
    Demonstrate the translator with a set of example English phrases.
    """
    test_cases = [
        "Hello, how are you?",
        "I am solving Advent of Code puzzles.",
        "Python is a great programming language.",
        "The quick brown fox jumps over the lazy dog.",
        "Good morning! Have a wonderful day.",
    ]

    print("=" * 60)
    print("       English → French Translator (LibreTranslate)")
    print("=" * 60)

    for phrase in test_cases:
        print(f"\n  EN: {phrase}")
        translation = translate_english_to_french(phrase)
        print(f"  FR: {translation}")

    print("\n" + "=" * 60)
    print("Translation complete.")


if __name__ == "__main__":
    main()
