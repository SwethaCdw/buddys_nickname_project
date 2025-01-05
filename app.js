require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const cors = require('cors');  

const PORT = process.env.PORT || 3003;

const app = express();
const BUDDIES_FILE = path.join(__dirname, 'cdw_ace23_buddies.json');

const logger = winston.createLogger({
    level: process.env.LOGGER_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' })
    ]
});

// Middleware
app.use(bodyParser.json());
app.use(cors());    

// Ensure `cdw_ace23_buddies.json` exists
if (!fs.existsSync(BUDDIES_FILE)) {
    fs.writeFileSync(BUDDIES_FILE, JSON.stringify([]));
    logger.info('Initialized cdw_ace23_buddies.json with an empty array.');
}

// Routes
const buddyRoutes = require('./routes/buddyRoutes');
app.use('/api/buddies', buddyRoutes);

// Start Server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
