const {
  jazzPools,
  INITIAL_JAZZ_FOR_DAI_JAM,
  INITIAL_JAZZ_FOR_DAI_JAZZ,
} = require('./pools');

// Pools
// deployed first
const Share = artifacts.require('Share');
const InitialShareDistributor = artifacts.require('InitialShareDistributor');

// ============ Main Migration ============

async function migration(deployer, network, accounts) {
  const unit = web3.utils.toBN(10 ** 18);
  const totalBalanceForDAIJAM = unit.muln(INITIAL_JAZZ_FOR_DAI_JAM);
  const totalBalanceForDAIJAZZ = unit.muln(INITIAL_JAZZ_FOR_DAI_JAZZ);
  const totalBalance = totalBalanceForDAIJAM.add(totalBalanceForDAIJAZZ);

  const share = await Share.deployed();

  const lpPoolDAIJAM = artifacts.require(jazzPools.DAIJAM.contractName);
  const lpPoolDAIJAZZ = artifacts.require(jazzPools.DAIJAZZ.contractName);

  await deployer.deploy(
    InitialShareDistributor,
    share.address,
    lpPoolDAIJAM.address,
    totalBalanceForDAIJAM.toString(),
    lpPoolDAIJAZZ.address,
    totalBalanceForDAIJAZZ.toString()
  );
  const distributor = await InitialShareDistributor.deployed();

  await share.mint(distributor.address, totalBalance.toString());
  console.log(
    `Deposited ${INITIAL_JAZZ_FOR_DAI_JAM} JAZZ to InitialShareDistributor.`
  );

  console.log(
    `Setting distributor to InitialShareDistributor (${distributor.address})`
  );
  await lpPoolDAIJAM
    .deployed()
    .then((pool) => pool.setRewardDistribution(distributor.address));
  await lpPoolDAIJAZZ
    .deployed()
    .then((pool) => pool.setRewardDistribution(distributor.address));

  await distributor.distribute();
}

module.exports = migration;
