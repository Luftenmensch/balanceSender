# Solidity balance sender
## Before all:
- Set up **Node.js**

## Instruction
- Download project
- Set up config file
```json
{
   "mainWalletAddress":"",
   "wallets":[
      {
         "privateKey":"0x87ddb2346364cd98261t5e44d8f01abd7c595898f6210d384e3e7e2d305859157bf5",
         "targetWallet":"0x8593n43645DBgB70c359e09245450AfC2E1eB4885746615"
      }
   ],
   "collectWallets":[
      "0x87db2cd98261543634e44d8f01abd7ctg595898f6210d384e3e7e2d305859157bf5"
   ],
   "tokenContract":"",
   "defaultValue":"0.01",
   "rpcUrl":"https://bsc-dataseed1.binance.org",
   "gasPrice":"",
   "gasLimit":""
}
```
- run "**npm run collect**" for collect eth/tokens to main wallet
- run "**npm run disperse**" for disperse eth/tokens to the linked accounts