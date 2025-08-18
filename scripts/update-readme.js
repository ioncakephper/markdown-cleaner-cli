const fs = require("fs");
const path = require("path");
const npa = require("npm-package-arg");
const fetch = require("npm-registry-fetch");
const README_PATH = path.resolve(__dirname, "../README.md");
const PACKAGE_JSON_PATH = path.resolve(__dirname, "../package.json");
async function getAcknowledgments() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf-8"));
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  const allDependencies = [...dependencies, ...devDependencies].sort();
  const acknowledgments = [];
  for (const name of allDependencies) {
    try {
      const pkg = await fetch.json(`/${name}`);
      const description = pkg.description || "";
      acknowledgments.push(
        `- [${name}](https://www.npmjs.com/package/${name}) - ${description}`,
      );
    } catch (error) {
      console.error(`Could not fetch metadata for ${name}: ${error.message}`);
    }
  }
  return acknowledgments;
}
async function updateReadme() {
  const acknowledgments = await getAcknowledgments();
  const readme = fs.readFileSync(README_PATH, "utf-8");
  const newReadme = readme.replace(
    /<!-- ACKNOWLEDGMENTS_START -->[\s\S]*<!-- ACKNOWLEDGMENTS_END -->/,
    `<!-- ACKNOWLEDGMENTS_START -->\n${acknowledgments.join("\n")}\n<!-- ACKNOWLEDGMENTS_END -->`,
  );
  if (newReadme !== readme) {
    fs.writeFileSync(README_PATH, newReadme, "utf-8");
    console.log("Updated README with the latest acknowledgments.");
  } else {
    console.log("Acknowledgments in README are already up-to-date.");
  }
}
updateReadme();
