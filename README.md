# 🧼 Markdown Cleaner CLI

[![npm version](https://img.shields.io/npm/v/markdown-cleaner-cli.svg)](https://www.npmjs.com/package/markdown-cleaner-cli)
[![npm downloads](https://img.shields.io/npm/dm/markdown-cleaner-cli.svg)](https://www.npmjs.com/package/markdown-cleaner-cli)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ioncakephper/markdown-cleaner-cli/docblock-checker.yml?branch=main)](https://github.com/ioncakephper/markdown-cleaner-cli/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ioncakephper/markdown-cleaner-cli/blob/main/LICENSE)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Test: Jest](https://img.shields.io/badge/tests-jest-99424f.svg)](https://jestjs.io/)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-active-green.svg)](CODE_OF_CONDUCT.md)
[![Contributing](https://img.shields.io/badge/contributions-welcome-blue.svg)](CONTRIBUTING.md)
[![Tests](https://img.shields.io/badge/tests-present-important.svg)]()

A fast, zero-config CLI tool to clean and format Markdown files.

---

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [🧼 Markdown Cleaner CLI](#-markdown-cleaner-cli)
  - [Table of Contents](#table-of-contents)
  - [🚀 Features](#-features)
  - [📦 Installation](#-installation)
  - [🧪 Usage](#-usage)
  - [🛠️ Commands](#️-commands)
    - [`clean <file>`](#clean-file)
  - [⚙️ Global Options](#️-global-options)
  - [🌳 Project Structure](#-project-structure)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [🙏 Acknowledgments](#-acknowledgments)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

...

## 🚀 Features

- 🧹 Cleans up messy Markdown formatting
- 🔄 Normalizes heading levels and spacing
- 🧼 Removes trailing whitespace and empty lines
- ⚡ Fast and zero-config
- 🛠️ Works with `.md` files in any project

---

## 📦 Installation

```bash
npm install -g markdown-cleaner-cli
```

This command installs the CLI tool globally, making the `mdclean` command available in your terminal from any directory.

To verify `mdclean` is available:

```bash
mdclean -V
```

---

## 🧪 Usage

To verify mdclean is available, use:

```bash
mdclean -V
```

To clean a Markdown file:

```bash
mdclean clean path/to/file.md
```

---

## 🛠️ Commands

### `clean <file>`

Clean the Markdown file by removing unnecessary elements.

**Options:**

- `-f, --force`: overwrite output file if it exists
- `-q, --quiet`: suppress all output except errors

---

## ⚙️ Global Options

- `-v, --verbose`: enable verbose output
- `--debug`: enable debug output
- `--silent`: suppress all output

---

## 🌳 Project Structure

[//]: # "You can add your Markdown content here. This comment can be safely removed by deleting this line."

<!-- PROJECT_STRUCTURE_START -->

```
.
├── .vscode
│   └── launch.json
├── src
│   ├── commands
│   │   └── clean.js
│   ├── utils
│   │   ├── commandLoader.js
│   │   ├── docblock-checker.js
│   │   ├── generate-tree.js
│   │   └── update-readme.js
│   ├── index.js
│   └── program.js
├── tests
│   └── cli.test.js
├── .gitignore
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

<!-- PROJECT_STRUCTURE_END -->

---

## 🤝 Contributing

We welcome contributions of all kinds! Whether you're reporting bugs, requesting features, improving documentation, or submitting pull requests, please first read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

You'll find tips on opening issues, coding standards, running tests, making documentation changes, and more.

- Use `npm run format` to ensure consistent code and documentation formatting.
- Use `npm run docs:tree` to update the Project Structure tree in the README.
- Use `npm run docs:toc` to update the Table of Contents in the README.
- For convenience, simply run `npm run ready` to execute all three steps in sequence (updating the project tree, updating the table of contents, and formatting) before submitting your changes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

We would like to thank the creators and maintainers of the following libraries and tools, which were instrumental in the development of this CLI and the management of its repository:

<!-- ACKNOWLEDGMENTS_START -->
- [commander](https://www.npmjs.com/package/commander) - the complete solution for node.js command-line programs
- [doctoc](https://www.npmjs.com/package/doctoc) - Generates TOC for markdown files of local git repo.
- [doctrine](https://www.npmjs.com/package/doctrine) - JSDoc parser
- [espree](https://www.npmjs.com/package/espree) - An Esprima-compatible JavaScript parser built on Acorn
- [esprima](https://www.npmjs.com/package/esprima) - ECMAScript parsing infrastructure for multipurpose analysis
- [glob](https://www.npmjs.com/package/glob) - the most correct and second fastest glob implementation in JavaScript
- [jest](https://www.npmjs.com/package/jest) - Delightful JavaScript Testing.
- [npm-registry-fetch](https://www.npmjs.com/package/npm-registry-fetch) - Fetch-based http client for use with npm registry APIs
- [prettier](https://www.npmjs.com/package/prettier) - Prettier is an opinionated code formatter
<!-- ACKNOWLEDGMENTS_END -->
