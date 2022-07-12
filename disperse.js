const ethers = require("ethers");
const sendToken = require("./sendToken");
const config = require("./config");
const abi = require("./abi.json");
const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
const { logFatal } = require("./utils");
const { BigNumber } = require("ethers");

const main = async () => {
    if (!config.rpcUrl) logFatal("Add rpcUrl in config");

    if (config.wallets.length === 0) logFatal("No wallets in config!");

    for (let i = 0; i < config.wallets.length; i++) {
        const data = config.wallets[i];

        if (!data.privateKey)
            logFatal(
                `No privateKey for wallet data in config: ${JSON.stringify(
                    data,
                    null,
                    2
                )}`
            );

        if (!data.privateKey)
            logFatal(
                `No privateKey for wallet data in config: ${JSON.stringify(
                    data,
                    null,
                    2
                )}`
            );

        const wallet = new ethers.Wallet(data.privateKey);

        const walletSigner = wallet.connect(provider);

        let value = BigNumber.from(ethers.utils.parseEther(config.defaultValue))
        let gasLimit = BigNumber.from(21000)
        const gasPrice = config.gasPrice ? BigNumber.from(config.gasPrice) :  await walletSigner.getGasPrice()


        if (config.tokenContract) {
            let contract = new ethers.Contract(
                config.tokenContract,
                abi,
                walletSigner
            );

            const currentBalance = await contract.balanceOf(wallet.address)

           if(currentBalance.lt(value)){
               console.log(`Balance is lower than value to send`)

               continue
           }

            gasLimit = config.gasLimit ? BigNumber.from(config.gasLimit) : BigNumber.from(250000)
        } else {
            const currentBalance = await walletSigner.getBalance();

            if (currentBalance.lt(value)) {
                console.log(`Balance is lower than value to send`)

                continue;
            }
        }

        try {
            await sendToken({
                contractAddress: config.tokenContract,
                targetAddress: data.targetWallet,
                privateKey: data.privateKey,
                value,
                gasLimit,
                gasPrice
            }).then(r => r.wait())

            console.log(`Send ether/tokens from ${wallet.address} to ${data.targetWallet} ${i}`)
        } catch (e) {
            console.log(`Got error on`, i)
            logFatal(e.message);
        }
    }
};

main();
