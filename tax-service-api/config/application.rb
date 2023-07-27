require_relative "boot"
require "rails/all"
Bundler.require(*Rails.groups)

module TaxServiceApi
  class Application < Rails::Application
    config.load_defaults 7.0

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    config.middleware.use Rack::Attack

    config.api_only = true
  end
end
