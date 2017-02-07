# transjson
JSON translation tool, CLI tool for i18n configure translation.

## Installation
`npm install -g transjson`

## Usage
```
Usage: transjson [options] <inputFile> <outputFile>

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -f, --from <fromLang>  from language, default is auto detect
    -t, --to <toLang>      to language, default is English
```

## Example
```
console > echo "{\"yes\":\"Yes\",\"no\":\"No\"}" > en.json

console > transjson --from en --to zh-tw en.json zh-tw.json
✔ 2 words translated

console > cat zh-tw.json
{
  "yes": "是",
  "no": "沒有"
}
```
