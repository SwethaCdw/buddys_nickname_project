 // Checks if it's a valid date
const isValidDate = (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
};

module.exports = isValidDate;