const PeatioApi = require("../index");
const config = {access_key: "RykhOK4da1MMZ02EWFcF6EaOPibeE6V7UETZCOru", secret: "EuiYqk1xbXx85CmgoAxHf5w1d7TPaK5siGWJQF1A"};
const api = PeatioApi(config);

const expect = require("chai").expect;


describe("private peatio-api sys tests", function() {

  it("balance obtained", function(done) {
    api.get_balances().then(function(data){
      expect(data.accounts.length).to.be.greaterThan(0);
      done()
    })
  });

});