# Stabilization Mechanism

The Basis Cash protocol is designed to guarantee Basis Cash tokens to be exchanged at a value of a single US dollar, with the stabilizer \(in-protocol stability mechanism\) in charge of matching the supply of Basis Cash to their demand.

Every 24 hours, the **time-weighted average** of the BAC-DAI exchange rate is read from the Uniswap v2 contract, which is then fed into the Basis Cash protocol to be referenced by its stability mechanism.

The stabilization mechanism is triggered whenever the price of Basis Cash is observed to be above / below \(1+ε\) DAI, where ε is a parameter that defines the range of price stability for the BAC token. On launch, ε is set to be 0.05.

## Contractionary Policy <a id="contractionary-policy"></a>

At any point in time, Basis Bonds can be bought from the protocol in exchange for Basis Cash. Purchase of Bonds are performed at an algorithmically set price. With a Basis Cash oracle price of P DAI, bonds are sold off at a price of P BAC \(effective price being P^2 DAI\), promising bond holders a premium when redeemed. Purchased bonds can be converted to Basis Cash, insofar as the preconditions are met and the Treasury is not empty.

Bonds can still be purchased even when Basis Cash trades above 1 DAI \(P &gt; 1\), however this nets the purchaser a loss when redeemed. For example, when 1 BAC = 1.1 DAI, a Bond is sold for 1.1 BAC. Since all Bonds can only be redeemed for 1 Cash, this yields the purchaser a net loss. Thus, bond purchases are only expected to occur when 1 BAC trades below 1 DAI. Although bond purchases at a BAC price above 1 USD is allowed in the contract, it is disabled in the Basis Cash frontend to avoid user confusion.

## Expansionary Policy <a id="expansionary-policy"></a>

If the price of Basis Cash is observed to be higher than \(1+ε\) DAI, the system mints _**totalSupply \*\(oraclePrice-1\)**_ number of new Basis Cash tokens. The issued Basis Cash is either deposited to the Treasury or the Boardroom, depending on the Basis Cash balance of the Treasury.

If the Treasury has a balance above 1,000 Basis Cash, then it is logical to assume that either all bonds have been already redeemed, or no bond holder is currently willing to perform a redemption. Either way, this signals that the demand for bond redemption do not exist at this time, and thus the freshly minted Basis Cash is given to the Boardroom contract.

However, if the Treasury has a balance of below 1,000 Basis Cash, then it is assumed that there will be additional demand for bond-to-cash redemption. Therefore, the issued Basis Cash is routed to the Treasury so that Bond holders can exercise redemptions.

