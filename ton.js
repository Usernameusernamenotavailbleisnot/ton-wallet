import { mnemonicToWalletKey, mnemonicNew, mnemonicValidate } from '@ton/crypto';
import tonPkg from '@ton/ton';
const { WalletContractV3R1, WalletContractV3R2, WalletContractV4 } = tonPkg;
import fs from 'fs';
import readline from 'readline';

// Wallet Versions
const WalletVersion = {
    V3R1: 'v3r1',
    V3R2: 'v3r2',
    V4R2: 'v4r2'
};

const Network = {
    MAINNET: -239,
    TESTNET: -3
};

async function generateWallet(
    version = WalletVersion.V4R2,
    network = Network.MAINNET,
    workchain = 0
) {
    try {
        // Generate new mnemonic
        const mnemonic = await mnemonicNew();
        
        // Validate mnemonic
        const isValid = await mnemonicValidate(mnemonic);
        if (!isValid) {
            throw new Error('Generated invalid mnemonic');
        }

        // Convert to keypair
        const keyPair = await mnemonicToWalletKey(mnemonic);

        // Create wallet contract based on version
        let contract;
        switch (version) {
            case WalletVersion.V3R1:
                contract = WalletContractV3R1.create({ workchain, publicKey: keyPair.publicKey });
                break;
            case WalletVersion.V3R2:
                contract = WalletContractV3R2.create({ workchain, publicKey: keyPair.publicKey });
                break;
            case WalletVersion.V4R2:
                contract = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
                break;
            default:
                throw new Error('Unsupported wallet version');
        }

        const address = contract.address;

        return {
            mnemonic: mnemonic.join(' '),
            address: address.toString({ urlSafe: true, bounceable: true })
        };

    } catch (error) {
        console.error('Error generating wallet:', error);
        throw error;
    }
}

async function generateMultipleWallets(count = 1, version = WalletVersion.V4R2) {
    const wallets = [];
    
    console.log(`Generating ${count} wallets...`);
    
    for (let i = 0; i < count; i++) {
        const wallet = await generateWallet(version);
        wallets.push(wallet);
        console.log(`✓ Generated wallet ${i + 1}/${count}`);
    }

    // Save to file in format: index|address|mnemonic
    const walletData = wallets.map((wallet, index) => 
        `${index + 1}|${wallet.address}|${wallet.mnemonic}`
    ).join('\n');

    // Create simple date-time format: YYYY-MM-DD_HH-mm-ss
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-mm-ss
    const filename = `wallets_${date}_${time}.txt`;
    
    fs.writeFileSync(filename, walletData);
    console.log(`✓ Saved ${count} wallets to ${filename}`);

    return wallets;
}

function prompt(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

// Usage example
async function main() {
    try {
        // Prompt for number of wallets
        const count = await prompt('How many wallets do you want to generate? ');
        const numberOfWallets = parseInt(count) || 1;

        const wallets = await generateMultipleWallets(numberOfWallets, WalletVersion.V4R2);
        
        console.log('\nWallets generated successfully!');
        console.log('Check the generated file for your wallets.');

    } catch (error) {
        console.error('Failed:', error);
    }
}

// Run the example
main();

export {
    generateWallet,
    generateMultipleWallets,
    WalletVersion,
    Network
};
