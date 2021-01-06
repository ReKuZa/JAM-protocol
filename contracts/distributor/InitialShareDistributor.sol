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
    IRewardDistributionRecipient public usdcJamLPPool;
    uint256 public usdcJamInitialBalance;
    IRewardDistributionRecipient public usdcJazzLPPool;
    uint256 public usdcJazzInitialBalance;

    constructor(
        IERC20 _share,
        IRewardDistributionRecipient _usdcJamLPPool,
        uint256 _usdcJamInitialBalance,
        IRewardDistributionRecipient _usdcJazzLPPool,
        uint256 _usdcJazzInitialBalance
    ) public {
        share = _share;
        usdcJamLPPool = _usdcJamLPPool;
        usdcJamInitialBalance = _usdcJamInitialBalance;
        usdcJazzLPPool = _usdcJazzLPPool;
        usdcJazzInitialBalance = _usdcJazzInitialBalance;
    }

    function distribute() public override {
        require(
            once,
            'InitialShareDistributor: you cannot run this function twice'
        );

        share.transfer(address(usdcJamLPPool), usdcJamInitialBalance);
        usdcJamLPPool.notifyRewardAmount(usdcJamInitialBalance);
        emit Distributed(address(usdcJamLPPool), usdcJamInitialBalance);

        share.transfer(address(usdcJazzLPPool), usdcJazzInitialBalance);
        usdcJazzLPPool.notifyRewardAmount(usdcJazzInitialBalance);
        emit Distributed(address(usdcJazzLPPool), usdcJazzInitialBalance);

        once = false;
    }
}
