# Cash Pools

## Treasury <a id="treasury"></a>

The Basis Cash Treasury exists to enable bond-to-cash redemptions. Bonds redeemed via the Treasury automatically returns the user an equal number of JAM, provided that: **1\)** the oracle price of JAM Cash is above 1 DAI, and **2\)** the Treasury contract has a positive balance of JAM.

Disallowing redemptions when the JAM price is below 1 DAI prevents bond holders from prematurely cutting their losses and creating unnecessary downward pressure on the price of JAM.

In addition, as the price of JAM is likely to experience significant volatility during its phase of initial distribution \(first 5 days\), the Treasury is scheduled to start after initial distribution concludes \(starting from **day 6** of launch\). This is to grant the JAM market enough time to stabilize, after which the protocol makes effective use of the stabilization mechanism to prevent further deviations in price.

## Boardroom <a id="boardroom"></a>

The Boardroom allows JAZZ Share holders to claim excess JAM Cash minted by the protocol. Holders of JAZZ Shares can stake their Shares to the Boardroom contract, which by doing so, they can claim a pro-rata share of JAM Cash tokens assigned to the Boardroom.

