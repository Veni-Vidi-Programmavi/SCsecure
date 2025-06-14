# Dual HTTP Server Implementation

This project provides equivalent HTTP server implementations using both Flask (Python) and Express.js (Node.js) with a web-based testing interface.

## Features

- **Dual Server Architecture**: Complete implementations in both Flask and Express.js
- **RESTful API Endpoints**: GET and POST endpoints with JSON handling
- **Request Logging**: Comprehensive logging for debugging and monitoring
- **Error Handling**: Proper HTTP status codes and error responses
- **CORS Support**: Cross-origin request handling
- **Web Testing Interface**: Interactive HTML interface to test both servers

## Server Endpoints

Both servers implement the following endpoints:

- `GET /` - Server information and available endpoints
- `GET /health` - Health check endpoint
- `GET /api/data` - Retrieve sample data
- `POST /api/data` - Create new data (requires JSON body)
- `GET /api/echo` - Echo query parameters
- `POST /api/echo` - Echo request body

## Quick Start

### Flask Server (Python)

1. Navigate to the flask_server directory:
   ```bash
   cd flask_server
   ```

2. Run the Flask server:
   ```bash
   python main.py
   