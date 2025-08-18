# frozen_string_literal: true

module SlugGenerator
  extend ActiveSupport::Concern

  class_methods do
    def generate_unique_slug_for(title)
      base_slug = title.to_s.parameterize
      candidate_slug = base_slug
      counter = 2
      while where(slug: candidate_slug).exists?
        candidate_slug = "#{base_slug}-#{counter}"
        counter += 1
      end
      candidate_slug
    end
  end
end
