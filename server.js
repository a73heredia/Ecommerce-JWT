import http from 'http';
import app from './app.js';

import dotenv from 'dotenv';

dotenv.config();
const server = http.createServer(app);
const PORT = process.env.NODE_PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});