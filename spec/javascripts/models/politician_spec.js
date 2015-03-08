describe("Politician", function(){
  var politician;

  beforeEach(function(){
    politician = new Politician({
      bioguide_id: "F123456",
      birthday: "1994-04-13",
      chamber: "senate",
      contact_form: "http://www.fake.com",
      district: 1,
      facebook_id: "123456",
      first_name: "Fake",
      gender: "F",
      in_office: true,
      last_name: "Fakerson",
      middle_name: "F",
      nickname: "Fakey",
      oc_email: "Fake@Fake.com",
      office: "123 Fake St",
      party: "F",
      phone: "123-456-7890",
      senate_class: 2,
      state: "FK",
      state_name: "Faketucky",
      term_end: "2017-01-13",
      term_start: "2015-01-13",
      title: "Sen",
      twitter_id: "NotARealPerson",
      website: "http://www.fake.com",
      youtube_id: "fake123"    
    })
  });

  describe("When creating a new Politician", function(){
    xit("create a new Politician with the correct bioguide_id", function(){
      expect(politician.bioguide_id).toEqual("F123456");
    });

    xit("create a new Politician with the correct chamber", function(){
      expect(politician.chamber).toEqual("senate");
    });

    xit("create a new Politician with the correct first name", function(){
      expect(politician.first_name).toEqual("Fake");
    });

    xit("create a new Politician with the correct last name", function(){
      expect(politician.last_name).toEqual("Fakerson");
    });

    xit("create a new Politician with the correct email", function(){
      expect(politician.oc_email).toEqual("Fake@Fake.com");
    });

    xit("create a new Politician with the correct office location", function(){
      expect(politician.office).toEqual("123 Fake St");
    });

    xit("create a new Politician with the correct phone number", function(){
      expect(politician.phone).toEqual("123-456-7890");
    });

    xit("create a new Politician with the correct state", function(){
      expect(politician.state).toEqual("FK");
      expect(politician.state_name).toEqual("Faketucky");
    });

    xit("create a new Politician with the correct term end date", function(){
      expect(politician.term_end).toEqual("2017-01-13");
    });

    xit("create a new Politician with the correct twitter_id", function(){
      expect(politician.twitter_id).toEqual("NotARealPerson");
    });

    xit("create a new Politician with the correct website", function(){
      expect(politician.website).toEqual("http://www.fake.com");
    });
  });
})
