// Server status tracking
const serverStatus = {
    flask: 'unknown',
    express: 'unknown'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check server status on load
    checkServerStatus('flask');
    checkServerStatus('express');
    
    // Add event listeners for method changes
    document.getElementById('flask-method').addEventListener('change', function() {
        toggleJsonInput('flask', this.value);
    });
    
    document.getElementById('express-method').addEventListener('change', function() {
        toggleJsonInput('express', this.value);
    });
    
    // Auto-check server status every 30 seconds
    setInterval(() => {
        checkServerStatus('flask');
        checkServerStatus('express');
    }, 30000);
});

// Toggle JSON input visibility based on method
function toggleJsonInput(server, method) {
    const jsonInput = document.getElementById(`${server}-json-input`);
    if (method === 'POST') {
        jsonInput.style.display = 'block';
    } else {
        jsonInput.style.display = 'none';
    }
}

// Check server status
async function checkServerStatus(server) {
    const url = document.getElementById(`${server}-url`).value;
    const statusIndicator = document.getElementById(`${server}-status`);
    
    try {
        const response = await fetch(`${url}/health`, {
            method: 'GET',
            timeout: 5000
        });
        
        if (response.ok) {
            serverStatus[server] = 'online';
            statusIndicator.className = 'status-indicator status-online';
            statusIndicator.title = 'Server is online';
        } else {
            serverStatus[server] = 'offline';
            statusIndicator.className = 'status-indicator status-offline';
            statusIndicator.title = 'Server returned an error';
        }
    } catch (error) {
        serverStatus[server] = 'offline';
        statusIndicator.className = 'status-indicator status-offline';
        statusIndicator.title = 'Server is offline or unreachable';
    }
}

// Test a specific endpoint
async function testEndpoint(server, endpoint, method = 'GET') {
    const url = document.getElementById(`${server}-url`).value;
    const responseElement = document.getElementById(`${server}-response`);
    
    try {
        responseElement.textContent = 'Loading...';
        
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        const response = await fetch(`${url}${endpoint}`, options);
        const data = await response.json();
        
        const formattedResponse = {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            data: data
        };
        
        responseElement.textContent = JSON.stringify(formattedResponse, null, 2);
        responseElement.className = response.ok ? 'bg-dark p-3 rounded text-success' : 'bg-dark p-3 rounded text-danger';
        
    } catch (error) {
        const errorResponse = {
            error: 'Request failed',
            message: error.message,
            timestamp: new Date().toISOString()
        };
        
        responseElement.textContent = JSON.stringify(errorResponse, null, 2);
        responseElement.className = 'bg-dark p-3 rounded text-danger';
    }
}

// Test POST endpoint with sample data
async function testPostData(server) {
    const url = document.getElementById(`${server}-url`).value;
    const responseElement = document.getElementById(`${server}-response`);
    
    const sampleData = {
        name: 'Test Item',
        description: 'This is a test item created from the web interface',
        category: 'Testing',
        tags: ['test', 'api', server],
        timestamp: new Date().toISOString()
    };
    
    try {
        responseElement.textContent = 'Loading...';
        
        const response = await fetch(`${url}/api/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sampleData)
        });
        
        const data = await response.json();
        
        const formattedResponse = {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            data: data
        };
        
        responseElement.textContent = JSON.stringify(formattedResponse, null, 2);
        responseElement.className = response.ok ? 'bg-dark p-3 rounded text-success' : 'bg-dark p-3 rounded text-danger';
        
    } catch (error) {
        const errorResponse = {
            error: 'Request failed',
            message: error.message,
            timestamp: new Date().toISOString()
        };
        
        responseElement.textContent = JSON.stringify(errorResponse, null, 2);
        responseElement.className = 'bg-dark p-3 rounded text-danger';
    }
}

// Test custom endpoint
async function testCustomEndpoint(server) {
    const url = document.getElementById(`${server}-url`).value;
    const method = document.getElementById(`${server}-method`).value;
    const endpoint = document.getElementById(`${server}-endpoint`).value;
    const jsonBody = document.getElementById(`${server}-json`).value;
    const responseElement = document.getElementById(`${server}-response`);
    
    if (!endpoint) {
        responseElement.textContent = 'Please enter an endpoint path';
        responseElement.className = 'bg-dark p-3 rounded text-warning';
        return;
    }
    
    try {
        responseElement.textContent = 'Loading...';
        
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if (method === 'POST' && jsonBody.trim()) {
            try {
                options.body = JSON.stringify(JSON.parse(jsonBody));
            } catch (parseError) {
                responseElement.textContent = `Invalid JSON: ${parseError.message}`;
                responseElement.className = 'bg-dark p-3 rounded text-danger';
                return;
            }
        }
        
        const response = await fetch(`${url}${endpoint}`, options);
        const data = await response.json();
        
        const formattedResponse = {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            data: data
        };
        
        responseElement.textContent = JSON.stringify(formattedResponse, null, 2);
        responseElement.className = response.ok ? 'bg-dark p-3 rounded text-success' : 'bg-dark p-3 rounded text-danger';
        
    } catch (error) {
        const errorResponse = {
            error: 'Request failed',
            message: error.message,
            timestamp: new Date().toISOString()
        };
        
        responseElement.textContent = JSON.stringify(errorResponse, null, 2);
        responseElement.className = 'bg-dark p-3 rounded text-danger';
    }
}

// Utility function to format JSON
function formatJSON(obj) {
    return JSON.stringify(obj, null, 2);
}

// Utility function to copy response to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Could add a toast notification here
        console.log('Copied to clipboard');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}
