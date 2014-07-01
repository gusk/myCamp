require 'spec_helper'

feature 'User campsites' do
  scenario 'a user can add to their list of campsites' do
    user = create_user
    log_in(user)

    visit new_campsite_path

    fill_in "campsite[name]", with: 'Stillwater Pass'
    fill_in 'campsite[city]', with: 'Grand Lake'
    fill_in 'campsite[state]', with: 'Colorado'
    within 'form' do
      click_on 'Add Campsite'
    end
    expect(page).to have_content 'Stillwater Pass'
  end

  scenario 'a user can make a campsite private' do
    user = create_user
    log_in(user)

    visit new_campsite_path
    fill_in "campsite[name]", with: 'Stillwater Pass'
    fill_in 'campsite[city]', with: 'Grand Lake'
    fill_in 'campsite[state]', with: 'Colorado'
    within 'form' do
      click_on 'Add Campsite'
    end
  end
end