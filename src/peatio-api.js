const util = require("util");
const request = require("request");
const crypto = require("crypto");



module.exports = function(opts) {

  var impl = {
    // settings
    base_url : opts.url || "http://localhost:8000",
    base_path: opts.base_path || "/api/v2",
    access_key: opts.access_key,
    secret: opts.secret,

    // internal methods
    signature: signature,
    payload: payload,
    params_string: params_string,
    url: url,

    // dependencies
    request: opts.request || request,
    crypto: opts.crypto || crypto
  };


  var api = {
    get: get,
    get_balances: get_balances,

    v4t: impl
  };


  function get_balances() {
    return get_private("/members/me", [])
  }


  function get(path, params) {
    var p = new Promise();

    var req_url = impl.url(path, params);
    impl.request.get(req_url, function(error, response, body) {

    });

    return p;
  }


  function get_private(path, query_params, tonce) {
    var params = query_params || {};

    params["tonce"] = tonce || Date.now();
    params["access_key"] = impl.access_key;

    var payload_ = impl.payload("GET", path, params);
    var signature_ = impl.signature(payload_, impl.secret);
    params["signature"] = signature_;

    return impl.get(path, params)
  }


  function params_string(params) {
    var str = "";
    for(var key in params) {
      str += util.format("%s=%s&", key, params[key])
    }
    return str
  }


  function url(path, params) {
    var params_str = impl.params_string(params);
    return util.format("%s%s/%s?%s", impl.base_url, impl.base_path, path, params_str)
  }


  function payload(method, path, params) {
    var params_str = impl.params_string(params);
    return util.format("%s|%s/%s|%s", method, impl.base_path, path, params_str)
  }


  function signature(payload, secret) {
    return impl.crypto.createHmac('sha256', secret).update(payload).digest("hex");
  }


  return api
}