class Note < ApplicationRecord
  belongs_to :user
  extend FriendlyId
  friendly_id :date_to_s

  def date_to_s
    date.to_s
  end
end
