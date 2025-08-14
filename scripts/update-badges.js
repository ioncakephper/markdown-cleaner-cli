const fs = require("fs");
const path = require("path");

const REPO = "ioncakephper/markdown-cleaner-cli";
const NPM = "markdown-cleaner-cli";
const root = path.join(__dirname, "..");

function hasFile(file) {
  return fs.existsSync(path.join(root, file));
}
function hasTestFiles() {
  return hasFile("tests") || hasFile("test");
}
function licenseType() {
  const licensePath = path.join(root, "LICENSE");
  if (!fs.existsSync(licensePath)) return null;
  const content = fs.readFileSync(licensePath, "utf8").toLowerCase();
  if (content.includes("mit")) return "MIT";
  if (content.includes("apache")) return "Apache";
  if (content.includes("gpl")) return "GPL";
  return null;
}
function hasCoverageScript(pkg) {
  return (
    pkg.scripts.nyc ||
    pkg.devDependencies?.nyc ||
    pkg.devDependencies?.coveralls ||
    pkg.devDependencies?.codecov
  );
}

function detectBadges(pkg) {
  const badges = [];

  // NPM Version and Downloads
  badges.push(
    `[![npm version](https://img.shields.io/npm/v/${NPM}.svg)](https://www.npmjs.com/package/${NPM})`,
  );
  badges.push(
    `[![npm downloads](https://img.shields.io/npm/dm/${NPM}.svg)](https://www.npmjs.com/package/${NPM})`,
  );

  // GitHub Actions CI
  if (hasFile(".github/workflows/docblock-checker.yml")) {
    badges.push(
      `[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/${REPO}/docblock-checker.yml?branch=main)](https://github.com/${REPO}/actions)`,
    );
  }

  // License badge (AI check from LICENSE file)
  const license = licenseType() || pkg.license;
  if (license === "MIT") {
    badges.push(
      `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/${REPO}/blob/main/LICENSE)`,
    );
  } else if (license === "Apache") {
    badges.push(
      `[![License: Apache](https://img.shields.io/badge/License-Apache-blue.svg)](https://github.com/${REPO}/blob/main/LICENSE)`,
    );
  } else if (license === "GPL") {
    badges.push(
      `[![License: GPL](https://img.shields.io/badge/License-GPL-blue.svg)](https://github.com/${REPO}/blob/main/LICENSE)`,
    );
  }

  // Prettier
  if (pkg.devDependencies?.prettier || pkg.dependencies?.prettier) {
    badges.push(
      `[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)`,
    );
  }

  // Jest
  if (pkg.devDependencies?.jest || pkg.dependencies?.jest) {
    badges.push(
      `[![Test: Jest](https://img.shields.io/badge/tests-jest-99424f.svg)](https://jestjs.io/)`,
    );
  }
  // Coverage
  if (hasCoverageScript(pkg)) {
    badges.push(
      `[![Coverage Status](https://img.shields.io/badge/coverage-active-brightgreen)]()`,
    );
  }
  // EditorConfig
  if (hasFile(".editorconfig")) {
    badges.push(
      `[![EditorConfig](https://img.shields.io/badge/EditorConfig-enabled-orange.svg)](https://editorconfig.org/)`,
    );
  }
  // Code of Conduct
  if (hasFile("CODE_OF_CONDUCT.md")) {
    badges.push(
      `[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-active-green.svg)](CODE_OF_CONDUCT.md)`,
    );
  }
  // Contributing
  if (hasFile("CONTRIBUTING.md")) {
    badges.push(
      `[![Contributing](https://img.shields.io/badge/contributions-welcome-blue.svg)](CONTRIBUTING.md)`,
    );
  }
  // Changelog
  if (hasFile("CHANGELOG.md")) {
    badges.push(
      `[![Changelog](https://img.shields.io/badge/changelog-active-blue.svg)](CHANGELOG.md)`,
    );
  }
  // Tests folder
  if (hasTestFiles()) {
    badges.push(
      `[![Tests](https://img.shields.io/badge/tests-present-important.svg)]()`,
    );
  }
  return badges;
}

function updateReadme(badges) {
  const readmePath = path.join(root, "README.md");
  const content = fs.readFileSync(readmePath, "utf8");
  const lines = content.split(/\r?\n/);

  let i = 0;
  while (i < lines.length && !lines[i].startsWith("# ")) i++;
  if (i === lines.length) return;
  const titleLine = lines[i];
  let j = i + 1;
  while (
    j < lines.length &&
    (lines[j].trim() === "" ||
      /^\[!\[.*\]\(.*\)\]|^!\[.*\]\(.*\)/.test(lines[j].trim()))
  ) {
    j++;
  }
  const newLines = [
    ...lines.slice(0, i + 1),
    "",
    ...badges,
    "",
    ...lines.slice(j),
  ];
  fs.writeFileSync(readmePath, newLines.join("\n"));
}

function main() {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json")));
  const badges = detectBadges(pkg);
  updateReadme(badges);
  console.log("Badges updated in README.md");
}

main();
