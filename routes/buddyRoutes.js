const express = require('express');
const {
    getAllBuddies,
    getBuddy,
    addBuddy,
    updateBuddy,
    deleteBuddy,
} = require('../controllers/buddyController');

const router = express.Router();

router.get('/', getAllBuddies); // List all buddies
router.get('/:key', getBuddy); // List a buddy by employeeId or realName
router.post('/', addBuddy); // Add a new buddy
router.put('/:employeeId', updateBuddy); // Update a buddy
router.delete('/:employeeId', deleteBuddy); // Delete a buddy

module.exports = router;
