var safemath = artifacts.require ('./safemath.sol');
var EthKan = artifacts.require ('./EthKan.sol');

module.exports = function (deployer) {
  deployer.deploy (safemath);
  deployer.link (safemath, EthKan);
  deployer.deploy (EthKan);
};
