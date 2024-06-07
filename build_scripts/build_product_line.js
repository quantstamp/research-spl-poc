const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const string_formatter = require('lodash');

// Define the default directory and output directory base path
const defaultDir = './contracts/product_lines';
const outputBaseDir = './contracts/src';
const splExtension = '.spl';
const solExtension = '.sol';

// Function to run the preprocessor command
const runPreprocessor = (filePath, featureFlag, outputDir) => {
  const fileName = path.basename(filePath, splExtension);
  const camelCaseFeatureFlag = string_formatter.camelCase(featureFlag);
  const formattedFlag = featureFlag ? camelCaseFeatureFlag.charAt(0).toUpperCase() + camelCaseFeatureFlag.slice(1) : '';
  const outputFileName = featureFlag ? `${fileName}${formattedFlag}${solExtension}` : `${fileName}${solExtension}`;
  const outputPath = path.join(outputDir, outputFileName);
  const flag = featureFlag ? `-D ${featureFlag}` : '';

  const command = `gcc -xc -E -P ${flag} ${filePath} -o ${outputPath}`;
  exec(command, (err, _, stderr) => {
    if (err) {
      console.error(`Error processing file ${filePath}: ${stderr}`);
      return;
    }
    console.log(`Processed ${filePath} -> ${outputPath}`);
  });
};

// Function to run the forge build command
const runForgeBuild = () => {
  exec(`forge install && forge build`, (err, _, stderr) => {
    if (err) {
      console.error(`Error building product line ${featureFlag}: ${stderr}`);
      return;
    }
    console.log(`Built product line ${featureFlag}`);
  });
}

// Main function to process files
const processFiles = (featureFlag) => {
  // Determine the output directory
  const outputDirName = featureFlag ? featureFlag.toLowerCase() : 'vanilla';
  const outputDir = path.join(outputBaseDir, outputDirName);

  // Ensure the output directory exists (clear if it does)
  fs.ensureDirSync(outputDir);
  fs.emptyDirSync(outputDir);

  // Get all .spl files in the default directory
  const files = fs.readdirSync(defaultDir).filter(file => path.extname(file) === splExtension);

  // Process each file
  files.forEach(file => {
    const filePath = path.join(defaultDir, file);
    runPreprocessor(filePath, featureFlag, outputDir);
  });

  // run forge build 
  runForgeBuild();
};

// Get the feature flag from command-line arguments
const featureFlag = process.argv[2];

// Run the script
processFiles(featureFlag);
