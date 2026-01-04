const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const PORT = process.env.WEBHOOK_PORT || 9000;
const SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'your-secret-key';
const DEPLOY_SCRIPT = process.env.DEPLOY_SCRIPT || './deploy.sh';

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const signature = req.headers['x-hub-signature-256'];
            
            if (!signature) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing signature' }));
                return;
            }

            // Verify signature
            const hmac = crypto.createHmac('sha256', SECRET);
            const digest = 'sha256=' + hmac.update(body).digest('hex');

            if (signature !== digest) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid signature' }));
                return;
            }

            try {
                const payload = JSON.parse(body);
                
                // Only deploy on push to main branch
                if (payload.ref === 'refs/heads/main') {
                    console.log('Deploying...');
                    
                    exec(`bash ${DEPLOY_SCRIPT}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Deployment error: ${error}`);
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Deployment failed', details: error.message }));
                            return;
                        }
                        
                        console.log(stdout);
                        if (stderr) console.error(stderr);
                        
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Deployment successful', output: stdout }));
                    });
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Not main branch, skipping deployment' }));
                }
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid payload', details: error.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Webhook server listening on port ${PORT}`);
});

