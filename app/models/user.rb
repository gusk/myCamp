class User < ActiveRecord::Base
  has_secure_password
  has_many :campsites
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: {with: /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,3}/, message: "must be valid"}
  validates :password, length: {minimum: 8, message: "Must be 8 characters long", if: 'password.present?'}
end