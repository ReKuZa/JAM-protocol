const {
  jazzPools,
  INITIAL_JAZZ_FOR_USDC_JAM,
  INITIAL_JAZZ_FOR_USDC_JAZZ,
} = require('./pools');

// Pools
// deployed first
const Share = artifacts.require('Share');
const InitialShareDistributor = artifacts.require('InitialShareDistributor');

// ============ Main Migration ============

async function migration(deployer, network, accounts) {
  const unit = web3.utils.toBN(10 ** 18);
  const totalBalanceForUSDCJAM = unit.muln(INITIAL_JAZZ_FOR_USDC_JAM);
  const totalBalanceForUSDCJAZZ = unit.muln(INITIAL_JAZZ_FOR_USDC_JAZZ);
  const totalBalance = totalBalanceForUSDCJAM.add(totalBalanceForUSDCJAZZ);

  const share = await Share.deployed();

  const lpPoolUSDCJAM = artifacts.require(jazzPools.USDCJAM.contractName);
  const lpPoolUSDCJAZZ = artifacts.require(jazzPools.USDCJAZZ.contractName);

  await deployer.deploy(
    InitialShareDistributor,
    share.address,
    lpPoolUSDCJAM.address,
    totalBalanceForUSDCJAM.toString(),
    lpPoolUSDCJAZZ.address,
    totalBalanceForUSDCJAZZ.toString()
  );
  const distributor = await InitialShareDistributor.deployed();

  await share.mint(distributor.address, totalBalance.toString());
  console.log(
    `Deposited ${INITIAL_JAZZ_FOR_USDC_JAM} JAZZ to InitialShareDistributor.`
  );

  console.log(
    `Setting distributor to InitialShareDistributor (${distributor.address})`
  );
  await lpPoolUSDCJAM
    .deployed()
    .then((pool) => pool.setRewardDistribution(distributor.address));
  await lpPoolUSDCJAZZ
    .deployed()
    .then((pool) => pool.setRewardDistribution(distributor.address));

  await distributor.distribute();
}

module.exports = migration;
