# madmarkdown-renderer
Markdown renderer for [MadUI](https://github.com/madlib-lang/madui)

## How to use it

Add it to the dependencies of your `madlib.json` file:
```json
{
  "dependencies": {
    "MarkdownRenderer": "https://github.com/madlib-lang/madmarkdown-renderer/archive/refs/heads/master.zip",
    "MadUI": "https://github.com/madlib-lang/madui/archive/refs/heads/master.zip"
  }
}
```
Run `madlib install`

```madlib
import { renderMarkdown } from "MarkdownRenderer"
import { render } from "MadUI"

yourMarkdown = `
# Hello World
`

render((_) => renderMarkdown(yourMarkdown), {}, "app")

```
