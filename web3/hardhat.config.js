/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: "sepolia",
    networks: {
      sepolia: {
        url: process.env.SEPOLIA_RPC_URL,
        accounts: [process.env.PRIVATE_KEY],
        chainId: 11155111,
      },
      localhost: {
        url: "http://127.0.0.1:8545/",
        chainId: 31337,
      },
    },
  
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
