'use strict';

/**
 * getuser service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::getuser.getuser');
