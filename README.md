# research-spl-poc

* The product line files, having the `.spl` extension, are located in the `contracts/product_lines` directory. This is were devs will add their solidity code with the different features they want to include.

* The build script is located in the `build_scripts` directory. Maybe we can add a configuration file which would help simplify the script and create better outputs.

* The output of the build script will be located in specific folders inside the `contracts/src` directory.

* To run the build script run the script from the root directory: `node build_scripts/build_product_line.js FEATURE_FLAG`.

