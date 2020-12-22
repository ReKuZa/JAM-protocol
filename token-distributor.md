# Token Distributor

This contract is yet to be deployed.

## State <a id="state"></a>

**Config**

```text
uint256 public DURATION = 5 days;uint256 public starttime = 1600831965;uint256 public periodFinish = 0;uint256 public rewardRate = 0;
```

Stores protocol parameters

* `DURATION` is the duration of token distribution.
* `starttime` is the time when token distribution starts.
* `periodFinish` is the time when token distribution ends.
* `rewardRate` is

### lastUpdateTime <a id="lastupdatetime"></a>

​

```text
uint256 public lastUpdateTime;
```

### rewardPerTokenStored <a id="rewardpertokenstored"></a>

​

```text
uint256 public rewardPerTokenStored;
```

### ​ <a id="undefined"></a>

### userRewardPerTokenPaid <a id="userrewardpertokenpaid"></a>

```text
mapping(address => uint256) public userRewardPerTokenPaid;
```

​

* `address` is
* `uint256` is

### rewards <a id="rewards"></a>

```text
mapping(address => uint256) public rewards;
```

​

* `address` is
* `uint256` is

### deposits <a id="deposits"></a>

```text
mapping(address => uint256) public deposits;
```

​

* `address` is
* `uint256` is

## Events <a id="events"></a>

### RewardAdded <a id="rewardadded"></a>

```text
event RewardAdded(uint256 reward);
```

Emitted when rewards a

### Staked <a id="staked"></a>

```text
event Staked(address indexed user, uint256 amount);
```

Emitted when tokens are staked via `stake`.

### Withdrawn <a id="withdrawn"></a>

```text
event Withdrawn(address indexed user, uint256 amount);
```

Emitted when staked tokens are withdrawn via `withdraw`.

### RewardPaid <a id="rewardpaid"></a>

```text
event RewardPaid(address indexed user, uint reward);
```

Emitted when

## Modifiers <a id="modifiers"></a>

### checkStart <a id="checkstart"></a>

Checks whether distribution of tokens have started.

### updateReward <a id="updatereward"></a>

```text
modifier updateReward(address account)
```

Updates the amount of rewards accrued by `account`.

## Functions <a id="functions"></a>

### lastTimeRewardApplicable <a id="lasttimerewardapplicable"></a>

```text
function lastTimeRewardApplicable() public view returns (uint256)
```

​

### rewardPerToken <a id="rewardpertoken"></a>

```text
function rewardPerToken() public view returns (uint256)
```

​

### earned <a id="earned"></a>

```text
function earned(address account) public view returns (uint256)
```

​

* `account` is

### getReward <a id="getreward"></a>

```text
function getReward() public updateReward(msg.sender) checkStart
```

​

### notifyRewardAmount <a id="notifyrewardamount"></a>

```text
function notifyRewardAmount(uint256 reward) external overrid onlyRewardDistribution updateReward(address(0))
```

​

* `reward` is

### Stake <a id="stake"></a>

```text
function stake(uint256 amount) public override updateReward(msg.sender) checkStart
```

Stakes `amount` stablecoins to the distribution contract. Emits `Staked`.

* `amount` is the amount of stablecoins being staked.

### \[Internal\] Stake <a id="internal-stake"></a>

```text
function stake(uint256 amount) public virtual
```

Performs staking by transferring stablecoins from the staker to the distribution contract.

* `amount` is the amount of stablecoins being staked.

### Withdraw <a id="withdraw"></a>

```text
function withdraw(uint256 amount) public override updateReward(msg.sender) checkStart
```

Withdraws `amount` stablecoins from the distribution contract. Emits `Withdrawn`.

### \[Internal\] Withdraw <a id="internal-withdraw"></a>

```text
function withdraw(uint256 amount) public virtual
```

Performs withdrawal by transferring stablecoins from the distribution contract to the withdrawer.

* `amount` is the amount of stablecoins being withdrawn.

### Exit <a id="exit"></a>

WIthdraws all staked stablecoins to the `sender`.

