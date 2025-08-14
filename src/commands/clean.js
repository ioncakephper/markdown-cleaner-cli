const fs = require("fs");

module.exports = (program) => {
  program
    .command("clean <file>")
    .description("Clean the Markdown file by removing unnecessary elements")
    .option("-f, --force", "overwrite output file if it exists")
    .option("-q, --quiet", "suppress all output except errors")
    .action((file, options) => {
      if (!fs.existsSync(file)) {
        console.error(`File not found: ${file}`);
        process.exit(1);
      }
      let content = fs.readFileSync(file, "utf8");

      // 1. Normalize line endings to \n
      content = content.replace(/\r\n|\r/g, "\n");

      // 2. Trim trailing whitespace on each line
      content = content
        .split("\n")
        .map((line) => line.trimEnd())
        .join("\n");

      // 3. Remove extra blank lines (more than one consecutive blank line)
      content = content.replace(/\n{2,}/g, "\n\n");

      // 4. Convert Setex-style headings to ATX-style headings
      content = content.replace(/^(.*)\n=+\s*$/gm, (match, p1) => `# ${p1}`);
      content = content.replace(/^(.*)\n-+\s*$/gm, (match, p1) => `## ${p1}`);

      // Existing cleaning steps
      content = content
        .replace(/<!--.*?-->/gs, "") // Remove HTML comments
        .replace(/^\s*[\r\n]/gm, "") // Remove empty lines
        .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
        .trim(); // Trim leading and trailing whitespace
      fs.writeFileSync(file, content, "utf8");
      console.log(`Cleaned content written to ${file}`);
    });
};
