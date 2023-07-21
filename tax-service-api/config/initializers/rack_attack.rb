class Rack::Attack
    throttle('api/refresh', limit: 5, period: 60.seconds) do |req|
      req.ip if req.path == '/api/refresh' && req.post?
    end
end