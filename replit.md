# Dual HTTP Server Implementation

## Overview

This project implements equivalent HTTP server functionality using both Flask (Python) and Express.js (Node.js), providing a comprehensive demonstration of dual-language server architecture. The system includes a web-based testing interface for interactive testing of both server implementations.

## System Architecture

### Multi-Language Server Architecture
- **Flask Server (Python)**: Primary HTTP server running on port 5000
- **Express.js Server (Node.js)**: Secondary HTTP server running on port 8000
- **Static Web Interface**: HTML/JavaScript testing interface served from the Flask server
- **Deployment**: Gunicorn WSGI server for production deployment

### Technology Stack
- **Backend**: Flask 3.1.1 (Python), Express.js 5.1.0 (Node.js)
- **Database**: PostgreSQL support configured (via psycopg2-binary)
- **Web Server**: Gunicorn for production deployment
- **Frontend**: Vanilla HTML/JavaScript with Bootstrap 5 dark theme
- **Cross-Origin Support**: CORS enabled on both servers

## Key Components

### Flask Server (`flask_server/`)
- **Main Application**: `app.py` - Core Flask application with middleware and routes
- **Entry Point**: `main.py` - Development server launcher
- **Features**:
  - Comprehensive request logging
  - Error handling with proper HTTP status codes
  - CORS support for cross-origin requests
  - JSON request/response handling

### Express.js Server (`express_server/`)
- **Main Server**: `server.js` - Complete Express.js implementation
- **Features**:
  - Middleware stack for JSON parsing and CORS
  - Request logging and error handling
  - Equivalent API endpoints to Flask server

### Web Testing Interface (`static/`)
- **Frontend**: `index.html` - Interactive testing interface
- **JavaScript**: `script.js` - Client-side logic for server testing
- **Features**:
  - Server status monitoring
  - Interactive API endpoint testing
  - Real-time response display

### API Endpoints (Both Servers)
- `GET /` - Server information and status
- `GET /health` - Health check endpoint
- `GET /api/data` - Retrieve sample data
- `POST /api/data` - Create new data (JSON body required)
- `GET /api/echo` - Echo query parameters
- `POST /api/echo` - Echo request body

## Data Flow

1. **Client Request**: Web interface or external client sends HTTP request
2. **Server Processing**: Either Flask or Express.js server processes the request
3. **Middleware**: Request logging and CORS handling
4. **Route Handling**: Appropriate endpoint handler processes the request
5. **Response**: JSON response returned to client
6. **Logging**: Request/response details logged for monitoring

## External Dependencies

### Python Dependencies
- **Flask**: Web framework for HTTP server
- **Flask-SQLAlchemy**: Database ORM support
- **Gunicorn**: WSGI HTTP server for production
- **psycopg2-binary**: PostgreSQL database adapter
- **email-validator**: Email validation utilities

### Node.js Dependencies
- **Express.js**: Web framework for HTTP server
- **CORS**: Cross-origin resource sharing middleware

### Frontend Dependencies
- **Bootstrap 5**: UI framework with dark theme
- **Font Awesome**: Icon library for UI elements

## Deployment Strategy

### Production Configuration
- **Server**: Gunicorn WSGI server
- **Binding**: 0.0.0.0:5000 for external access
- **Deployment Target**: Autoscale deployment on Replit
- **Process Management**: Gunicorn with reload capability

### Development Configuration
- **Flask**: Debug mode enabled for development
- **Express.js**: Development server with automatic restart
- **Environment**: Dual runtime support (Python 3.11 + Node.js 20)

### Infrastructure
- **Platform**: Replit with Nix package management
- **Runtime**: Python 3.11 and Node.js 20 modules
- **System Packages**: OpenSSL and PostgreSQL

## Changelog

- June 14, 2025: Initial dual HTTP server setup completed
  - Flask server operational on port 5000 with web interface
  - Express.js server operational on port 8000 with identical API endpoints
  - Both servers accessible online via Replit public URLs
  - Cross-origin support enabled for web testing interface

## User Preferences

Preferred communication style: Simple, everyday language.