require 'spec_helper'

feature 'Homepage' do
  scenario 'can visit the root page' do
    visit '/'
    expect(page).to have_content 'Welcome to myCamp.'
  end

  scenario 'user can visit the about page' do
    visit '/'
    click_link 'About'
    expect(page).to have_content 'myCamp is a tool to save and pinpoint your favorite campgrounds. Users are able to share their campground locations with others by making them public.'
  end
end