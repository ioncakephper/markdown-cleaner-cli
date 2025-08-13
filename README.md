# 🧼 Markdown Cleaner CLI

<p align="center">
  <img src="assets/branding/logo-light.png" alt="markdown-cleaner-cli logo" width="300"/>
</p>

**A fast, zero-config CLI tool to clean and format Markdown files—remove trailing spaces, normalize headings, and tidy up your docs.**

---

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

To verify mdclean is available, use:

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

## 💬 Community & Support

If you have questions, ideas, or need help, please join our [Discussions](https://github.com/ioncakephper/markdown-cleaner-cli/discussions) page.

For bug reports and feature requests, please open an [issue](https://github.com/ioncakephper/markdown-cleaner-cli/issues).

---

## 🤝 Contributing

Contributions are welcome! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

We would like to thank the creators and maintainers of the following libraries and tools, which were instrumental in the development of this CLI and the management of its repository:

1.  **Commander.js**: For building robust and user-friendly command-line interfaces.
2.  **Jest**: For providing a delightful JavaScript testing framework.
3.  **Glob**: For flexible file system pattern matching.
4.  **Git**: For version control and collaborative development.
