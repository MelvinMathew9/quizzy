# frozen_string_literal: true

module SlugGenerator
  extend ActiveSupport::Concern

  class_methods do
    def generate_unique_slug_for(title)
      base_slug = title.to_s.parameterize
      regex = /\A#{Regexp.escape(base_slug)}(?:-(\d+))?\z/

      matching_slugs = where("slug LIKE ?", "#{base_slug}%").pluck(:slug)
      max_suffix = matching_slugs.map { |s| s[regex, 1].to_i }.max || 0

      max_suffix.zero? ? base_slug : "#{base_slug}-#{max_suffix + 1}"
    end
  end
end
