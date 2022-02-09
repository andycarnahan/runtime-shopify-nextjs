"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ShopifyAppBridgeProvider;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _appBridgeReact = require("@shopify/app-bridge-react");

var _useHost = _interopRequireDefault(require("../hooks/useHost"));

var _useShopOrigin = _interopRequireDefault(require("../hooks/useShopOrigin"));

var _merge = _interopRequireDefault(require("lodash/merge"));

/**
 * Wrap the Shopify AppBridge instantiation, if the host or shopOrigin isn't available, then start the OAuth process
 *
 * @param {*} props
 * @returns Component
 */
function ShopifyAppBridgeProvider(props, apiKey) {
  console.log("key: ".concat(JSON.stringify(apiKey)));
  var children = props.children,
      Component = props.Component,
      pageProps = props.pageProps,
      appBridgeConfig = props.appBridgeConfig;
  var shopOrigin = (0, _useShopOrigin["default"])();
  var host = (0, _useHost["default"])();

  if (typeof window == "undefined" || !window.location || !shopOrigin || !host) {
    return /*#__PURE__*/_react["default"].createElement(Component, pageProps);
  }

  var config = (0, _merge["default"])({}, {
    apiKey: apiKey.apiKey,
    forceRedirect: true,
    host: host
  }, appBridgeConfig);
  return /*#__PURE__*/_react["default"].createElement(_appBridgeReact.Provider, {
    config: config
  }, children);
}

ShopifyAppBridgeProvider.getInitialProps = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var apiKey;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          apiKey = '34bca23626cd08ecb0533c2a93952058';
          return _context.abrupt("return", {
            apiKey: apiKey
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));