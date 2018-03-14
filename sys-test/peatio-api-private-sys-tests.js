  const PeatioApi = require("../index");
  const config = {access_key: "RykhOK4da1MMZ02EWFcF6EaOPibeE6V7UETZCOru", secret: "EuiYqk1xbXx85CmgoAxHf5w1d7TPaK5siGWJQF1A"};
  const api = PeatioApi(config);

  const expect = require("chai").expect;


  describe("private peatio-api sys tests", function() {

    before(function(){
      return api.cancel_all_orders()
    });

    it("balance obtained", function(done) {
      api.get_balances().then(function(data){
        expect(data.accounts.length).to.be.greaterThan(0);
        done()
      })
    });


    it("new order placed and orders obtained", function(done) {
      var order = {market: "btcusd", volume: 0.1, price: 0.2, side: "sell", ord_type: "limit"};
      api.place_order(order).then(function(new_order) {
        //console.log("place_order() o=" + JSON.stringify(new_order));

        api.get_orders({market: "btcusd"}).then(function (data) {
          //console.log("orders=" + JSON.stringify(data));
          expect(data.length).to.be.greaterThan(0);
          done()
        })
      })
    });


    it("order placed and retrieved", function(done) {
      var order = {market: "btcusd", volume: 0.1, price: 0.2, side: "sell", ord_type: "limit"};
      api.place_order(order).then(function(new_order){
        //console.log("place_order() o=" + JSON.stringify(new_order));
        api.get_order(new_order.id).then(function(retrieved_order){
          //console.log("get_order() o=" + JSON.stringify(retrieved_order));
          //expect(retrieved_order.trades).to.be.defined();
          expect(retrieved_order.trades.length).to.be.equal(0);
          done()
        })
      })
    });


    it("order placed and cancelled", function(done) {
      var order = {market: "btcusd", volume: 0.11, price: 0.21, side: "sell", ord_type: "limit"};
      api.place_order(order).then(function(new_order){
        //console.log("place_order() o=" + JSON.stringify(new_order));
        api.cancel_order(new_order.id).then(function(cancelled_order){
          //console.log("cancel_order() o=" + JSON.stringify(cancelled_order));
          //expect(retrieved_order.trades).to.be.defined();
          //expect(retrieved_order.trades.length).to.be.equal(0);
          api.get_order(cancelled_order.id).then(function(retrieved_order){
            //console.log("get_order() o=" + JSON.stringify(retrieved_order));
            expect(retrieved_order.state).to.be.equal("cancel");
            expect(retrieved_order.trades.length).to.be.equal(0);
            done()
          })
        })
      })
    });


    it.skip("order placed and updated", function(done) {
      var order = {market: "btcusd", volume: 0.11, price: 0.21, side: "sell", ord_type: "limit"};
      api.place_order(order).then(function(new_order){
        //console.log("place_order() o=" + JSON.stringify(new_order));
        api.cancel_order(new_order.id).then(function(cancelled_order){
          //console.log("cancel_order() o=" + JSON.stringify(cancelled_order));
          //expect(retrieved_order.trades).to.be.defined();
          //expect(retrieved_order.trades.length).to.be.equal(0);
          api.get_order(cancelled_order.id).then(function(retrieved_order){
            //console.log("get_order() o=" + JSON.stringify(retrieved_order));
            expect(retrieved_order.state).to.be.equal("cancel");
            expect(retrieved_order.trades.length).to.be.equal(0);
            done()
          })
        })
      })
    });

  });