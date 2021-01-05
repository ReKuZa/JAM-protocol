pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import '../interfaces/IDistributor.sol';
import '../interfaces/IRewardDistributionRecipient.sol';

contract InitialShareDistributor is IDistributor {
    using SafeMath for uint256;

    event Distributed(address pool, uint256 cashAmount);

    bool public once = true;

    IERC20 public share;
    IRewardDistributionRecipient public daiJamLPPool;
    uint256 public daiJamInitialBalance;
    IRewardDistributionRecipient public daiJazzLPPool;
    uint256 public daiJazzInitialBalance;

    constructor(
        IERC20 _share,
        IRewardDistributionRecipient _daiJamLPPool,
        uint256 _daiJamInitialBalance,
        IRewardDistributionRecipient _daiJazzLPPool,
        uint256 _daiJazzInitialBalance
    ) public {
        share = _share;
        daiJamLPPool = _daiJamLPPool;
        daiJamInitialBalance = _daiJamInitialBalance;
        daiJazzLPPool = _daiJazzLPPool;
        daiJazzInitialBalance = _daiJazzInitialBalance;
    }

    function distribute() public override {
        require(
            once,
            'InitialShareDistributor: you cannot run this function twice'
        );

        share.transfer(address(daiJamLPPool), daiJamInitialBalance);
        daiJamLPPool.notifyRewardAmount(daiJamInitialBalance);
        emit Distributed(address(daiJamLPPool), daiJamInitialBalance);

        share.transfer(address(daiJazzLPPool), daiJazzInitialBalance);
        daiJazzLPPool.notifyRewardAmount(daiJazzInitialBalance);
        emit Distributed(address(daiJazzLPPool), daiJazzInitialBalance);

        once = false;
    }
}
