require 'spec_helper'

feature 'User registration' do
  scenario 'user can register and will be logged in after registering' do
    visit '/'
    click_on 'Register'
    fill_in "user[first_name]", with: 'Gus'
    fill_in "user[last_name]", with: 'King'
    fill_in "user[email]", with: 'gus@example.com'
    fill_in "user[password]", with: 'password'
    within 'form' do
      click_on 'Register'
    end
    expect(page).to have_content 'Thanks for registering, Gus!'
    expect(page).to have_content 'Logout'
  end

  scenario 'user cannot register with the same email' do
    user = create_user
    visit '/'
    click_on 'Register'
    fill_in "user[first_name]", with: 'Bob'
    fill_in "user[last_name]", with: 'Smith'
    fill_in "user[email]", with: "#{user.email}"
    fill_in "user[password]", with: 'password'
    within 'form' do
      click_on 'Register'
    end
    expect(page).to have_content 'Email has already been taken'
  end

  scenario 'user cannot register with blank name, email, or password' do
    visit '/'
    click_on 'Register'
    fill_in "user[first_name]", with: ''
    fill_in "user[last_name]", with: ''
    fill_in "user[email]", with: ''
    fill_in "user[password]", with: ''
    within 'form' do
      click_on 'Register'
    end
    expect(page).to have_content 'First name can\'t be blank'
    expect(page).to have_content 'Last name can\'t be blank'
    expect(page).to have_content 'Email can\'t be blank'
    expect(page).to have_content 'Password can\'t be blank'
    expect(page).to have_content 'Email must be valid'
  end
end