const contract = require('@truffle/contract');
const { POOL_START_DATE } = require('./pools');
const knownContracts = require('./known-contracts');

const JAM = artifacts.require('JAM');
const Bond = artifacts.require('Bond');
const Share = artifacts.require('Share');
const IERC20 = artifacts.require('IERC20');

const Oracle = artifacts.require('Oracle');
const Boardroom = artifacts.require('Boardroom');
const Treasury = artifacts.require('Treasury');
const SimpleFund = artifacts.require('SimpleERCFund');

const UniswapV2Factory = artifacts.require('UniswapV2Factory');
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');

const HOUR = 60 * 60;
const DAY = 86400;
const ORACLE_START_DATE = Date.parse('2020-12-19T00:00:00Z') / 1000;

async function migration(deployer, network, accounts) {
  let uniswap, uniswapRouter;
  if (['dev'].includes(network)) {
    console.log('Deploying uniswap on dev network.');
    await deployer.deploy(UniswapV2Factory, accounts[0]);
    uniswap = await UniswapV2Factory.deployed();

    await deployer.deploy(UniswapV2Router02, uniswap.address, accounts[0]);
    uniswapRouter = await UniswapV2Router02.deployed();
  } else {
    uniswap = await UniswapV2Factory.at(
      knownContracts.UniswapV2Factory[network]
    );
    uniswapRouter = await UniswapV2Router02.at(
      knownContracts.UniswapV2Router02[network]
    );
  }

  const usdc = await IERC20.at(knownContracts.USDC[network]);

  // 2. provide liquidity to JAM-USDC
  // if you don't provide liquidity to JAM-USDC pair after step 1 and before step 3,
  //  creating Oracle will fail with NO_RESERVES error.
  const unit = web3.utils.toBN(10 ** 18).toString();
  const usdcUnit = web3.utils.toBN(10 ** 6).toString();
  const max = web3.utils
    .toBN(10 ** 18)
    .muln(10000)
    .toString();

  const jam = await JAM.deployed();
  const share = await Share.deployed();

  console.log('Approving Uniswap on tokens for liquidity');
  await Promise.all([
    approveIfNot(jam, accounts[0], uniswapRouter.address, max),
    approveIfNot(usdc, accounts[0], uniswapRouter.address, max),
  ]);

  // WARNING: msg.sender must hold enough USDC to add liquidity to JAM-USDC
  // otherwise transaction will revert
  console.log('Adding liquidity to pools', jam.address, usdc.address);
  await uniswapRouter.addLiquidity(
    jam.address,
    usdc.address,
    unit,
    usdcUnit,
    unit,
    usdcUnit,
    accounts[0],
    deadline()
  );

  console.log(
    `USDC-JAM pair address: ${await uniswap.getPair(usdc.address, jam.address)}`
  );

  // Deploy boardroom
  await deployer.deploy(Boardroom, jam.address, share.address);

  // Deploy simpleFund
  await deployer.deploy(SimpleFund);

  // 2. Deploy oracle for the pair between bac and usdc
  const bondOracle = await deployer.deploy(
    Oracle,
    uniswap.address,
    jam.address,
    usdc.address,
    HOUR,
    ORACLE_START_DATE
  );
  const seignorageOracle = await deployer.deploy(
    Oracle,
    uniswap.address,
    jam.address,
    usdc.address,
    DAY,
    ORACLE_START_DATE
  );

  let startTime = POOL_START_DATE;
  if (network === 'mainnet') {
    startTime += 5 * DAY;
  }

  await deployer.deploy(
    Treasury,
    jam.address,
    Bond.address,
    Share.address,
    bondOracle.address,
    seignorageOracle.address,
    Boardroom.address,
    SimpleFund.address,
    startTime
  );
}

async function approveIfNot(token, owner, spender, amount) {
  const allowance = await token.allowance(owner, spender);
  if (web3.utils.toBN(allowance).gte(web3.utils.toBN(amount))) {
    return;
  }
  await token.approve(spender, amount);
  console.log(
    ` - Approved ${token.symbol ? await token.symbol() : token.address}`
  );
}

function deadline() {
  // 30 minutes
  return Math.floor(new Date().getTime() / 1000) + 1800;
}

module.exports = migration;
