const api = require("../index")({});
const expect = require("chai").expect;


describe("public peatio-api sys tests", function() {

  it.skip("market data obtained", function(done) {
    api.get_md("btcusd").then(function(data){
      //console.log("md="+ JSON.stringify(data));
      expect(data.asks.length).to.be.greaterThan(0);
      //expect(data.bids.length).to.be.greaterThan(0);
      done()
    })
  });

});