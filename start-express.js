// Start Express.js server on port 8000
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Express.js server...');

const expressProcess = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'express_server'),
    env: { ...process.env, PORT: 8000 },
    stdio: 'inherit'
});

expressProcess.on('error', (error) => {
    console.error('Failed to start Express server:', error);
});

expressProcess.on('close', (code) => {
    console.log(`Express server exited with code ${code}`);
});

// Keep the process alive
process.on('SIGINT', () => {
    console.log('Shutting down Express server...');
    expressProcess.kill();
    process.exit();
});