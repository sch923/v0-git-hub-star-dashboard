"use client"

interface RepoReadmeProps {
  owner: string
  name: string
}

// Sample data - in a real app, this would come from the GitHub API
const getReadme = (owner: string, name: string) => {
  // This is mock data
  if (name === "next.js") {
    return `
# Next.js

The React Framework for the Web

## Getting Started

Visit [nextjs.org/learn](https://nextjs.org/learn) to get started with Next.js.

## Documentation

Visit [nextjs.org/docs](https://nextjs.org/docs) to view the full documentation.

## Community

The Next.js community can be found on [GitHub Discussions](https://github.com/vercel/next.js/discussions), where you can ask questions, voice ideas, and share your projects.

## Contributing

Please see our [contributing.md](https://github.com/vercel/next.js/blob/canary/contributing.md).

## Authors

- Tim Neutkens ([@timneutkens](https://twitter.com/timneutkens))
- Naoyuki Kanezawa ([@nkzawa](https://twitter.com/nkzawa))
- Guillermo Rauch ([@rauchg](https://twitter.com/rauchg))
- Arunoda Susiripala ([@arunoda](https://twitter.com/arunoda))
- Tony Kovanen ([@tonykovanen](https://twitter.com/tonykovanen))
- Dan Zajdband ([@impronunciable](https://twitter.com/impronunciable))
`
  } else {
    return `
# ${name}

Sample README for ${name} repository.

## Getting Started

\`\`\`bash
npm install ${name}
\`\`\`

## Usage

\`\`\`javascript
import { something } from '${name}'

// Use the library
something()
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3

## License

MIT
`
  }
}

export function RepoReadme({ owner, name }: RepoReadmeProps) {
  const readme = getReadme(owner, name)

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <div dangerouslySetInnerHTML={{ __html: formatMarkdown(readme) }} />
    </div>
  )
}

// Simple markdown formatter (in a real app, use a proper markdown library)
function formatMarkdown(markdown: string) {
  return markdown
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*)\*\*/gm, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gm, "<em>$1</em>")
    .replace(/\[(.*?)\]$$(.*?)$$/gm, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/```(.*?)```/gs, (match, p1) => `<pre><code>${p1}</code></pre>`)
    .replace(/`(.*?)`/gm, "<code>$1</code>")
    .replace(/\n/gm, "<br>")
}
