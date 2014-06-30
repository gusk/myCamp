require 'spec_helper'

feature 'Homepage' do
  scenario 'can visit the root page' do
    visit '/'
    expect(page).to have_content 'Welcome to myCamp.'
  end
end