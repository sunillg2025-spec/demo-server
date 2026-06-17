const knex = require('knex');
const path = require('path');
const fs = require('fs');

const isVercel = process.env.VERCEL === '1';

const localDbPath = path.join(__dirname, '..', 'database', 'vehicle.db');
const vercelDbPath = path.join('/tmp', 'vehicle.db');

const dbPath = isVercel ? vercelDbPath: localDbPath;

if (isVercel && !fs.existsSync(vercelDbPath) && fs.existsSync(localDbPath)) {
    fs.copyFileSync(localDbPath, vercelDbPath);
}

if (!isVercel && !fs.existsSync(localDbPath)) {
    console.error("Error: Local database file not found:", localDbPath);
    process.exit(1);
}

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
});

module.exports = db;