# TON Wallet Generator

A simple Node.js script to generate multiple TON (The Open Network) wallets. This script creates wallets with their corresponding mnemonics and addresses, saving them in an easily readable format.

## Features

- Generate multiple TON wallets in one go
- Support for different wallet versions (V3R1, V3R2, V4R2)
- Interactive prompt for number of wallets
- Saves output in a file with timestamp
- Simple format: `index|wallet_address|mnemonic_phrase`

## Prerequisites

```bash
npm install @ton/crypto @ton/ton
```

## Usage

1. Clone the repository:
```bash
git clone <repository-url>
cd ton-wallet-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the script:
```bash
node index.js
```

4. Enter the number of wallets you want to generate when prompted.

## Output Format

The script generates a text file named `wallets_YYYY-MM-DD_HH-mm-ss.txt` containing the generated wallets in the following format:

```
1|EQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx|word1 word2 word3 ... word24
2|EQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx|word1 word2 word3 ... word24
```

Where:
- First column: Wallet index
- Second column: TON wallet address
- Third column: 24-word mnemonic phrase

## Supported Wallet Versions

- V3R1 (`WalletVersion.V3R1`)
- V3R2 (`WalletVersion.V3R2`)
- V4R2 (`WalletVersion.V4R2`) - Default version

## Example Code

```javascript
// Generate specific number of wallets programmatically
const { generateMultipleWallets, WalletVersion } = require('./index.js');

async function example() {
    // Generate 5 wallets using V4R2 version
    const wallets = await generateMultipleWallets(5, WalletVersion.V4R2);
    console.log('Wallets generated successfully!');
}
```

## Important Security Notes

- Keep your mnemonic phrases secure and private
- Never share your mnemonic phrases with anyone
- Store the generated file in a secure location
- Consider encrypting the output file for additional security

## Functions

### `generateWallet(version, network, workchain)`
Generates a single wallet with the specified parameters.

Parameters:
- `version`: Wallet version (default: V4R2)
- `network`: Network type (MAINNET: -239, TESTNET: -3)
- `workchain`: Workchain ID (default: 0)

### `generateMultipleWallets(count, version)`
Generates multiple wallets with the specified parameters.

Parameters:
- `count`: Number of wallets to generate
- `version`: Wallet version (default: V4R2)

## License

MIT

## Contributing

Feel free to submit issues and pull requests.

