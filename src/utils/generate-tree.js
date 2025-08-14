const fs = require('fs');
const path = require('path');
const glob = require('glob');

const README_PATH = path.resolve(__dirname, '../../README.md');

function generateTree(dir, indent = '', isLast = false, exclude = []) {
    let tree = '';
    const files = fs.readdirSync(dir, { withFileTypes: true })
        .filter(dirent => !exclude.includes(dirent.name))
        .sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            return a.name.localeCompare(b.name);
        });

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isLastFile = (i === files.length - 1);
        const prefix = isLastFile ? '└── ' : '├── ';
        const newIndent = indent + (isLast ? '    ' : '│   ');

        tree += `${indent}${prefix}${file.name}\n`;

        if (file.isDirectory()) {
            tree += generateTree(path.join(dir, file.name), newIndent, isLastFile, exclude);
        }
    }
    return tree;
}

function updateReadme() {
    let readmeContent = fs.readFileSync(README_PATH, 'utf-8');

    const exclude = [
        '.git',
        'node_modules',
        '.qodo',
        '.github/workflows' // Exclude workflows directory from the tree
    ];

    const projectTree = generateTree(path.resolve(__dirname, '../../'), '', false, exclude);

    const projectStructureSection = "## 🌳 Project Structure\n\n```\n" + projectTree + "```\n";

    const startMarker = '<!-- PROJECT_STRUCTURE_START -->';
    const endMarker = '<!-- PROJECT_STRUCTURE_END -->';

    if (readmeContent.includes(startMarker) && readmeContent.includes(endMarker)) {
        // Update existing section
        readmeContent = readmeContent.replace(
            new RegExp(`${startMarker}[\s\S]*${endMarker}`),
            `${startMarker}\n${projectStructureSection}\n${endMarker}`
        );
    } else {
        // Add new section before Community & Support
        const communitySupportHeading = '## 💬 Community & Support';
        if (readmeContent.includes(communitySupportHeading)) {
            readmeContent = readmeContent.replace(
                communitySupportHeading,
                `${projectStructureSection}\n\n---\n\n${communitySupportHeading}`
            );
        } else {
            // If Community & Support not found, append at the end
            readmeContent += `\n\n---\n\n${projectStructureSection}`;
        }
    }

    fs.writeFileSync(README_PATH, readmeContent, 'utf-8');
    console.log('README.md Project Structure updated.');
}

updateReadme();
