describe("Contribution", function(){
  var contribution;

  beforeEach(function(){
    contribution = new Contribution({
      total_amount: "1234",
      total_count: "1234",
      name: "Fake",
      direct_count: "2134",
      direct_amount: "134"
    })
  });

  describe("When creating a new contribution", function(){
    xit("creates a new Contribution with the correct total amount", function(){
      expect(contribution.total_amount).toEqual("1234");
    });

    xit("creates a new Contribution with the correct total count", function(){
      expect(contribution.total_count).toEqual("1234");
    });

    xit("creates a new Contribution with the correct name", function(){
      expect(contribution.name).toEqual("Fake");
    });

    xit("creates a new Contribution with the correct direct count", function(){
      expect(contribution.direct_count).toEqual("2134");
    });

    xit("creates a new Contribution with the correct direct amount", function(){
      expect(contribution.direct_amount).toEqual("134");
    });
  });
});
