const api = require("../index")({});
const expect = require("chai").expect;


describe("public peatio-api sys tests", function() {

  it("market data obtained", function(done) {
    api.get_md("btcusd").then(function(data){
      expect(data.asks.length).to.be.greaterThan(0);
      expect(data.bids.length).to.be.greaterThan(0);
      done()
    })
  });

});