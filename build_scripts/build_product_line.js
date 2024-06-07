const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

// Define the default directory and output directory base path
const defaultDir = './contracts/product_lines';
const outputBaseDir = './contracts/src';

// Function to run the preprocessor command
const runPreprocessor = (filePath, featureFlag, outputDir) => {
  const fileName = path.basename(filePath, '.spl');
  const formattedFlag = featureFlag ? featureFlag.replace(/_/g, '').toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase()) : '';
  const outputFileName = featureFlag ? `${fileName}${formattedFlag}.sol` : `${fileName}.sol`;
  const outputPath = path.join(outputDir, outputFileName);
  const flag = featureFlag ? `-D ${featureFlag}` : '';

  const command = `gcc -xc -E -P ${flag} ${filePath} -o ${outputPath}`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error processing file ${filePath}: ${stderr}`);
      return;
    }
    console.log(`Processed ${filePath} -> ${outputPath}`);
  });
};

// Main function to process files
const processFiles = (featureFlag) => {
  // Determine the output directory
  const outputDirName = featureFlag ? featureFlag.toLowerCase() : 'vanilla';
  const outputDir = path.join(outputBaseDir, outputDirName);

  // Ensure the output directory exists (clear if it does)
  fs.ensureDirSync(outputDir);
  fs.emptyDirSync(outputDir);

  // Get all .spl files in the default directory
  const files = fs.readdirSync(defaultDir).filter(file => path.extname(file) === '.spl');

  // Process each file
  files.forEach(file => {
    const filePath = path.join(defaultDir, file);
    runPreprocessor(filePath, featureFlag, outputDir);
  });
};

// Get the feature flag from command-line arguments
const featureFlag = process.argv[2];

// Run the script
processFiles(featureFlag);