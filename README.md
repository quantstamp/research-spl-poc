## Research SPL POC

The project structure includes:

- **Product Line Files**: Located in `./product_lines`, where developers add Solidity code for different features.
- **Prebuild Script**: Found in `prebuild_scripts/`, configured via `.env` and `config.h`.
- **Generated Smart Contracts and Tests**: Located in `contracts/src` and `contracts/test` (configurable via the `.env` file).

#### Steps to Generate `config.h`:

1. Modify the `features` file to add/remove desired features.
2. Run `kconfig-conf features` to create a `.config` file (requires [`kconfig-frontends`](https://ports.macports.org/port/kconfig-frontends/)).
3. Execute `./config2header.sh` to generate `config.h` from `.config`.

#### Running the Prebuild Script:

From the root directory, run `node prebuild_scripts/build_product_line.js`.