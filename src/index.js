const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('0866a8d63e13c47a0b7a0c9aa4173fa9e64b49083c9b3c760be50bc43ba216b5');
const myWalletAddress = myKey.getPublic('hex');

let threadyCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, '111111111111111111111', 20);
tx1.signTransaction(myKey);
threadyCoin.addTransaction(tx1);

threadyCoin.minePendingTransactions(myWalletAddress);

console.log('my balance is', threadyCoin.getBalanceOfAddress(myWalletAddress));

console.log();
console.log('Blockchain valid?', threadyCoin.isChainValid() ? 'Yes' : 'No');

// tamper-proof
threadyCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', threadyCoin.isChainValid() ? 'Yes' : 'No');
