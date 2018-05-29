# EthKan Contracts

"Proof-of-concept contract for EthKan."

## Install
Install MetaMask Chrome extension: https://metamask.io/
<br>
Install Ganache: http://truffleframework.com/ganache/
```
npm install -g truffle
```
Clone this repo locally. Change directories to inside newly created repo.
```
npm install
```

## Deploy contracts on local Ganache testnet
Open Ganache app. This is your local blockchain testnet so keep it running while working on EthKan locally.
<br>
<br>
On command line from repo directory:
```
truffle migrate --network ganache
```
If you get a weird deployment error try:
```
truffle migrate --network ganache --reset
```
This deploys contract to default ganache based on configs in `truffle.js`.
<br>
<br>
Save the address of deployed EthKan contract in terminal after `Ethkan: `. You will need this to run dapp.
<br>
<br>
You may also want to copy the `./build/contracts/EthKan.json` file beause this is your contract ABI (which is needed for dapp).
