# Treasury

​

## Code <a id="code"></a>

`Treasury.sol`

~~Deployed at~~ ~~`[0xcontract_address]`~~ ~~on the Ethereum mainnet, \[other\_testnets\] testnets.~~

This contract is yet to be deployed.

### Events <a id="events"></a>

#### RedeemedBonds <a id="redeemedbonds"></a>

```text
event RedeemedBonds(address indexed from, uint256 amount);
```

Emitted when Basis Bonds are redeemed via `redeemBonds`.

#### BoughtBonds <a id="boughtbonds"></a>

```text
event BoughtBonds(address indexed from, uint256 amount);
```

Emitted when Basis Bonds are bought via `buyBonds`.

#### TreasuryFunded <a id="treasuryfunded"></a>

```text
event TreasuryFunded(uint256 timestamp, uint256 seigniorage);
```

Emitted when new Basis Cash is minted to the Treasury via `allocateSeigniorage`.

#### BoardroomFunded <a id="boardroomfunded"></a>

```text
event BoardroomFunded(uint256 timestamp, uint256 seigniorage);
```

Emitted when new Basis Cash is minted to the Boardroom via `allocateSeigniorage`.

### Modifiers <a id="modifiers"></a>

#### allocationTimeRipe <a id="allocationtimeripe"></a>

```text
modifier allocationTimeRipe
```

Checks whether a day has passed since the last successful execution of `allocateSeigniorage`.

### Functions <a id="functions"></a>

#### getCashPrice <a id="getcashprice"></a>

```text
function getCashPrice() internal returns (uint cashPrice)
```

Returns the oracle price of Basis Cash denominated in DAI.

#### buyBonds <a id="buybonds"></a>

```text
function buyBonds(uint256 amount) external
```

Mints `amount / bondPrice` Basis Bonds, in exchange for `amount` Basis Cash burnt.

* `amount` is the amount of Basis Cash used in the purchase.
* Emits `BoughtBonds`.

#### redeemBonds <a id="redeembonds"></a>

```text
function redeemBonds(uint256 amount) external
```

If the Basis Cash price is above 1 DAI, mints `amount` Basis Cash, in exchange for `amount` Basis Bonds burnt.

* `amount` is the number of Basis Bonds to redeem.
* Emits `RedeemedBonds`.

#### allocateSeigniorage <a id="allocateseigniorage"></a>

```text
function allocateSeigniorage() external allocationTimeRipe
```

If the oracle price of Basis Cash is above \(1+ε\) DAI, mints `((BAC Oracle Price) - 1) * cashSupply` number of Basis Cash to either the Boardroom contract or the Treasury contract.

* If the Treasury's balance is below 1,000 BAC, seigniorage is given to the Treasury. Emits `TreasuryFunded`.
* If the Treasury's balance is above 1,000 BAC, seigniorage is given to the Boardroom. Emits `BoardroomFunded`.

