## Smart Contract Families in Solidity

This project provides support for expressing and building smart contract families in Solidity.

### tl;dr
1. Annotate Solidity files with C preprocessor macros and place files in some directory within your project, e.g., `contracts-spl/`
2. Write (or generate with KConfig tools and our script) `config.h` file that contains flags that you want to enable, e.g., `#define CONFIG_HAS_OWNER 1`.
3. Write `.env` file and then run `node prebuild-scripts/prebuild-variant.js`.
4. Build your project as usually.

### Content

The repository contains:
- `prebuild-scripts/` - a set of scripts for: 1) configuring; and 2) generating code for a specific product from the family.
- `examples/` - examples that show how to use the scripts.

### Installation

1. If you haven't already, download and install [node.js and nvm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Run `npm i` to install dependencies for `prebuild-scripts/`

### Prebuild Scripts

- `prebuild-variant.js` - a Node.js script that runs C language preprocessor from `gcc` over Solidity source code files to generate specific variants. It expect a set of parameters defined in project's `.env` file (see below). Apart from the source code, the tool requires a C header file with feature flags that enable/disable specific parts of the Solidity source code to include/exclude.
- `config2header.sh` - you may find this script useful if you use KConfig configuration tool [`kconfig-conf`](https://ports.macports.org/port/kconfig-frontends/) for configuting the smart contract family (to specify a variant). The script takes the output file `.config` of a KConfig configuration tool and generates the header file that `prebuild-variant.js` can consume. 

### Usage

In a typical Solidity project if you want to compile code, you can run `npx hardhat compile` to obtain bytecode that can be deployed on the blockchain. Our scripts add two stages that precede compilation: 1) configuration; and 2) prebuild. During the first stage developer specifies which specific smart contract variant will be generated. During the second stage preprocessor generates source code. Once that's done, you can procede with compilation as usually.

#### Configuration

If your Solidity source code contains C macros that enable/disable certain pieces of code, inclusion is dependent on macros. If a feature needs to be enabled, it should have its corresponding flag defined in the file `config.h`, e.g., `#define CONFIG_HAS_OWNER 1`. This file can be written by hand or it can be generated via the KConfig confifuration tool `kconfig-conf`. The tool takes a definition of project features in KConfig spec format, asks developer questions interactively, and outputs a `.config` file. Run `config2header.sh` to generate `config.h` from `.config`.

#### Prebuild

Assuming that you already have Solidity source code annotated with C macros, the `config.h` file, and `.env` file, you can run it as `node prebuild-scripts/prebuild-variant.js`.
Configuration options in the `.env` file:
- `SPL_SRC_CONTRACTS_DIR` - input directory that contains Solidity files annotated with C macros. Example: `./contracts-spl`.
- `SPL_OUT_CONTRACTS_DIR` - output directory that will contain Solidity files for a specific variant (ready to be compiled). Example: `./contracts`
- `SPL_CONFIG_HEADER` - path to the `config.h` file. Example: `./config.h`.
- `SPL_SRC_TESTS_DIR` - (optional) input directory that contains test files annotated with C macros. Example: `./test-spl`.
- `SPL_OUT_TESTS_DIR` - (optional) output directory that will contain test files for a specific variant (ready to be run). Example: `./test`.
- `SPL_TEST_EXTENSIONS` - a list for test files extensions as read from `SPL_SRC_TESTS_DIR`. Example: `".sol,.js,.ts"`.

### Examples

#### Owner

```
cd examples/owner
cp .env.sample .env

# copy a sample configuration file written by hand
cp config.h.sample config.h

# generate a specific variant
node ../../prebuild-scripts/prebuild-variant.js

# install dependencies and compile as usually
npm i
npx hardhat compile	
```

#### Retirable

```
cd examples/retirable
cp .env.sample .env

# use an interactive tool to generate a configuration file
kconfig-conf features.sample
# generate the `config.h` file
../../prebuild-scripts/config2header.sh

# generate a specific variant
node ../../prebuild-scripts/prebuild-variant.js

# install dependencies and compile as usually
npm i
npx hardhat compile	
```
