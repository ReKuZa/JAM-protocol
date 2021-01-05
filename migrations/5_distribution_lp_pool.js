const knownContracts = require('./known-contracts');
const { POOL_START_DATE } = require('./pools');

const JAM = artifacts.require('JAM');
const Share = artifacts.require('Share');
const Oracle = artifacts.require('Oracle');
const MockDai = artifacts.require('MockDai');

const DAIJAMLPToken_BASPool = artifacts.require('DAIJAMLPTokenSharePool');
const DAIJAZZLPToken_BASPool = artifacts.require('DAIJAZZLPTokenSharePool');

const UniswapV2Factory = artifacts.require('UniswapV2Factory');

module.exports = async (deployer, network, accounts) => {
  const uniswapFactory = ['dev'].includes(network)
    ? await UniswapV2Factory.deployed()
    : await UniswapV2Factory.at(knownContracts.UniswapV2Factory[network]);
  const dai =
    network === 'mainnet'
      ? await IERC20.at(knownContracts.DAI[network])
      : await MockDai.deployed();

  const oracle = await Oracle.deployed();

  const dai_bac_lpt = await oracle.pairFor(
    uniswapFactory.address,
    JAM.address,
    dai.address
  );
  const dai_bas_lpt = await oracle.pairFor(
    uniswapFactory.address,
    Share.address,
    dai.address
  );

  await deployer.deploy(
    DAIJAMLPToken_BASPool,
    Share.address,
    dai_bac_lpt,
    POOL_START_DATE
  );
  await deployer.deploy(
    DAIJAZZLPToken_BASPool,
    Share.address,
    dai_bas_lpt,
    POOL_START_DATE
  );
};
