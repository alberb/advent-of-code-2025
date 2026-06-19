# English-to-French Translator

A lightweight command-line utility that translates English text to French.
It is powered by [`deep-translator`](https://pypi.org/project/deep-translator/),
which wraps the Google Translate API without requiring an API key.

---

## Installation

```bash
# From the repository root
pip install -r translator/requirements.txt
```

---

## Usage

All three modes are invoked from the **`translator/`** directory (or by
prefixing the path when running from the repo root).

### 1. Command-line mode

Pass the English text directly as a positional argument:

```bash
python translator.py "Hello, how are you?"
```

**Output:**
```
English: Hello, how are you?
French:  Bonjour comment allez-vous?
```

---

### 2. File mode

Translate every line of a plain-text file and print results to the console:

```bash
python translator.py --file input.txt
# short form:
python translator.py -f input.txt
```

Optionally write the translated output to a file instead:

```bash
python translator.py --file input.txt --output output.txt
# short form:
python translator.py -f input.txt -o output.txt
```

**Example `input.txt`:**
```
Good morning!
The weather is nice today.
I love programming.
```

**Console output:**
```
[1] Good morning!  →  Bonjour!
[2] The weather is nice today.  →  La météo est belle aujourd'hui.
[3] I love programming.  →  J'adore la programmation.

--- Full Translation ---
Bonjour!
La météo est belle aujourd'hui.
J'adore la programmation.
```

---

### 3. Interactive mode

Run the script with no arguments to enter an interactive REPL:

```bash
python translator.py
```

**Session example:**
```
English-to-French Translator (interactive mode)
Type your English text and press Enter to translate.
Type 'quit' or 'exit' (or press Ctrl+C) to stop.

English: Where is the library?
French:  Où est la bibliothèque?

English: I would like a coffee, please.
French:  Je voudrais un café, s'il vous plaît.

English: quit
Goodbye! / Au revoir!
```

---

## Example Translations

| English | French |
|---|---|
| Hello, world! | Bonjour le monde! |
| Good morning | Bonjour |
| Good evening | Bonsoir |
| Thank you very much | Merci beaucoup |
| Where is the train station? | Où est la gare? |
| I don't understand | Je ne comprends pas |
| How much does this cost? | Combien ça coûte? |
| My name is Alice | Je m'appelle Alice |
| See you tomorrow | À demain |
| I love programming | J'adore la programmation |

---

## Options Reference

```
usage: translator [-h] [--file INPUT_FILE] [--output OUTPUT_FILE] [TEXT]

Translate English text to French.

positional arguments:
  TEXT                  English text to translate (wrap in quotes if it
                        contains spaces).

options:
  -h, --help            show this help message and exit
  --file INPUT_FILE, -f INPUT_FILE
                        Path to a plain-text file containing English text
                        (one sentence per line).
  --output OUTPUT_FILE, -o OUTPUT_FILE
                        Path to write the French translation (used with
                        --file). Defaults to printing to stdout.
```

---

## Error Handling

| Scenario | Behaviour |
|---|---|
| `deep-translator` not installed | Prints install instructions and exits with code 1 |
| Empty string passed as text | Raises `ValueError` with a clear message |
| Input file not found | Prints error and exits with code 1 |
| `--output` without `--file` | `argparse` error with usage hint |
| Network / API error on a single line | Warns and keeps the original English line |

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `deep-translator` | 1.11.4 | Wraps Google Translate (no API key required) |
