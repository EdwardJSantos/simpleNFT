const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("-B-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A")

    const args = []
    const simpleNFT = await deploy("SimpleNFT", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log("-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying contract........................................")
        await verify(simpleNFT.address, args)
        log("Contract Verified")
    }
    log("-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A-A")
}
