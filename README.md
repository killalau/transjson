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

Example of execution:

```
> echo "{\"404\":\"Page not found\",\"hello_world\":\"Hello World\",\"nested\":{\"value\":\"Nested value\"}}" > en.json

> cat en.json
{"404":"Page not found","hello_world":"Hello World","nested":{"value":"Nested value"}}

> transjson --from en --to zh-tw en.json zh-tw.json
✔ 3 words translated

> cat zh-tw.json
{
  "404": "找不到網頁",
  "hello_world": "你好，世界",
  "nested": {
    "value": "嵌套值"
  }
}

> transjson --from en --to ja en.json ja.json
✔ 3 words translated

> cat ja.json
{
  "404": "ページが見つかりません",
  "hello_world": "こんにちは世界",
  "nested": {
    "value": "ネストされた値"
  }
}
```

## Language Code
For all language parameters (`--from`, `--to`), ISO 639-1 language code is used. (except chinese, `zh-tw` for Traditional Chinese, `zh-cn` for Simplified Chinese)

Reference: [https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)