class User < ApplicationRecord
  has_many :diaries
  validates :name, length: 2..20, uniqueness: true
  has_secure_password
end
