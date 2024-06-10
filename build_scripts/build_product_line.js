const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

// Define the default directory and output directory base path
const defaultDir = './contracts/product_lines';
const outputBaseDir = './contracts/src';
const configFile = './build_scripts/config.h';
const splExtension = '.spl';
const solExtension = '.sol';

// Function to run the preprocessor command
const runPreprocessor = (filePath, outputDir) => {
  const fileName = path.basename(filePath, splExtension);
  const outputFileName = `${fileName}${solExtension}`;
  const outputPath = path.join(outputDir, outputFileName);

  const command = `gcc -xc -E -P -imacros ${configFile} ${filePath} -o ${outputPath}`;
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
      console.error(`Error building product line: ${stderr}`);
      return;
    }
    console.log(`Built product line`);
  });
}

// Main function to process files
const processFiles = () => {

  if (!fs.existsSync(configFile)) {
    console.error(`Configuration file ${configFile} does not exist.`);
    return;
  }

  // Ensure the output directory exists (clear if it does)
  fs.ensureDirSync(outputBaseDir);
  fs.emptyDirSync(outputBaseDir);

  // Get all .spl files in the default directory
  const files = fs.readdirSync(defaultDir).filter(file => path.extname(file) === splExtension);

  // Process each file
  files.forEach(file => {
    const filePath = path.join(defaultDir, file);
    runPreprocessor(filePath, outputBaseDir);
  });

  // run forge build 
  runForgeBuild();
};

// Run the script
processFiles();
