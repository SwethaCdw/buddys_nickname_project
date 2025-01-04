const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/fileOperations');
const BUDDIES_FILE = path.join(__dirname, '../cdw_ace23_buddies.json');
const Buddy = require('../models/buddyModels');
const { BUDDY_PROJECT_CONSTANTS  } = require('../constants/app-constants');

// Get all buddies
const getAllBuddies = async (req, res) => {
    const buddies = await readJsonFile(BUDDIES_FILE);
    res.json(buddies);
};

// Get a single buddy by employeeId or realName
const getBuddy = async (req, res) => {
    const { key } = req.params;
    const buddies = await readJsonFile(BUDDIES_FILE);
    const singleBuddy = buddies.find(buddy => buddy.employeeId === key || buddy.realName === key);
    if (singleBuddy) res.json(singleBuddy);
    else res.status(404).json({ error: BUDDY_PROJECT_CONSTANTS.ERRORS.BUDDY_NOT_FOUND });
};

// Add a new buddy
const addBuddy = async (req, res) => {
    const { employeeId, realName, nickName, dob, hobbies } = req.body;
    if (!employeeId || !realName || !nickName || !dob || !hobbies) {
        return res.status(400).json({ error: BUDDY_PROJECT_CONSTANTS.ERRORS.ALL_FIELDS_REQUIRED });
    }

    const newBuddy = new Buddy(employeeId, realName, nickName, dob, hobbies);
    const buddies = await readJsonFile(BUDDIES_FILE);
    buddies.push(newBuddy);
    await writeJsonFile(BUDDIES_FILE, buddies);
    res.status(201).json({ message: BUDDY_PROJECT_CONSTANTS.SUCCESS_MESSAGE.ADDED_BUDDY });
};

// Update a buddy
const updateBuddy = async (req, res) => {
    const { employeeId } = req.params;
    const updatedData = req.body;
    const buddies = await readJsonFile(BUDDIES_FILE);
    const index = buddies.findIndex(buddy => buddy.employeeId === employeeId);
    if (index !== -1) {
        buddies[index] = { ...buddies[index], ...updatedData };
        await writeJsonFile(BUDDIES_FILE, buddies);
        res.json({ message: BUDDY_PROJECT_CONSTANTS.SUCCESS_MESSAGE.UPDATED_BUDDY });
    } else {
        res.status(404).json({ error: BUDDY_PROJECT_CONSTANTS.ERRORS.BUDDY_NOT_FOUND });
    }
};

// Delete a buddy
const deleteBuddy = async (req, res) => {
    const { employeeId } = req.params;
    const buddies = await readJsonFile(BUDDIES_FILE);
    const filteredBuddies = buddies.filter(buddy => buddy.employeeId !== employeeId);
    if (filteredBuddies.length !== buddies.length) {
        await writeJsonFile(BUDDIES_FILE, filteredBuddies);
        res.json({ message: BUDDY_PROJECT_CONSTANTS.SUCCESS_MESSAGE.DELETED_BUDDY });
    } else {
        res.status(404).json({ error: BUDDY_PROJECT_CONSTANTS.ERRORS.BUDDY_NOT_FOUND });
    }
};

module.exports = { getAllBuddies, getBuddy, addBuddy, updateBuddy, deleteBuddy };
