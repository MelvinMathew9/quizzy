# frozen_string_literal: true

module Mixins
  module Callable
    def self.included(base)
      base.extend(ClassMethods)
    end

    module ClassMethods
      def call(*args, **named_args, &block)
        new.call(*args, **named_args, &block)
      end
    end
  end
end
