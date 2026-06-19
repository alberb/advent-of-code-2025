#!/usr/bin/env python3
"""
English-to-French Translator
============================
Translates English text to French using the `deep_translator` library.

Usage modes:
  1. Command-line argument : python translator.py "Hello, how are you?"
  2. File input/output     : python translator.py --file input.txt [--output output.txt]
  3. Interactive mode      : python translator.py
"""

import sys
import argparse
import os


def get_translator():
    """
    Import and return a translate function using deep_translator.
    Raises ImportError with a helpful message if the library is not installed.
    """
    try:
        from deep_translator import GoogleTranslator
        return GoogleTranslator(source="en", target="fr")
    except ImportError:
        print(
            "Error: 'deep_translator' is not installed.\n"
            "Install it with:  pip install -r translator/requirements.txt",
            file=sys.stderr,
        )
        sys.exit(1)


def translate_text(translator, text: str) -> str:
    """
    Translate a single string from English to French.

    Args:
        translator: A GoogleTranslator instance.
        text:       The English text to translate.

    Returns:
        The French translation as a string.

    Raises:
        ValueError: If the input text is empty or whitespace-only.
    """
    text = text.strip()
    if not text:
        raise ValueError("Input text must not be empty.")
    return translator.translate(text)


def translate_file(translator, input_path: str, output_path: str = None):
    """
    Translate every non-empty line in *input_path* and write results to
    *output_path* (or print to stdout when output_path is None).

    Args:
        translator:  A GoogleTranslator instance.
        input_path:  Path to the file containing English text.
        output_path: Optional path for the translated output file.
    """
    if not os.path.isfile(input_path):
        print(f"Error: File not found — '{input_path}'", file=sys.stderr)
        sys.exit(1)

    with open(input_path, "r", encoding="utf-8") as fh:
        lines = fh.readlines()

    translated_lines = []
    for i, line in enumerate(lines, start=1):
        stripped = line.rstrip("\n")
        if stripped.strip() == "":
            # Preserve blank lines as-is
            translated_lines.append("")
            continue
        try:
            result = translate_text(translator, stripped)
            translated_lines.append(result)
            print(f"[{i}] {stripped}  →  {result}")
        except Exception as exc:
            print(f"Warning: Could not translate line {i}: {exc}", file=sys.stderr)
            translated_lines.append(stripped)  # keep original on failure

    output = "\n".join(translated_lines)

    if output_path:
        with open(output_path, "w", encoding="utf-8") as fh:
            fh.write(output + "\n")
        print(f"\nTranslation saved to '{output_path}'")
    else:
        print("\n--- Full Translation ---")
        print(output)


def interactive_mode(translator):
    """
    Run an interactive REPL that prompts the user for English text and
    prints the French translation until the user quits.
    """
    print("English-to-French Translator (interactive mode)")
    print("Type your English text and press Enter to translate.")
    print("Type 'quit' or 'exit' (or press Ctrl+C) to stop.\n")

    while True:
        try:
            user_input = input("English: ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nGoodbye! / Au revoir!")
            break

        if user_input.lower() in ("quit", "exit", "q"):
            print("Goodbye! / Au revoir!")
            break

        if not user_input:
            print("(empty input — please enter some text)\n")
            continue

        try:
            result = translate_text(translator, user_input)
            print(f"French:  {result}\n")
        except Exception as exc:
            print(f"Translation error: {exc}\n", file=sys.stderr)


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="translator",
        description="Translate English text to French.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            '  python translator.py "Hello, world!"\n'
            "  python translator.py --file input.txt\n"
            "  python translator.py --file input.txt --output output.txt\n"
            "  python translator.py          # interactive mode\n"
        ),
    )
    parser.add_argument(
        "text",
        nargs="?",
        metavar="TEXT",
        help="English text to translate (wrap in quotes if it contains spaces).",
    )
    parser.add_argument(
        "--file", "-f",
        metavar="INPUT_FILE",
        help="Path to a plain-text file containing English text (one sentence per line).",
    )
    parser.add_argument(
        "--output", "-o",
        metavar="OUTPUT_FILE",
        help="Path to write the French translation (used with --file). "
             "Defaults to printing to stdout.",
    )
    return parser


def main():
    parser = build_arg_parser()
    args = parser.parse_args()

    # Validate: --output only makes sense with --file
    if args.output and not args.file:
        parser.error("--output requires --file to be specified.")

    translator = get_translator()

    # ------------------------------------------------------------------ #
    # Mode 1 — inline text supplied as a positional argument              #
    # ------------------------------------------------------------------ #
    if args.text:
        try:
            result = translate_text(translator, args.text)
            print(f"English: {args.text}")
            print(f"French:  {result}")
        except ValueError as exc:
            print(f"Error: {exc}", file=sys.stderr)
            sys.exit(1)

    # ------------------------------------------------------------------ #
    # Mode 2 — file input                                                 #
    # ------------------------------------------------------------------ #
    elif args.file:
        translate_file(translator, args.file, args.output)

    # ------------------------------------------------------------------ #
    # Mode 3 — interactive REPL                                           #
    # ------------------------------------------------------------------ #
    else:
        interactive_mode(translator)


if __name__ == "__main__":
    main()
