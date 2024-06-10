# research-spl-poc

* The product line files, having the `.spl` extension, are located in the `contracts/product_lines` directory. This is were devs will add their solidity code with the different features they want to include.

* The build script is located in the `build_scripts` directory. Maybe we can add a configuration file which would help simplify the script and create better outputs. To generate the `config.h` file, do the following actions:
 1. run `kconfig-conf features`. This will create a `.config` file with the features you want to include. You might need to install `https://ports.macports.org/port/kconfig-frontends/`.
 2. run `./config2header.sh`. This will parse the generated `.config` file and generate a `config.h` file with the features you want to include.

* To run the build script run the script from the root directory: `node build_scripts/build_product_line.js`. The output of the build script will be located in the `contracts/src` directory.

