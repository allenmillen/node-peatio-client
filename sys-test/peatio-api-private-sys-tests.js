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


    it("deposits listed", function(done) {
      var filter = {currency: "usd"};
      api.get_deposits(filter).then(function(depos) {
        //console.log("get_deposits() data=" + JSON.stringify(depos));
        expect(depos.length).to.be.greaterThan(0); // there must be deposits!!!
        done()
      })
    });


    it("deposit details", function(done) {
      var txid = "db0f9d19e0273c1cd583484724c598fa74e2390fabd55417db1161097344df5f";
      api.get_deposit(txid).then(function(data) {
        //console.log("get_deposit() data=" + JSON.stringify(data));
        expect(data.id).to.be.equal(3);
        done()
      })
    });


    it("withdrawals listed", function(done) {
      var filter = {currency: "btc"};
      api.get_withdrawals(filter).then(function(withdrawals) {
        //console.log("get_withdrawals() data=" + JSON.stringify(withdrawals));
        expect(withdrawals.length).to.be.greaterThan(0); // there must be withdrawals!!!
        done()
      })
    });


    it("withdraw submitted", function(done) {
      var w = {currency:"btc", amount:0.01456, address_id:1};
      api.withdraw(w).then(function(withdrawal) {
        //console.log("get_withdrawal() data=" + JSON.stringify(withdrawal));
        expect(withdrawal.state).to.be.equal("submitted");
        done()
      })
    });


    it("withdrawal addresses listed", function(done) {
      api.get_withdrawal_addresses().then(function(addresses) {
        //console.log("get_withdrawal_addresses() data=" + JSON.stringify(addresses));
        expect(addresses.length).to.be.greaterThan(0);
        done()
      })
    });

  });