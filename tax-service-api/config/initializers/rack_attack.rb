class Rack::Attack
    Rack::Attack.throttle('req/ip', limit: 5, period: 2.minutes) do |req|
      req.ip if req.path == '/api/sessions/refresh' && req.post?
    end
end
  