const ethers = require("ethers");
const config = require("./config");

const defaultAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = async ({
  contractAddress,
  value,
  targetAddress,
  privateKey,
  gasLimit,
  gasPrice,
}) => {
  const wallet = new ethers.Wallet(privateKey);
  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const walletSigner = wallet.connect(provider);

  if (contractAddress) {
    let contract = new ethers.Contract(
      contractAddress,
      defaultAbi,
      walletSigner
    );

    return contract.transfer(targetAddress, value);
  } else {
    const tx = {
      from: wallet.address,
      to: targetAddress,
      value,
      nonce: await provider.getTransactionCount(wallet.address, "latest"),
      gasLimit,
      gasPrice,
    }

    return walletSigner.sendTransaction(tx)
  }
};
