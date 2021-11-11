# frozen_string_literal: true

class Quiz < ApplicationRecord
  is_sqlite_db = ActiveRecord::Base.connection_db_config.configuration_hash[:adapter] == "sqlite3"
  DB_REGEX_OPERATOR = is_sqlite_db ? "REGEXP" : "~*".freeze

  validates :title, presence: true, length: { maximum: 250 }
  belongs_to :user
  has_many :questions, dependent: :destroy

  def self.set_slug(title)
    title_slug = title.parameterize
    regex_pattern = "slug #{Quiz::DB_REGEX_OPERATOR} ?"
    latest_quiz_slug = Quiz.where(
      regex_pattern,
      "#{title_slug}$|#{title_slug}-[0-9]+$"
    ).order(slug: :desc).first&.slug
    slug_count = 0
    if latest_quiz_slug.present?
      slug_count = latest_quiz_slug.split("-").last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end
    slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
    slug_candidate
  end
end
