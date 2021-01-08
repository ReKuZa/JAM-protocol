const {
  jazzPools,
  INITIAL_JAZZ_FOR_USDC_JAM,
  INITIAL_JAZZ_FOR_JAZZ_JAM
} = require('./pools');

// Pools
// deployed first
const Share = artifacts.require('Share');
const InitialShareDistributor = artifacts.require('InitialShareDistributor');

// ============ Main Migration ============

async function migration(deployer, network, accounts) {
  const unit = web3.utils.toBN(10 ** 18);
  const totalBalanceForUSDCJAM = unit.muln(INITIAL_JAZZ_FOR_USDC_JAM);
  const totalBalanceForJAZZJAM = unit.muln(INITIAL_JAZZ_FOR_JAZZ_JAM);
  const totalBalance = totalBalanceForUSDCJAM.add(totalBalanceForJAZZJAM);

  const share = await Share.deployed();

  const lpPoolUSDCJAM = artifacts.require(jazzPools.USDCJAM.contractName);
  const jazzJAM = artifacts.require(jazzPools.JAZZJAM.contractName);

  await deployer.deploy(
    InitialShareDistributor,
    share.address,
    lpPoolUSDCJAM.address,
    totalBalanceForUSDCJAM.toString(),
    jazzJAM.address,
    totalBalanceForJAZZJAM.toString()
  );
  const distributor = await InitialShareDistributor.deployed();

  await share.mint(distributor.address, totalBalance.toString());
  console.log(
    `Deposited ${INITIAL_JAZZ_FOR_USDC_JAM} JAM to InitialShareDistributor.`
  );

  console.log(
    `Setting distributor to InitialShareDistributor (${distributor.address})`
  );
  await lpPoolUSDCJAM
    .deployed()
    .then((pool) => pool.setRewardDistribution(distributor.address));

  await distributor.distribute();
}

module.exports = migration;
