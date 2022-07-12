const ethers = require("ethers");
const sendToken = require("./sendToken");
const config = require("./config");
const abi = require("./abi.json");
const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
const { logFatal } = require("./utils");
const { BigNumber } = require("ethers");

const main = async () => {
  if (!config.mainWalletAddress) logFatal("Add mainWalletAddress in config!");

  if (!config.rpcUrl) logFatal("Add rpcUrl in config");

  if (config.collectWallets.length === 0) logFatal("No wallets in config!");

  for (let i = 0; i < config.collectWallets.length; i++) {
    const privateKey = config.collectWallets[i];

    if (!privateKey)
      logFatal(
        `No privateKey for wallet data in config: ${JSON.stringify(
            privateKey,
          null,
          2
        )}`
      );

    if (!privateKey)
      logFatal(
        `No privateKey for wallet data in config: ${JSON.stringify(
            privateKey,
          null,
          2
        )}`
      );

    const wallet = new ethers.Wallet(privateKey);

    const walletSigner = wallet.connect(provider);

    let value = BigNumber.from(0);
    let gasLimit = BigNumber.from(21000)
    const gasPrice = config.gasPrice ? BigNumber.from(config.gasPrice) :  await walletSigner.getGasPrice()

    if (config.tokenContract) {
      let contract = new ethers.Contract(
        config.tokenContract,
        abi,
        walletSigner
      );

      value = BigNumber.from(await contract.balanceOf(wallet.address));

      if (value.isZero()) {
        console.log("No tokens in this account", i);

        continue;
      }
    } else
    {
      const currentBalance = await walletSigner.getBalance();

      if (currentBalance.isZero()) {
        console.log("No ether in this account", i);

        continue;
      }

      const gasPrice = await walletSigner.getGasPrice();
      value = currentBalance.sub(gasPrice * BigNumber.from(21000));

      if(value.lte(0)){
        logFatal("No eth for tx", i);
      }
    }

    try {
      await sendToken({
        contractAddress: config.tokenContract,
        value,
        gasLimit,
        gasPrice,
        targetAddress: config.mainWalletAddress,
        privateKey,
      }).then(r => r.wait())

      console.log("Got ether/tokens from", i)
    } catch (e) {
      console.log(`Got error on`, i)
      logFatal(e.message);
    }
  }
};

main();
