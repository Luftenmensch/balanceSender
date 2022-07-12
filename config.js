module.exports = {
  mainWalletAddress: "", //your main wallet address, use for collect
  wallets: [
    {
      "privateKey":"0x87ddb2346364cd98261t5e44d8f01abd7c595898f6210d384e3e7e2d305859157bf5",
      "targetWallet":"0x8593n43645DBgB70c359e09245450AfC2E1eB4885746615"
    },
  ],
  collectWallets: [
    "0x87ddb2346364cd98261t5e44d8f01abd7c595898f6210d384e3e7e2d305859157bf5", //privatekey
],
  tokenContract: "", // BUSD "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
  defaultValue: "0.01", //used for disperse.js
  rpcUrl: "https://bsc-dataseed1.binance.org", //setup for different chains default for bep20
  gasPrice: "", //OPTIONAL set up if error or u wanna make tx faster
  gasLimit: "", //OPTIONAL set up if error
};
