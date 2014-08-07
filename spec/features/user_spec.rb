require 'spec_helper'

feature 'User' do
  scenario 'user can login' do
    user = create_user

    visit '/'
    expect(page).to have_link 'Login'
    click_link 'Login'
    fill_in "user[email]", with: "#{user.email}"
    fill_in "user[password]", with: "#{user.password}"
    within 'form' do
      click_on 'Login'
    end
    expect(page).to have_content 'Logout'
    expect(page).to have_no_content 'Register'
  end

  scenario 'user cannot login with an unregistered email address' do
    visit '/'
    expect(page).to have_link 'Login'
    click_link 'Login'
    fill_in "user[email]", with: "bademail@email.com"
    fill_in "user[password]", with: "password"
    within 'form' do
      click_on 'Login'
    end
    expect(page).to have_content 'bademail@email.com is not a registered email. Please register'
  end

  scenario 'user can log out' do
    user = create_user
    visit '/'
    expect(page).to have_link 'Login'
    click_link 'Login'
    fill_in "user[email]", with: "#{user.email}"
    fill_in "user[password]", with: "#{user.password}"
    within 'form' do
      click_on 'Login'
    end
    click_link 'Logout'
    expect(page).to have_content 'You have successfully logged out.'
    expect(page).to have_no_content 'Logout'
  end
end