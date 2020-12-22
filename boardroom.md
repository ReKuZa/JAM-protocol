# Boardroom

`Boardroom.sol`

~~Deployed at~~ ~~`[0xcontract_address]`~~ ~~on the Ethereum mainnet, \[other\_testnets\] testnets.~~

This contract is yet to be deployed.

## State <a id="state"></a>

### directors <a id="directors"></a>

```text
mapping (address => Boardseat) private directors;​struct Boardseat {    uint256 appointmentTime;    uint256 shares;}
```

A map that records the current state of Basis Share stakers.

* `address` is the Share staker's address.
* `appointmentTime` is the block timestamp of last \(deposit / withdrawal / dividend claim\) of an account.
* `shares` is the account's current number of shares staked.

### boardHistory <a id="boardhistory"></a>

```text
BoardSnapshot[] private boardHistory​struct BoardSnapshot {    uint256 timestamp;    uint256 rewardReceived;    uint256 totalShares;}
```

An array that records the history of past seigniorage events. This array is used to calculate the amount of dividends that a specific Share holder has accrued. New elements are added to `boardHistory` whenever Basis Cash is newly minted to the Boardroom contract.

* `timestamp` is the block timestamp when new seigniorage was added.
* `rewardReceived` is the amount of Basis Cash seigniorage that was newly added.
* `totalShares` is the total number of staked shares at the time of seigniorage generation.

## Events <a id="events"></a>

### Staked <a id="staked"></a>

```text
event Staked(address indexed user, uint256 amount);
```

Emitted when Shares are staked via `stake`.

### Withdrawn <a id="withdrawn"></a>

```text
event Withdrawn(address indexed user, uint256 amount);
```

Emitted when staked Shares are withdrawn via `withdraw`.

### RewardPaid <a id="rewardpaid"></a>

```text
event RewardPaid(address indexed user, uint256 reward);
```

Emitted when Share dividends are paid via `claimDividends`.

### RewardAdded <a id="rewardadded"></a>

```text
event RewardAdded(uint256 reward);
```

Emitted when new seigniorage is added, and the `boardHistory` is updated via `allocateSeigniorage`.

## Modifiers <a id="modifiers"></a>

### directorExists <a id="directorexists"></a>

Checks whether `sender` has Shares staked.

## Functions <a id="functions"></a>

### Stake <a id="stake"></a>

```text
function stake(uint256 amount) external nonReentrant
```

Stakes `amount` Basis Shares to Boardroom sends all prior accrued dividends to `sender` if there is any.

### withdraw <a id="withdraw"></a>

```text
function withdraw(uint256 amount) public nonReentrant
```

Withdraws `amount` Basis Shares and all accrued dividends to `sender`.

### exit <a id="exit"></a>

Withdraws all staked Basis Shares and all accrued dividends to `sender`.

### getCashEarnings <a id="getcashearnings"></a>

```text
function getCashEarnings() public view returns (uint256)
```

Returns the amount of all dividends accrued by `sender`.

### claimDividends <a id="claimdividends"></a>

```text
function claimDividends() public directorExists
```

Claims all accrued dividends to `sender`.

### allocateSeigniorage <a id="allocateseigniorage"></a>

```text
function allocateSeigniorage(uint256 amount) external
```

Executed when new seigniorage is assigned to the Boardroom contract. Records the current block timestamp, the amount of new Basis Cash seigniorage, and the current amount of total Shares staked to `boardHistory`.

