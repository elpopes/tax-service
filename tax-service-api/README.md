# README

# Tax Service Application

The Tax Service Application is a full-stack application designed to facilitate communication and document sharing between clients and tax professionals.

## Technologies

- Backend: Ruby on Rails, PostgreSQL
- Frontend: React.js
- File Storage: AWS S3
- Real-time Updates: Node.js, Express.js, Socket.IO
- Caching: Redis
- Full Text Search: Elasticsearch
- Mailing: Sendgrid/Mailgun/Twilio
- SMS Notifications: Twilio

## Dependencies

- Ruby
- Rails
- Node.js
- PostgreSQL
- AWS SDK
- BCrypt for password hashing
- Devise for authentication
- Pundit for authorization
- Sidekiq for background jobs
- Redis
- Elasticsearch

## Features

- User registration and authentication
- Profile management for clients and tax professionals
- Household creation and management
- Document uploading, viewing, and downloading
- Task assignment and tracking
- Communication via comments
- Notification via Email and SMS
- Encryption for secure data transfer

## Local Setup

To get started, you'll need to have Ruby, Rails, Node.js, PostgreSQL, Redis, and Elasticsearch installed on your machine.

1. **Clone the repository:**

```sh
git clone https://github.com/username/tax-service.git
cd tax-service
```

2. **Setup the Rails API:**

```
cd tax-service-api
bundle install
rails db:create db:migrate
rails s
```

3. **Setup the React Client:**

In a new terminial windor, navigate to the client folder and install dependencies:

```
cd ../tax-service-client
npm install
npm start
```

4. **Setup the Node.js server:**

In another new terminal window, navigate to the bode server folder and install dependencies:

```
cd ../tax-service-node
npm install
npm start
```

Now you should be able to run the app locally.
