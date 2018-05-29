module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      gas: 6712390,
      port: 8545,
      network_id: "*" // Match any network id
    },
    ganache: {
      host: "127.0.0.1",
      gas: 6712390,
      port: 7545,
      network_id: "*" // matching any id
    }
  }
};
