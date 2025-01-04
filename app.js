const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3003;
const BUDDIES_FILE = path.join(__dirname, 'cdw_ace23_buddies.json');

// Middleware
app.use(bodyParser.json());

// Ensure `cdw_ace23_buddies.json` exists
if (!fs.existsSync(BUDDIES_FILE)) {
    fs.writeFileSync(BUDDIES_FILE, JSON.stringify([]));
    console.log('Initialized cdw_ace23_buddies.json with an empty array.');
}

// Routes
const buddyRoutes = require('./routes/buddyRoutes');
app.use('/api/buddies', buddyRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
