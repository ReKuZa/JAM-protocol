pragma solidity ^0.6.0;

import '../distribution/JAMACPool.sol';
import '../distribution/JAMFRAXPool.sol';
import '../distribution/JAMDAIPool.sol';
import '../distribution/JAMDSDPool.sol';
import '../distribution/JAMESDPool.sol';
import '../distribution/JAMUSDCPool.sol';
import '../interfaces/IDistributor.sol';

contract InitialJAMDistributor is IDistributor {
    using SafeMath for uint256;

    event Distributed(address pool, uint256 jamAmount);

    bool public once = true;

    IERC20 public jam;
    IRewardDistributionRecipient[] public pools;
    uint256 public totalInitialBalance;

    constructor(
        IERC20 _jam,
        IRewardDistributionRecipient[] memory _pools,
        uint256 _totalInitialBalance
    ) public {
        require(_pools.length != 0, 'a list of BAC pools are required');

        jam = _jam;
        pools = _pools;
        totalInitialBalance = _totalInitialBalance;
    }

    function distribute() public override {
        require(
            once,
            'InitialJAMDistributor: you cannot run this function twice'
        );

        for (uint256 i = 0; i < pools.length; i++) {
            uint256 amount = totalInitialBalance.div(pools.length);

            jam.transfer(address(pools[i]), amount);
            pools[i].notifyRewardAmount(amount);

            emit Distributed(address(pools[i]), amount);
        }

        once = false;
    }
}
