'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productsSelector = exports.lookupSelector = undefined;

var _ramda = require('ramda');

var _noRedux = require('no-redux');

var lookup = function lookup(s) {
  return s.lookup || {};
};
var products = function products(s) {
  return s.products || [];
};
var productFilter = function productFilter(s) {
  return s.productFilter || {};
};

var filteredProducts = (0, _noRedux.createSelector)(products, productFilter, function (ps, f) {
  return (0, _ramda.reduce)(function (p, c) {
    return p.filter(c);
  }, ps, Object.keys(f).map(function (k) {
    if (k === 'cat') {
      if (f[k] === 1) return function (p) {
        return p;
      };
      if (f[k] === 2) return function (p) {
        return p.sale;
      };
    }
    return function (p) {
      return p[k] === f[k];
    };
  }));
});

var lookupSelector = exports.lookupSelector = (0, _noRedux.mapStateWithSelectors)({ lookup: lookup });
var productsSelector = exports.productsSelector = (0, _noRedux.mapStateWithSelectors)({ products: filteredProducts, productFilter: productFilter, lookup: lookup });