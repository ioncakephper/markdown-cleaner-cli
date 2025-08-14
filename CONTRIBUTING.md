# Contributing to Markdown Cleaner CLI

Thank you for considering contributing to Markdown Cleaner CLI! Contributions are not only welcome—they are highly encouraged! The following guidelines help ensure a smooth process for everyone.

## How You Can Help

- **Reporting Bugs**: If you find a bug, please open an [issue](https://github.com/ioncakephper/markdown-cleaner-cli/issues) with clear reproduction steps and expected and actual behaviors. Include relevant logs, configs, and system info.
- **Suggesting Features**: Have an idea to improve this project? Open a [feature request](https://github.com/ioncakephper/markdown-cleaner-cli/issues) or start a discussion in [Discussions](https://github.com/ioncakephper/markdown-cleaner-cli/discussions).
- **Submitting Pull Requests**: Contributions of code, documentation, and tests are welcome! Please review the guidelines below before opening a pull request.

## Getting Started

1. Fork the repo and clone your fork locally.
2. Make sure you have [Node.js](https://nodejs.org/) installed.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a new branch for your change:

   ```bash
   git checkout -b my-feature
   ```

5. Make your changes with clear, descriptive commit messages.
6. Add or update documentation and tests as appropriate.

## Pull Request Guidelines

- Clearly describe your changes and why they are needed.
- If fixing a bug, include steps to reproduce and reference the related issue number.
- For significant changes or new features, please open an issue first to discuss your proposal.
- Ensure your code is clean and follows existing style and conventions.
- Run linter and tests before pushing:

  ```bash
  npm test
  ```

## Documentation Changes

- If you modify or add headers in `README.md`, run:

  ```bash
  npm run docs:toc
  ```

  This updates the Table of Contents section automatically.

- To keep the formatting of code and Markdown files consistent, run:

  ```bash
  npm run format
  ```

- If the project structure in the README needs updating, run:

  ```bash
  npm run docs:tree
  ```

- It is vital to run:

  ```bash
  npm run ready
  ```

  before submitting a pull request. This command will run all of the above steps (formatting, updating the project tree, and Table of Contents) to ensure your contribution is ready for review.

## Code of Conduct

By participating, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## Community & Support

For questions or to get involved in broader discussions, visit the [Discussions](https://github.com/ioncakephper/markdown-cleaner-cli/discussions) page.

---

We appreciate your effort and look forward to your contribution!
