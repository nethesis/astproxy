/**
 * @module astproxy
 * @submodule plugins_event_13
 */
 var AST_TRUNK_REG_2_STR_ADAPTER = require('../proxy_logic_13/trunk_reg_adapter_13.js').AST_TRUNK_REG_2_STR_ADAPTER;

/**
 * The module identifier used by the logger.
 *
 * @property IDLOG
 * @type string
 * @private
 * @final
 * @readOnly
 * @default [registry]
 */
var IDLOG = '[registry]';

/**
 * The asterisk proxy.
 *
 * @property astProxy
 * @type object
 * @private
 */
var astProxy;

(function() {

  /**
   * The logger. It must have at least three methods: _info, warn and error._
   *
   * @property logger
   * @type object
   * @private
   * @default console
   */
  var logger = console;

  try {

    /**
     * The plugin that handles the registry event.
     *
     * @class registry
     * @static
     */
    var registry = {
      /**
       * It's called from _astproxy_ component for each
       * Registry event received from the asterisk.
       *
       * @method data
       * @param {object} data The asterisk event data
       * @static
       */
      data: function(data) {
        try {

          if (data.username &&
            data.domain &&
            data.status &&
            data.event === 'Registry') {

            logger.info(IDLOG, 'received event ' + data.event);
            astProxy.proxyLogic.evtRegistryChanged(data, AST_TRUNK_REG_2_STR_ADAPTER[data.status.toLowerCase()]);

          } else {
            logger.warn(IDLOG, 'PeerStatus event not recognized');
          }

        } catch (err) {
          logger.error(IDLOG, err.stack);
        }
      },

      /**
       * Set the logger to be used.
       *
       * @method setLogger
       * @param {object} log The logger object. It must have at least
       * three methods: _info, warn and error_
       * @static
       */
      setLogger: function(log) {
        try {
          if (typeof log === 'object' &&
            typeof log.info === 'function' &&
            typeof log.warn === 'function' &&
            typeof log.error === 'function') {

            logger = log;
          } else {
            throw new Error('wrong logger object');
          }
        } catch (err) {
          logger.error(IDLOG, err.stack);
        }
      },

      /**
       * Store the asterisk proxy to visit.
       *
       * @method visit
       * @param {object} ap The asterisk proxy module.
       */
      visit: function(ap) {
        try {
          // check parameter
          if (!ap || typeof ap !== 'object') {
            throw new Error('wrong parameter');
          }
          astProxy = ap;
        } catch (err) {
          logger.error(IDLOG, err.stack);
        }
      }
    };

    // public interface
    exports.data = registry.data;
    exports.visit = registry.visit;
    exports.setLogger = registry.setLogger;

  } catch (err) {
    logger.error(IDLOG, err.stack);
  }
})();
