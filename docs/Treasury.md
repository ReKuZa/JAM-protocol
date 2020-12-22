## `Treasury`

Monetary policy logic to adjust supplies of basis cash assets




### `checkMigration()`





### `checkOperator()`






### `constructor(address _cash, address _bond, address _share, address _bondOracle, address _seigniorageOracle, address _boardroom, address _fund, uint256 _startTime)` (public)





### `getReserve() → uint256` (public)





### `getBondOraclePrice() → uint256` (public)





### `getSeigniorageOraclePrice() → uint256` (public)





### `_getCashPrice(address oracle) → uint256` (internal)





### `initialize()` (public)





### `migrate(address target)` (public)





### `setFund(address newFund)` (public)





### `setFundAllocationRate(uint256 rate)` (public)





### `_updateCashPrice()` (internal)





### `buyBonds(uint256 amount, uint256 targetPrice)` (external)





### `redeemBonds(uint256 amount, uint256 targetPrice)` (external)





### `allocateSeigniorage()` (external)






### `Initialized(address executor, uint256 at)`





### `Migration(address target)`





### `ContributionPoolChanged(address operator, address newFund)`





### `ContributionPoolRateChanged(address operator, uint256 newRate)`





### `RedeemedBonds(address from, uint256 amount)`





### `BoughtBonds(address from, uint256 amount)`





### `TreasuryFunded(uint256 timestamp, uint256 seigniorage)`





### `BoardroomFunded(uint256 timestamp, uint256 seigniorage)`





### `ContributionPoolFunded(uint256 timestamp, uint256 seigniorage)`





