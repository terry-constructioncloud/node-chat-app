const moment = require('moment');
const generateMessage = (from, text) => {
    return {
        from, text, createdAt: moment().format('YYYY-MM-DD h:mm:ss')
    };
};

const generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().format('YYYY-MM-DD h:mm:ss')
    };
};

module.exports = {generateMessage, generateLocationMessage};