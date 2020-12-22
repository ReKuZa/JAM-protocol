# Price Oracle

A modified version of `ExampleOracleSimple.sol` from the uniswap-v2-periphery repository has been used.

`Oracle.sol`

~~Deployed at~~ ~~`[0xcontract_address]`~~ ~~on the Ethereum mainnet, \[other\_testnets\] testnets.~~

This contract is yet to be deployed.

## Events <a id="events"></a>

### Updated <a id="updated"></a>

```text
event Updated(uint256 price0CumulativeLast, uint256 price1CumulativeLast);
```

Emitted when the price of Basis Cash is updated via `update`.

## Functions <a id="functions"></a>

### update <a id="update"></a>

```text
function update() external
```

If 24 hours has passed since `update` was last successfully executed, updates the time-weighted average price \(TWAP\) of Basis Cash. Emits `Updated`.

### consult <a id="consult"></a>

```text
function consult(address token, uint amountIn) external view returns (uint amountOut)
```

Returns the amount of output tokens given in exchange for `amountIn` number of`token` tokens \(\(Price of `token` token denominated in output tokens\) \* `amountIn`\).

### pairFor <a id="pairfor"></a>

```text
function pairFor(address factory, address tokenA, address tokenB) external pure returns (address lpt)
```

Returns the calculated address for a pair without making any external calls.

