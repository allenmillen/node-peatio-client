const api = require("..")({});
const expect = require("chai").expect;


describe("peatio-api unit tests", function() {

  it("payload constructed", function() {
    var p = api.v4t.payload("GET", "members/me", {p1: "v1"});
    expect(p).to.be.equal("GET|/api/v2/members/me|p1=v1")
  });

  it("signature calculated", function() {
    var s = api.v4t.signature("data", "secret");
    expect(s).to.be.equal("1b2c16b75bd2a870c114153ccda5bcfca63314bc722fa160d690de133ccbb9db")
  });

  it("params stringified", function() {
    var p = {a:1 , b:2, c:3};
    var s = api.v4t.params_string(p);
    expect(s).to.be.equal("a=1&b=2&c=3&")
  });

  it("url constructed", function() {
    api.v4t.base_url = "http://localhost:8000";
    var p = api.v4t.url("members/me", {p1: "v1"});
    expect(p).to.be.equal(api.v4t.base_url + "/api/v2/members/me?p1=v1&")
  });

});