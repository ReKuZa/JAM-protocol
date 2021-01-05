const INITIAL_JAM_FOR_POOLS = 50000;
const INITIAL_JAZZ_FOR_DAI_JAM = 750000;
const INITIAL_JAZZ_FOR_DAI_JAZZ = 250000;

const POOL_START_DATE = Date.parse('2020-11-30T00:00:00Z') / 1000;

const jamPools = [
  { contractName: 'JAMFRAXPool', token: 'FRAX' },
  { contractName: 'JAMESDPool', token: 'ESD' },
  { contractName: 'JAMDSDPool', token: 'DSD' },
  { contractName: 'JAMUSDCPool', token: 'USDC' },
  { contractName: 'JAMDAIPool', token: 'DAI' },
  { contractName: 'JAMACPool', token: 'AC' },
];

const jazzPools = {
  DAIJAM: { contractName: 'DAIJAMLPTokenSharePool', token: 'DAI_JAM-LPv2' },
  DAIJAZZ: { contractName: 'DAIJAZZLPTokenSharePool', token: 'DAI_JAZZ-LPv2' },
};

module.exports = {
  POOL_START_DATE,
  INITIAL_JAM_FOR_POOLS,
  INITIAL_JAZZ_FOR_DAI_JAM,
  INITIAL_JAZZ_FOR_DAI_JAZZ,
  jamPools,
  jazzPools,
};
