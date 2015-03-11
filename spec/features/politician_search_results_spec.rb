require 'rails_helper'

feature "User goes to main page" do

  it 'navigates to the main page' do
    visit('/')

    page.should have_selector('#about-us > h5')
    page.should have_selector('#take-action > h5')
    page.should have_selector('#sunlight-logo > h5')
    page.should have_selector('.large-1.columns.button.tiny.round.end')
  end

  it 'can search by zipcode' do
    visit('/')
    page.should have_selector('#search-field')
    page.fill_in('#search-field').with("43214")
    save_and_open_page
    page.should have_selector('.large-1.columns.button.tiny.round.end')
    page.should have_selector('#search-container')
  end

  it 'can click on a politician result' do
    visit('/')
    page.should have_selector('html  > body > #wrapper > #main > .small-6.large-centered.columns:nth-child(5) > div > .search-results > .row.politician-result')
    page.should have_selector('h3')
  end

  it 'can see details on a politician detail page' do
    visit('/')
    page.should have_selector('.tab-title.active > a')
    page.should have_selector('.tab-title.active > a')
    page.should have_selector('#panel71')
    page.should have_selector('.tab-title.active > a')
    page.should have_selector('#sector-chart > svg')
    page.should have_selector('.tab-title.active > a')
    page.should have_selector('html  > body > #wrapper > #main > #results-view > .detail > .row > .data-container.large-9.columns > .tabs-content > .content.active:nth-child(3) > #contributor-types > .bullet')
    page.should have_selector('.bullet:nth-child(1)')
    page.should have_selector('.tab-title.active > a')
    page.should have_selector('#panel31')
    page.should have_selector('.tab-title.active > a')
    page.should have_selector('#industry-chart > svg')
    page.should have_selector('.tab-title.last.active > a')
    page.should have_selector('#top-contributor')
  end
end
