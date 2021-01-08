const knownContracts = require('./known-contracts');
const { POOL_START_DATE } = require('./pools');

const JAM = artifacts.require('JAM');
const Share = artifacts.require('Share');
const Oracle = artifacts.require('Oracle');

const USDCJAMLPToken_BASPool = artifacts.require('USDCJAMLPTokenSharePool');

const UniswapV2Factory = artifacts.require('UniswapV2Factory');

module.exports = async (deployer, network, accounts) => {
  const uniswapFactory = ['dev'].includes(network)
    ? await UniswapV2Factory.deployed()
    : await UniswapV2Factory.at(knownContracts.UniswapV2Factory[network]);
  const usdc = await IERC20.at(knownContracts.USDC[network])

  const oracle = await Oracle.deployed();

  const usdc_jam_lpt = await oracle.pairFor(
    uniswapFactory.address,
    JAM.address,
    usdc.address
  );

  await deployer.deploy(
    USDCJAMLPToken_BASPool,
    Share.address,
    usdc_jam_lpt,
    POOL_START_DATE
  );
};
