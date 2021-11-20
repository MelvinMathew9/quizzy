# frozen_string_literal: true

Sidekiq.configure_client do |config|
  Sidekiq::Status.configure_client_middleware config
  config.redis = { url: ENV["REDIS_URL"] }
end

Sidekiq.configure_server do |config|
  config.redis = { url: ENV["REDIS_URL"] }
  Sidekiq::Status.configure_server_middleware config
end
