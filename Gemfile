source 'https://rubygems.org'

ruby '3.0.2'

gem 'rails', '~> 6.1.4', '>= 6.1.4.1'

# friends of Rails
gem 'sass-rails', '>= 6'

# Wraps webpack in a Ruby gem and provides helpers to use the output from Webpacker in the Rails application
gem 'webpacker', '~> 5.0'

# database
gem 'sqlite3', '~> 1.4'

# Application server
gem 'puma', '~> 5.0'

# JSON builder
gem 'jbuilder', '~> 2.7'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code
  gem 'web-console', '>= 4.1.0'

  # Reenable after https://github.com/rails/rails/issues/26158 is fixed
  gem 'listen', '~> 3.3'

  # speeds up development by keeping your application running in the background
  gem "spring"
end

group :test do
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
