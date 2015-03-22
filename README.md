# Accountabill

[Live on Heroku](https://accountabill.herokuapp.com/)

Accountabill is an Open Source web application that provides a list of State Representatives and Senators based on a user's zipcode. A user can look at campaign contribution data for their Congress person for the latest election cycle. Information about contributing sectors, industries, individual vs. PAC and top contributors is available.

Built in 8 days, this web app is the final project of five newbie software developers graduating [Dev Bootcamp](http://devbootcamp.com/).

Accountabill uses the Congress v3 and Influence Explorer APIs from the [Sunlight Foundation](https://sunlightfoundation.com/api/).

### Screenshots
![Screenshots](app/assets/images/screenshots.png)

### Technologies
- Ruby on Rails
- Postgres with HStore
- Backbone JS
- Foundation
- SASS
- D3 JS Library
- OmniAuth

### Testing
- Travis
- SimpleCov
- RSpec
- Capybara
- VCR


### Getting Started
1. Clone repo ```git clone https://github.com/gabivoicu/Accountabill.git ```
2. Install dependencies ```bundle install```
3. Set up database ```rake db:reset```
4. Start serves ```rails s```
5. Project is now live on [localhost:3000](http://localhost:3000/)

### Team

Accountabill is the brainchild of [Gabriela Voicu](https://github.com/gabivoicu), [Ian Agne](https://github.com/ianagne), [Rachel Kolcheck](https://github.com/rkolcheck), [Shiraz Sherwani](https://github.com/PacoGuy) and [Elliott Young](https://github.com/ElliottAYoung). 

### What's Next
As of March 22nd we want to get the Twitter functionality up and going (so a user can tweet at their Congress person), investigate D3 display bugs and improve test coverage. Alternatively, take a look at the Issues section to see how you can help.
