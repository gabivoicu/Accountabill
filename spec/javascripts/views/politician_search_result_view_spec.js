describe("PoliticianSearchResultView", function(){
    var resultview;

    beforeEach(function(){
        resultview = new PoliticianSearchResultView
    });
    
    describe( "When initializing a new PoliticianSearchResultView", function(){
        xit("initializes with a JST template", function(){
            // Jasmine is not reading JST template
            expect(resultview.template).toEqual("<p>Politician goes here</p>")
        });
    });

    describe("#render", function(){
        xit("should add the template to the $el of the view", function(){
            resultview.render()
            expect(resultview.el).toEqual(5)
            // resultview will need stubbed model for render to work
        });


    });
})
