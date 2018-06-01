'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameEditSelector = exports.gamesSelector = exports.scheduleEditSelector = exports.teamSelector = exports.standingSelector = exports.scheduleSelector = exports.historySelector = exports.tourSelector = exports.tournamentSelector = exports.tournamentsSelector = exports.playersSelector = exports.ratingsSelector = exports.productsSelector = exports.catsSelector = exports.langSelector = exports.lookupSelector = exports.successSelector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require('ramda');

var _noRedux = require('no-redux');

var _ = require('.');

var _zlib = require('zlib');

var _form = function _form(s) {
  return s.form || {};
};
var _filter = function _filter(s) {
  return s.filter || {};
};

var form = function form(p) {
  return function (s) {
    return _form(s)[p] || {};
  };
};
var filter = function filter(p) {
  return function (s) {
    return _filter(s)[p] || {};
  };
};

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
var tournaments = function tournaments(s) {
  return s.tournaments || [];
};
var _tournament = function _tournament(s) {
  return s.tournament || {};
};
var history = function history(s) {
  return s.history || [];
};

var success = function success(a) {
  return (0, _noRedux.createSelector)(isLoading, lastAction, error, function (il, la, e) {
    return il || la.toLowerCase() !== 'set' + a ? null : !e;
  });
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

var filteredProducts = (0, _noRedux.createSelector)(productsWithCat, filter('product'), function (ps, f) {
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

var playersWithNames = (0, _noRedux.createSelector)(players, function (ps) {
  return ps.map(function (p) {
    return _extends({}, p, { name: p.firstName + ' ' + p.lastName });
  }).map(function (p) {
    return _extends({}, p, { text: p.name, value: p.id });
  });
});

var filteredPlayers = (0, _noRedux.createSelector)(playersWithNames, form('player'), function (ps, f) {
  return (0, _ramda.sortWith)([(0, _ramda.descend)((0, _ramda.prop)('rating'))])(ps.filter(function (p) {
    return (0, _ramda.isEmpty)(f) || p.name.toLowerCase().indexOf(f) > -1;
  }));
});

var dsPlayers = (0, _noRedux.createSelector)(filteredPlayers, function (ps) {
  return (0, _ramda.sortWith)([(0, _ramda.ascend)((0, _ramda.prop)('name'))])(ps.map(function (p) {
    return _extends({}, p, { text: p.name + ' (' + p.rating + ')', value: p.id });
  }));
});

var teams = (0, _noRedux.createSelector)(_tournament, function (t) {
  return t.teams || [];
});

var findGames = function findGames(s, m, gs) {
  return gs.filter(function (g) {
    return g.date == s.date && g.t1 == m.home && g.t2 == m.away;
  });
};
var gg = function gg(g, x) {
  return +(g && g[x] || 0);
};
var getResult = function getResult(g) {
  return g.result || (0, _ramda.range)(0, 5).filter(function (n) {
    return gg(g.g1, n) > gg(g.g2, n);
  }).length + ':' + (0, _ramda.range)(0, 5).filter(function (n) {
    return gg(g.g1, n) < gg(g.g2, n);
  }).length;
};
var isWin = function isWin(r) {
  return r[0] > r[2];
};
var isLose = function isLose(r) {
  return r[0] < r[2];
};

var tournament = (0, _noRedux.createSelector)(_tournament, playersWithNames, function (t, ps) {
  var teams = (t.teams || []).map(function (x) {
    return _extends({}, x, { text: x.name, value: x.id, players: x.players.map(function (p) {
        return _extends({}, (0, _.findById)(p.id)(ps), { initRating: p.rating });
      }) });
  });
  var schedules = (t.schedules || []).map(function (s) {
    return _extends({}, s, {
      date: (0, _.toDate)(s.date),
      matches: (0, _ramda.range)(1, 9).map(function (m) {
        return (0, _.findById)(m)(s.matches) || {};
      }).map(function (m) {
        return _extends({}, m, { result: (0, _ramda.toPairs)((0, _ramda.countBy)(isWin, findGames(s, m, t.games).map(getResult))).map(function (x) {
            return x[1];
          }).join(':') });
      })
    });
  });
  return teams.length > 0 ? _extends({}, t, { teams: teams, schedules: schedules }) : t;
});

var tournamentsWithYears = (0, _noRedux.createSelector)(tournaments, function (ts) {
  return (0, _ramda.sortWith)([(0, _ramda.descend)((0, _ramda.prop)('year')), (0, _ramda.ascend)((0, _ramda.prop)('name'))], ts.map(function (t) {
    return _extends({ year: +(0, _ramda.find)(function (x) {
        return !isNaN(+x);
      }, (0, _ramda.unnest)(t.name.split(' ').map(function (x) {
        return x.split('/');
      }))) }, t);
  }));
});

var games = (0, _noRedux.createSelector)(_tournament, function (t) {
  return t.games || [];
});

var gameDetail = function gameDetail(n, g) {
  var r1 = +g.result.split(':')[n];
  var r2 = 5 - r1;
  var g1 = (0, _ramda.range)(0, r1).map(function (x) {
    return 11;
  });
  var g2 = (0, _ramda.range)(0, r2).map(function (x) {
    return 0;
  });
  return r1 > 2 ? g1.concat(g2) : g2.concat(g1);
};

var gamesWithTeams = (0, _noRedux.createSelector)(teams, playersWithNames, games, function (ts, ps, gs) {
  return gs.map(function (g) {
    return _extends({}, g, {
      date: (0, _.toDate)(g.date),
      player1: ((0, _.findById)(g.p1)(ps) || {}).name,
      player2: ((0, _.findById)(g.p2)(ps) || {}).name,
      team1: (0, _ramda.find)(function (x) {
        return (0, _.findById)(g.p1)(x.players);
      }, ts),
      team2: (0, _ramda.find)(function (x) {
        return (0, _.findById)(g.p2)(x.players);
      }, ts),
      g1: g.g1 || gameDetail(0, g),
      g2: g.g2 || gameDetail(1, g)
    });
  }).map(function (g) {
    return _extends({}, g, { t1: (g.team1 || {}).id, t2: (g.team2 || {}).id, team1: (g.team1 || {}).name, team2: (g.team2 || {}).name });
  });
});

var redSpan = function redSpan(x) {
  return '<span class="red">' + x + '</span>';
};

var schedule = (0, _noRedux.createSelector)(gamesWithTeams, function (gs) {
  var ss = (0, _ramda.groupBy)(function (x) {
    return x.date;
  }, gs);
  return Object.keys(ss).sort().map(function (k) {
    var ms = (0, _ramda.groupBy)(function (x) {
      return (0, _ramda.join)('|', [x.team1.name, x.team2.name].sort());
    }, ss[k].filter(function (x) {
      return x.team1 && x.team2;
    }));
    return {
      date: (0, _.toDate)(k),
      matches: Object.keys(ms).map(function (m) {
        var ns = m.split('|');
        var n = ms[m].filter(function (x) {
          return x.team1.name === ns[0] && x.result[0] === '3' || x.team2.name === ns[0] && x.result[2] === '3';
        }).length;
        return {
          team1: ns[0],
          result: (n > 2 ? redSpan(n) : n) + ' - ' + (5 - n > 2 ? redSpan(5 - n) : 5 - n),
          team2: ns[1],
          team1Points: n,
          team2Points: 5 - n,
          winner: n > 2 ? ns[0] : ns[1],
          loser: n > 2 ? ns[1] : ns[0]
        };
      })
    };
  });
});

var getPoints = function getPoints(m, t, v) {
  return m[t] === v ? m[t + 'Points'] : 0;
};

var standing = (0, _noRedux.createSelector)(schedule, teams, function (s, ts) {
  return (0, _.addIndex)((0, _ramda.sortWith)([(0, _ramda.descend)((0, _ramda.prop)('points'))], ts.map(function (t) {
    return {
      team: t.name,
      w: (0, _ramda.sum)(s.map(function (w) {
        return w.matches.filter(function (m) {
          return m.winner === t.name;
        }).length;
      })),
      l: (0, _ramda.sum)(s.map(function (w) {
        return w.matches.filter(function (m) {
          return m.loser === t.name;
        }).length;
      })),
      points: (0, _ramda.sum)(s.map(function (w) {
        return (0, _ramda.sum)(w.matches.map(function (m) {
          return getPoints(m, 'team1', t.name) + getPoints(m, 'team2', t.name);
        }));
      }))
    };
  })), 'rank');
});

var historyTable = (0, _noRedux.createSelector)(history, playersWithNames, function (h, ps) {
  return (0, _ramda.sortWith)([(0, _ramda.descend)((0, _ramda.prop)('date'))], h.map(function (x) {
    return x.games;
  })).map(function (g) {
    return {
      id: g.id,
      date: (0, _.toDate)(g.date),
      player1: (0, _.getNameById)(g.p1)(ps) + ' (' + g.p1Rating + ' ' + ((g.p1Diff > 0 ? '+ ' : '- ') + Math.abs(g.p1Diff)) + ' = ' + (g.p1Rating + g.p1Diff) + ')',
      player2: (0, _.getNameById)(g.p2)(ps) + ' (' + g.p2Rating + ' ' + ((g.p2Diff > 0 ? '+ ' : '- ') + Math.abs(g.p2Diff)) + ' = ' + (g.p2Rating + g.p2Diff) + ')',
      result: g.result
    };
  });
});

var successSelector = exports.successSelector = function successSelector(a) {
  return (0, _noRedux.mapStateWithSelectors)({ success: success(a) });
};
var lookupSelector = exports.lookupSelector = (0, _noRedux.mapStateWithSelectors)({ lookup: lookup, lang: lang });
var langSelector = exports.langSelector = (0, _noRedux.mapStateWithSelectors)({ lang: lang });
var catsSelector = exports.catsSelector = (0, _noRedux.mapStateWithSelectors)({ cats: cats, cat: form('cat'), lang: lang });
var productsSelector = exports.productsSelector = (0, _noRedux.mapStateWithSelectors)({ products: filteredProducts, productFilter: filter('product'), lookup: lookup, lang: lang, product: form('product'), cats: catsDD });
var ratingsSelector = exports.ratingsSelector = (0, _noRedux.mapStateWithSelectors)({ cats: cats, form: form, lang: lang });
var playersSelector = exports.playersSelector = (0, _noRedux.mapStateWithSelectors)({ players: filteredPlayers, lookup: lookup });
var tournamentsSelector = exports.tournamentsSelector = (0, _noRedux.mapStateWithSelectors)({ tournaments: tournamentsWithYears, lookup: lookup });
var tournamentSelector = exports.tournamentSelector = (0, _noRedux.mapStateWithSelectors)({ tournament: tournament, lookup: lookup, players: filteredPlayers, gamesWithTeams: gamesWithTeams });
var tourSelector = exports.tourSelector = (0, _noRedux.mapStateWithSelectors)({ tournament: form('tournament'), tournaments: tournaments });
var historySelector = exports.historySelector = (0, _noRedux.mapStateWithSelectors)({ history: historyTable, lookup: lookup, players: playersWithNames });
var scheduleSelector = exports.scheduleSelector = (0, _noRedux.mapStateWithSelectors)({ schedule: schedule, tournament: tournament });
var standingSelector = exports.standingSelector = (0, _noRedux.mapStateWithSelectors)({ standing: standing, tournament: tournament });
var teamSelector = exports.teamSelector = (0, _noRedux.mapStateWithSelectors)({ tournament: tournament, team: form('team'), players: dsPlayers });
var scheduleEditSelector = exports.scheduleEditSelector = (0, _noRedux.mapStateWithSelectors)({ tournament: tournament, schedule: form('schedule') });
var gamesSelector = exports.gamesSelector = (0, _noRedux.mapStateWithSelectors)({ tournament: tournament, games: gamesWithTeams, players: playersWithNames });
var gameEditSelector = exports.gameEditSelector = (0, _noRedux.mapStateWithSelectors)({ tournament: tournament, game: form('game'), players: playersWithNames, games: gamesWithTeams });