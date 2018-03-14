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
- get_balances = HTTP GET /members/me
- get_orders = HTTP GET /orders
- cancel_all_orders = HTTP POST /orders/clear
- place_order = HTTP POST /orders
- get_order = HTTP GET /order id=(id)
- cancel_order = HTTP POST /order id=(id)

Enjoy! Allen