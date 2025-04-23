# Rate Limiter

A simple and efficient rate limiting service built with Node.js and TypeScript that helps protect your APIs from excessive use.

## Features

- In-memory rate limiting implementation
- Configurable request limits and time windows
- Easy-to-use REST API endpoint
- No external dependencies (like Redis) required

## Installation

```bash
npm install
```

## Configuration
The rate limiter is configured with the following default values:

- Rate limit: 3 requests per window
- Time window: 60 seconds
These values can be modified in src/services/rateLimiter.ts .

## API Usage
### Check Rate Limit
Endpoint: POST /rate-limit/check

Request Body: ```json
{
    "identifier": "user123",
    "resource": "/api/test"
}```
Success Response (200 OK - Allowed): ```json
{
    "allowed": true,
    "remaining": 2,
    "limit": 3,
    "windowSeconds": 60
}```

Rate Limit Exceeded Response (429 Too Many Requests):

```json
{
    "allowed": false,
    "retryAfterSeconds": 45
}
```

## Running the Application
Start the server:
```bash
npm start
```
The server will run on http://localhost:3000

## Testing
You can test the API using Postman:

1. Create a new POST request to http://localhost:3000/rate-limit/check
2. Set header Content-Type: application/json
3. Add the request body as shown in the API Usage section
4. Send multiple requests to see the rate limiting in action

## Project Structure
rate-limiter/
├── src/
│   ├── server.ts           # Express server setup
│   ├── utils/
│   │   └── memoryStore.ts  # In-memory storage implementation
│   ├── services/
│   │   └── rateLimiter.ts  # Rate limiting logic
│   └── routes/
│       └── rateLimiterRouter.ts # API endpoint handling

## Lisence
ISC