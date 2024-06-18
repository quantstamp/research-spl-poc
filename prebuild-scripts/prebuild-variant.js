const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
require('dotenv').config();

// Define the source and output directories for contracts and tests
const sourceContractsDir = process.env.SPL_SRC_CONTRACTS_DIR;
const sourceTestDir = process.env.SPL_SRC_TESTS_DIR;
const outputContractsDir = process.env.SPL_OUT_CONTRACTS_DIR;
const outputTestDir = process.env.SPL_OUT_TESTS_DIR;
const configFile = process.env.SPL_CONFIG_HEADER;
const testExtensions = process.env.SPL_TEST_EXTENSIONS ? process.env.SPL_TEST_EXTENSIONS.split(',') : [".sol", ".js", ".ts"];
const solExtension = ['.sol'];

// Function to run the preprocessor command
const runPreprocessor = (filePath, outputPath) => {

  const command = `gcc -xc -E -P -imacros ${configFile} ${filePath} -o ${outputPath}`;
  exec(command, (err, _, stderr) => {
    if (err) {
      console.error(`Error processing file ${filePath}: ${stderr}`);
      return;
    }
    console.log(`Processed ${filePath} -> ${outputPath}`);
  });
};

// Main function to process files
const processFiles = (sourceDir, outputDir, fileExtensions) => {

  if (!sourceDir || "" === sourceDir) {
    return;
  }

  // Check if fileExtensions is an array of strings
  if (!Array.isArray(fileExtensions) || !fileExtensions.every(ext => typeof ext === 'string')) {
    console.error('fileExtensions must be an array of strings.');
    process.exit(1);
  }

  if (!fs.existsSync(configFile)) {
    console.error(`Configuration file ${configFile} does not exist.`);
    return;
  }

  // Ensure the output directory exists
  fs.ensureDirSync(outputDir);

  // Get all product line files in the src directory recursively
  // This will only include files with the given extension
  const files = fs.readdirSync(sourceDir, { recursive: true }).filter(file => fileExtensions.includes(path.extname(file)));

  // Process each file
  files.forEach(file => {
    const filePath = path.join(sourceDir, file);
    const subDir = path.dirname(file);
    const outputSubDir = path.join(outputDir, subDir);

    if (!fs.existsSync(outputSubDir)) {
      fs.mkdirSync(outputSubDir, { recursive: true });
    }

    const outputFilePath = path.join(outputDir, file);

    runPreprocessor(filePath, outputFilePath);
  });
};

// Run the script
processFiles(sourceContractsDir, outputContractsDir, solExtension);
processFiles(sourceTestDir, outputTestDir, testExtensions);

