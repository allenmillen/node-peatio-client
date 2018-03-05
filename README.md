# node-peatio-client
Unofficial node.js Peatio client

Official Peatio client (aka peatio-sdk) has few drawbacks
- missing withdrawal support
- missing promises support
- missing access_key/secret auth support
- difficult to extend and test (i hate those self-invoked functions)

So i have to come up with this one

For now the following features are implemented
- generic HTTP get
- get_md = HTTP GET /depth
- get_balances = HTTP GET /members/me (requires auth)

Enjoy! Allen