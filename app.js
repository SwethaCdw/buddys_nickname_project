require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const cors = require('cors');  
const { BUDDY_PROJECT_CONSTANTS } = require('./constants/app-constants');

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
    logger.info(BUDDY_PROJECT_CONSTANTS.LOGGER_MESSAGE.INITIALIZED_ARRAY);
}

// Routes
const buddyRoutes = require('./routes/buddyRoutes');
app.use('/api/buddies', buddyRoutes);

// Start Server
app.listen(PORT, () => {
    logger.info(`${BUDDY_PROJECT_CONSTANTS.LOGGER_MESSAGE.SERVER_RUNNING_ON}${PORT}`);
});
