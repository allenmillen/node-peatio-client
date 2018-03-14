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

    get_private: get_private,
    exec_req: exec_req,
    exec_private: exec_private,

    // dependencies
    request: opts.request || request,
    crypto: opts.crypto || crypto
  };


  var api = {
    get: get,

    get_balances: get_balances,
    get_md: get_md,

    get_orders: get_orders,
    place_order: place_order,
    get_order: get_order,
    cancel_order: cancel_order,
    cancel_all_orders: cancel_all_orders,

    v4t: impl
  };


  // {"timestamp":1520252758,"asks":[["12500.0","0.12"],["12000.0","0.115"],["11500.0","0.11"]],"bids":[["10500.0","0.05"],["9500.0","0.07"],["9000.0","0.1"]]}
  function get_md(pair) {
    return api.get("depth", {market: pair})
  }


  // {"sn":"SN001AACEBDE","email":"allenmillen@gmail.com","accounts":[{"currency":"usd","balance":"17439.835","locked":"2560.0"},{"currency":"btc","balance":"2.563184","locked":"0.345"}]}
  function get_balances() {
    return impl.get_private("members/me", {})
  }

  function get_order(id) {
    return impl.get_private("order", {id: id})
  }

  function get_orders(params) {
    return impl.get_private("orders", params)
  }

  function place_order(params) {
    return impl.exec_private("POST", "orders", params)
  }

  function cancel_order(id) {
    return impl.exec_private("POST", "order/delete", {id: id})
  }

  function cancel_all_orders() {
    return impl.exec_private("POST", "orders/clear", {})
  }


  function get(path, params, query_params_str) {
    return impl.exec_req("GET", path, params, query_params_str)
  }

  function exec_req(method, path, params, query_params_str) {
    var p = new Promise(function(resolve, reject) {

      var req_url = impl.url(path, params, query_params_str);
      //console.log("u=" + req_url);
      impl.request({uri: req_url, method: method}, function(error, response, body) {
        if (error) reject(error);
        else resolve(body)
      });

    });

    return p.then(function(data){
      return JSON.parse(data)
    })
  }

  // POST /orders
  // {"id":11,"side":"sell","ord_type":"limit","price":"0.1","avg_price":"0.0","state":"wait","market":"btcusd",
  // "created_at":"2018-03-14T14:33:09Z","volume":"0.1","remaining_volume":"0.1","executed_volume":"0.0",
  // "trades_count":0}"}
  function post(path, params, query_params_str) {
    return impl.exec_req("POST", path, params, query_params_str)
  }


  function get_private(path, query_params, tonce) {
    return impl.exec_private("GET", path, query_params, tonce)
  }


  function exec_private(method, path, query_params, tonce) {
    var params = query_params || {};

    params["tonce"] = tonce || Date.now();
    params["access_key"] = impl.access_key;

    var payload_ = impl.payload(method, path, params);
    var signature_ = impl.signature(payload_, impl.secret);
    var qp_str = impl.params_string(params) + util.format("signature=%s", signature_);

    return impl.exec_req(method, path, params, qp_str)
  }


  function post_private(path, query_params, tonce) {
    return impl.exec_private("POST", path, query_params, tonce)
  }


  function params_string(params) {
    var str = "";
    var sorted_keys = Object.keys(params);
    sorted_keys.sort();
    for(var key of sorted_keys) {
      str += util.format("%s=%s&", key, params[key])
    }
    return str
  }


  function url(path, params, query_params_str) {
    var params_str = query_params_str; // passed qp string has prio over hash
    if (params_str == null)
      params_str = impl.params_string(params);
    return util.format("%s%s/%s?%s", impl.base_url, impl.base_path, path, params_str)
  }


  function payload(method, path, params) {
    var temp_str = impl.params_string(params);
    var params_str = temp_str.substring(0, temp_str.length - 1);
    return util.format("%s|%s/%s|%s", method, impl.base_path, path, params_str)
  }


  function signature(payload, secret) {
    return impl.crypto.createHmac('sha256', secret).update(payload).digest("hex");
  }


  return api
};