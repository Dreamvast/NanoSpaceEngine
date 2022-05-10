const delay = require('delay');
const mongoose = require('mongoose');
const { MONGO_URI } = require('../plugins/config.js');
const logger = require('../plugins/logger')

module.exports = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await delay(4000);
        logger.info('Database Connected Successfully');
    } catch (error) {
        console.log(error);
    }
} 