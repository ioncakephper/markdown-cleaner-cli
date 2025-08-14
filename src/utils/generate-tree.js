const fs = require("fs");
const path = require("path");

const README_PATH = path.resolve(__dirname, "../../README.md");

function generateTree(dir, indent = "", isLast = false, exclude = []) {
  let tree = "";
  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (dirent) =>
        !exclude.includes(dirent.name) &&
        !exclude.some((ex) => dirent.name.startsWith(ex + "/")),
    )
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const isLastFile = i === files.length - 1;
    const prefix = isLastFile ? "└── " : "├── ";
    const newIndent = indent + (isLast ? "    " : "│   ");

    tree += `${indent}${prefix}${file.name}\n`;

    if (file.isDirectory()) {
      tree += generateTree(
        path.join(dir, file.name),
        newIndent,
        isLastFile,
        exclude,
      );
    }
  }
  return tree;
}

function updateReadme() {
  let readmeContent = fs.readFileSync(README_PATH, "utf-8");
  console.log("Updating README.md Project Structure...");

  const exclude = [
    ".git",
    "node_modules",
    ".qodo",
    ".github", // Exclude .github directory from the tree
  ];

  let projectTree = ".\n"; // Add root directory
  projectTree += generateTree(
    path.resolve(__dirname, "../../"),
    "",
    false,
    exclude,
  );

  const projectStructureSection =
    "## 🌳 Project Structure\n\n```\n" + projectTree + "```\n";

  const startMarker = "<!-- PROJECT_STRUCTURE_START -->";
  const endMarker = "<!-- PROJECT_STRUCTURE_END -->";

  const startIndex = readmeContent.indexOf(startMarker);
  const endIndex = readmeContent.indexOf(endMarker);

  const projectTreeOnly = "```\n" + projectTree + "```";

  if (startIndex !== -1 && endIndex !== -1) {
    const blockStartIndex = startIndex + startMarker.length;
    const blockEndIndex = endIndex;
    const blockContent = readmeContent.substring(
      blockStartIndex,
      blockEndIndex,
    );

    const treeRegex = /```[\s\S]*?```/;
    const newBlockContent = blockContent.replace(treeRegex, projectTreeOnly);

    const before = readmeContent.substring(0, blockStartIndex);
    const after = readmeContent.substring(blockEndIndex);

    readmeContent = `${before}${newBlockContent}${after}`;
  } else {
    // Add new section before Community & Support
    const communitySupportHeading = "## 💬 Community & Support";
    const newSection = `## 🌳 Project Structure

[//]: # (You can add your Markdown content here. This comment can be safely removed by deleting this line.)

${startMarker}
${projectTreeOnly}
${endMarker}`;

    if (readmeContent.includes(communitySupportHeading)) {
      readmeContent = readmeContent.replace(
        communitySupportHeading,
        `${newSection}\n\n---\n\n${communitySupportHeading}`,
      );
    } else {
      // If Community & Support not found, append at the end
      readmeContent += `\n\n---\n\n${newSection}`;
    }
  }

  if (projectTree.trim() !== "") {
    fs.writeFileSync(README_PATH, readmeContent, "utf-8");
    console.log("README.md Project Structure updated.");
  } else {
    console.log("Project tree is empty, skipping README.md update.");
  }
}

updateReadme();
