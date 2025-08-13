const { execSync } = require('child_process');
const path = require('path');

const cliPath = path.resolve(__dirname, '..', 'src', 'index.js');

describe('CLI Tests', () => {
  test('should display help message when run with no arguments', () => {
    let output = '';
    try {
      output = execSync(`node "${cliPath}"`).toString();
    } catch (error) {
      output = error.stdout.toString() + error.stderr.toString();
    }
    expect(output).toContain('Usage: mdclean [options] [command]');
  });

  test('should display help message when run with -h', () => {
    const output = execSync(`node "${cliPath}" -h`).toString();
    expect(output).toContain('Usage: mdclean [options] [command]');
  });

  test('should display version when run with -V', () => {
    const output = execSync(`node "${cliPath}" -V`).toString();
    // Get version from package.json
    const packageVersion = require('../package.json').version;
    expect(output).toContain(packageVersion);
  });
});
