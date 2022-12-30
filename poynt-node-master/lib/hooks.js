/**
 * @file Webhook APIs
 */

var qs = require('querystring');
var helpers = require('./helpers');

/**
 * Gets a list of hooks currently subscribed to.
 * @param {String} options.businessId
 */
module.exports.getHooks = function getHooks(options, next) {
  var hasErr = helpers.hasKeys(options, ['businessId']);
  if (hasErr) {
    return next(hasErr);
  }

  var query = helpers.getKeys(options, [
    'businessId'
  ]);

  this.request({
    url: '/hooks?' + qs.stringify(query),
    method: 'GET'
  }, next);
};

/**
 * Subscribes to a webhook.
 * @param {String} options.eventType
 * @param {String[]} options.eventTypes
 * @param {String} options.businessId
 * @param {String} options.deliveryUrl
 * @param {String} options.secret
 */
module.exports.createHook = function createHook(options, next) {
  if (options.eventType) {
    options.eventType = options.eventTypes || [];
    if (!options.eventTypes) {
      options.eventTypes = [];
    }
    options.eventTypes.push(options.eventType);
  }

  var hasErr = helpers.hasKeys(options, ['eventTypes', 'businessId', 'deliveryUrl', 'secret']);
  if (hasErr) {
    return next(hasErr);
  }

  this.request({
    url: '/hooks/',
    method: 'POST',
    body: {
      applicationId: this._applicationId,
      businessId: options.businessId,
      deliveryUrl: options.deliveryUrl,
      secret: options.secret,
      eventTypes: options.eventTypes
    }
  }, next);
};

/**
 * Gets a hook by ID.
 * @param {String} options.hookId
 */
module.exports.getHook = function getHook(options, next) {
  var hasErr = helpers.hasKeys(options, ['hookId']);
  if (hasErr) {
    return next(hasErr);
  }

  this.request({
    url: '/hooks/' + encodeURIComponent(options.hookId),
    method: 'GET'
  }, next);
};

/**
 * Deletes a hook.
 * @param {String} options.hookId
 */
module.exports.deleteHook = function deleteHook(options, next) {
  var hasErr = helpers.hasKeys(options, ['hookId']);
  if (hasErr) {
    return next(hasErr);
  }

  this.request({
    url: '/hooks/' + encodeURIComponent(options.hookId),
    method: 'DELETE'
  }, next);
};
