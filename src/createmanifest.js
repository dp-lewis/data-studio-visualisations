const fs = require('fs');
const defaultConfig = require('../manifest/default.json');
const stagingConfig = require('../manifest/staging.json');
const productionConfig = require('../manifest/production.json');
const environment = process.env.NODE_ENV || 'production';
let outputConfig = {};
if (environment === 'production') {
  outputConfig = Object.assign(defaultConfig, productionConfig);
} else {
  outputConfig = Object.assign(defaultConfig, stagingConfig);  
}

fs.writeFileSync('./build/manifest.json', JSON.stringify(outputConfig, null, 2));