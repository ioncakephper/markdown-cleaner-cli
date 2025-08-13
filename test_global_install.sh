#!/bin/bash

set -e

# 1. Install the package globally
echo "Installing package globally..."
npm install -g .

# 2. Create a temporary directory
TEMP_DIR=$(mktemp -d -t mdclean-test-XXXXXX)
echo "Created temporary directory: $TEMP_DIR"

# 3. Change to the temporary directory
cd "$TEMP_DIR"

# 4. Create a dummy markdown file
TEST_FILE="test.md"
echo "# Hello World" > "$TEST_FILE"
echo "Created dummy file: $TEST_FILE"

# 5. Invoke the mdclean command on the dummy file
echo "Invoking mdclean on $TEST_FILE..."
mdclean "$TEST_FILE"

# 6. Check the output (assuming mdclean prints 'Cleaning file: <file>')
# For now, we just check if the command runs without error.
# In a real scenario, you would check the content of the cleaned file.
echo "mdclean command executed successfully."

# 7. Clean up the temporary directory
echo "Cleaning up temporary directory..."
cd -
rm -rf "$TEMP_DIR"

# 8. Uninstall the global package
echo "Uninstalling global package..."
npm uninstall -g markdown-cleaner-cli

echo "Global installation test completed successfully."
