module FeatureMethods
  def log_in(user)
    visit login_path
    fill_in 'user[email]', with: user.email
    fill_in 'user[password]', with: user.password
    within 'form' do
      click_on 'Login'
    end
  end
end