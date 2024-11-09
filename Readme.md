# TRANPEEER (CLI Tool for Language Translation)

The `tranpeer` CLI tool handles translation of sentences in English language to any other language provided by the [Google translate API](https://cloud.google.com/translate/docs/languages) for you in your terminal.

## Get sarted:

To install the CLI tool on your machine:

```bash
npm install tranpeer

// To install globally on your machine
npm install -g tranpeer
```

To run the CLI tool locally, you can just use the following example command:

```bash
tranpeer -l "pt" -s "I want to play football"
```

## Supported commands:

[x]--version Show version number [boolean]
[x]-l, --language Translate to language [string]
[x]-s, --sentence Sentence to be translated [string]
[x]--help Show help [boolean]
