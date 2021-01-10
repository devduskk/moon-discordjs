const client = require('./src/structures/Moon');
const config = require('./config.json');

const block = new client(config);
block.start();
