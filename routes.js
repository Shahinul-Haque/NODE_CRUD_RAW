const { sampleHandlers } = require('./hanlders/sampleHandler');
const { userHandler } = require('./hanlders/userHandler');


const routes= {
    sample : sampleHandlers,
    user : userHandler,
};

module.exports = routes
