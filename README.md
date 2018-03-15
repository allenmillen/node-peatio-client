# node-peatio-client
Unofficial node.js Peatio client

Official Peatio client (aka peatio-sdk) has few drawbacks
- missing withdrawal support
- missing promises support
- missing access_key/secret auth support
- difficult to extend and test (i hate those immediately-invoked functions)

So i have to come up with this one

For now the following features are implemented
- generic HTTP request (with native promises)
- auth by access key & secrets

Public (no auth required)
- get_md = HTTP GET /depth?market=btcusd

Private (requires auth)
- get_balances = HTTP GET /api/v2/members/me
- get_orders = HTTP GET /api/v2/orders
- cancel_all_orders = HTTP POST /api/v2/orders/clear
- place_order = HTTP POST /api/v2/orders
- get_order = HTTP GET /api/v2/order id=(id)
- cancel_order = HTTP POST /api/v2/order id=(id)
- get_deposits = HTTP GET /api/v2/deposits
- get_deposit = HTTP GET /api/v2/deposit txid=(txid)
- get_withdrawals = HTTP GET /api/v2/withdrawals
- get_withdrawal_addresses == HTTP GET /api/v2/withdraws/addresses
- withdraw = HTTP POST /api/v2/withdraws

Enjoy! Allen