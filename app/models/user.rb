class User < ApplicationRecord
    validates :email, presence: true
    validates :first_name, presence: true , length: {maximum: 50}
    validates :last_name, presence: true, length: {maximum: 50}
end
