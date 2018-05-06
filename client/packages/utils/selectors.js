'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playersSelector = exports.ratingsSelector = exports.productsSelector = exports.catsSelector = exports.langSelector = exports.lookupSelector = exports.successSelector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require('ramda');

var _noRedux = require('no-redux');

var _ = require('.');

var isLoading = function isLoading(s) {
  return s.isLoading;
};
var lastAction = function lastAction(s) {
  return s.lastAction || '';
};
var error = function error(s) {
  return s.error;
};
var lookup = function lookup(s) {
  return s.lookup || {};
};
var form = function form(s) {
  return s.form || {};
};
var lang = function lang(s) {
  return s.lang || {};
};
var cats = function cats(s) {
  return s.cats || [];
};
var products = function products(s) {
  return s.products || [];
};
var players = function players(s) {
  return s.players || [];
};
var filter = function filter(s) {
  return s.filter || {};
};

var playerFilter = (0, _noRedux.createSelector)(form, function (f) {
  return (f.pf || '').toLowerCase();
});

var productFilter = (0, _noRedux.createSelector)(filter, function (f) {
  return f.product || '';
});

var success = function success(a) {
  return function (list, filter) {
    return (0, _noRedux.createSelector)(isLoading, lastAction, error, function (il, la, e) {
      return !il && la.toLowerCase() === a + 'set' && !e;
    });
  };
};

var sortedList = function sortedList(list, filter) {
  return (0, _noRedux.createSelector)(list, filter, function (l, f) {
    var sort = f.sort;
    if (!sort || sort.length < 2) return l;

    var by = (0, _ramda.prop)(sort[0]);
    return (0, _ramda.sortWith)([sort[1] === 2 ? (0, _ramda.descend)(by) : (0, _ramda.ascend)(by)], l);
  });
};

var catsDD = (0, _noRedux.createSelector)(cats, function (cs) {
  return cs.map(function (c) {
    return _extends({}, c, { text: c.name, value: c.id,
      subs: (c.subs || []).map(function (s) {
        return _extends({}, s, { text: s.name, value: s.id });
      }) });
  });
});

var productsWithCat = (0, _noRedux.createSelector)(products, cats, function (ps, cs) {
  return ps.map(function (p) {
    var c = (0, _.findById)(p.cat)(cs);
    return _extends({}, p, { cat_name: c && c.name, cat1_name: (0, _.getNameById)(p.cat1)(c && c.subs) });
  });
});

var filteredProducts = (0, _noRedux.createSelector)(productsWithCat, productFilter, function (ps, f) {
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

var filteredPlayers = (0, _noRedux.createSelector)(players, playerFilter, function (ps, f) {
  return (0, _ramda.sortWith)([(0, _ramda.descend)((0, _ramda.prop)('rating'))])(ps.filter(function (p) {
    return (p.firstName + ' ' + p.lastName).toLowerCase().indexOf(f) > -1;
  }));
});

var successSelector = exports.successSelector = function successSelector(a) {
  return (0, _noRedux.mapStateWithSelectors)({ success: success(a) });
};
var lookupSelector = exports.lookupSelector = (0, _noRedux.mapStateWithSelectors)({ lookup: lookup, lang: lang });
var langSelector = exports.langSelector = (0, _noRedux.mapStateWithSelectors)({ lang: lang });
var catsSelector = exports.catsSelector = (0, _noRedux.mapStateWithSelectors)({ cats: cats, form: form, lang: lang });
var productsSelector = exports.productsSelector = (0, _noRedux.mapStateWithSelectors)({ products: filteredProducts, productFilter: productFilter, lookup: lookup, form: form, lang: lang, cats: catsDD });
var ratingsSelector = exports.ratingsSelector = (0, _noRedux.mapStateWithSelectors)({ cats: cats, form: form, lang: lang });
var playersSelector = exports.playersSelector = (0, _noRedux.mapStateWithSelectors)({ players: filteredPlayers, lookup: lookup });