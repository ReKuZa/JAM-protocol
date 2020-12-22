# Basis Shares

`Share.sol`

~~Deployed at~~ ~~`[0xcontract_address]`~~ ~~on the Ethereum mainnet, \[other\_testnets\] testnets.~~

This contract is yet to be deployed.

## Functions <a id="functions"></a>

### mint‌ <a id="mint"></a>

```text
function mint(address recipient_, uint256 amount_) public onlyOperator returns (bool)
```

Mints `amount_` Basis Shares to the `recipient_` account. Returns `TRUE` if successful.

### burn‌ <a id="burn"></a>

```text
function burn(uint256 amount) public onlyOperator override
```

Burns `amount` Basis Shares from the operator's account.

### burnFrom‌ <a id="burnfrom"></a>

```text
function burnFrom(address account, uint256 amount) public onlyOperator override
```

Burns `amount` Basis Shares from the `account` account.

