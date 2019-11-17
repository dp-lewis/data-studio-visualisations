const fs = require('fs');
const _ = require('lodash');
const defaultConfig = require('../manifest/default.json');
const stagingConfig = require('../manifest/staging.json');
const productionConfig = require('../manifest/production.json');
const environment = process.env.NODE_ENV || 'production';
let outputConfig = {};

if (environment === 'production') {
  outputConfig = _.merge(defaultConfig, productionConfig);
} else {
  outputConfig = _.merge(defaultConfig, stagingConfig);
}

fs.writeFileSync('./build/manifest.json', JSON.stringify(outputConfig, null, 2));