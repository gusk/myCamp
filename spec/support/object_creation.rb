def create_user(new_attributes = {})
  default_attributes = {
    :first_name => 'Bob',
    :last_name => 'Smith',
    :email => "rand#{rand}@example.com",
    :password => 'password',
  }
  attributes = default_attributes.merge(new_attributes)
  User.create!(attributes)
end