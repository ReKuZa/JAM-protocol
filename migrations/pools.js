const INITIAL_JAM_FOR_POOLS = 50000;
const INITIAL_JAZZ_FOR_USDC_JAM = 750000;
const INITIAL_JAZZ_FOR_USDC_JAZZ = 250000;

const POOL_START_DATE = Date.parse('2021-11-30T00:00:00Z') / 1000;

const jamPools = [
  { contractName: 'JAMFRAXPool', token: 'FRAX' },
  { contractName: 'JAMESDPool', token: 'ESD' },
  { contractName: 'JAMDSDPool', token: 'DSD' },
  { contractName: 'JAMUSDCPool', token: 'USDC' },
  { contractName: 'JAMDAIPool', token: 'DAI' },
  { contractName: 'JAMACPool', token: 'AC' },
];

const jazzPools = {
  USDCJAM: { contractName: 'USDCJAMLPTokenSharePool', token: 'USDC_JAM-LPv2' },
  USDCJAZZ: { contractName: 'USDCJAZZLPTokenSharePool', token: 'USDC_JAZZ-LPv2' },
};

module.exports = {
  POOL_START_DATE,
  INITIAL_JAM_FOR_POOLS,
  INITIAL_JAZZ_FOR_USDC_JAM,
  INITIAL_JAZZ_FOR_USDC_JAZZ,
  jamPools,
  jazzPools,
};
