import { reduce, prop, sortWith, ascend, descend, unnest, find, isEmpty, groupBy, join, sum } from 'ramda';
import { createSelector, mapStateWithSelectors } from 'no-redux';
import { findById, getNameById, toDate, addIndex, tap } from '.';
import { Z_TEXT } from 'zlib';

const _form = s => s.form || {};
const _filter = s => s.filter || {};

const form = p => s => _form(s)[p] || {};
const filter = p => s => _filter(s)[p] || {};

const isLoading = s => s.isLoading;
const lastAction = s => s.lastAction || '';
const error = s => s.error;
const lookup = s => s.lookup || {};
const lang = s => s.lang || {};
const cats = s => s.cats || [];
const products = s => s.products || [];
const players = s => s.players || [];
const tournaments = s => s.tournaments || [];
const tournament = s => s.tournament || {};
const history = s => s.history || [];

const success = a => createSelector(
  isLoading,
  lastAction,
  error,
  (il, la, e) => il || la.toLowerCase() !== ('set' + a) ? null : !e
)

const sortedList = (list, filter) => createSelector(
  list,
  filter,
  (l, f) => {
    const sort = f.sort;
    if (!sort || sort.length < 2) return l;

    const by = prop(sort[0]);
    return sortWith([sort[1] === 2 ? descend(by) : ascend(by)], l);
  }
)

const catsDD = createSelector(
  cats,
  cs => cs.map(c => ({...c, text: c.name, value: c.id,
    subs: (c.subs || []).map(s => ({...s, text: s.name, value: s.id}))}))
);

const productsWithCat = createSelector(
  products,
  cats,
  (ps, cs) => ps.map(p => {
    const c = findById(p.cat)(cs);
    return {...p, cat_name: c && c.name, cat1_name: getNameById(p.cat1)(c && c.subs)};
  })
);

const filteredProducts = createSelector(
  productsWithCat,
  filter('product'),
  (ps, f) => reduce((p, c) => p.filter(c), ps, Object.keys(f).map(k => {
    if (k === 'cat') {
      if (f[k] === 1) return p => p;
      if (f[k] === 2) return p => p.sale;
    }
    return p => p[k] === f[k];
  }))
);

const playersWithNames = createSelector(
  players,
  ps => ps.map(p => ({ ...p, name: p.firstName + ' ' + p.lastName }))
);

const filteredPlayers = createSelector(
  playersWithNames,
  form('player'),
  (ps, f) => sortWith([descend(prop('rating'))])(ps.filter(p => isEmpty(f) || p.name.toLowerCase().indexOf(f) > -1))
);

const teams = createSelector(
  tournament,
  t => t.teams || []
);

const tournamentWithPlayers = createSelector(
  tournament,
  playersWithNames,
  (t, ps) => {
    const teams = (t.teams || []).map(x => ({ ...x, players: x.players.map(p => ({ ...findById(p.id)(ps), initRating: p.rating })) }));
    return teams.length > 0 ? { ...t, teams } : t;
  }
);

const tournamentsWithYears = createSelector(
  tournaments,
  ts => sortWith(
    [descend(prop('year')), ascend(prop('name'))],
    ts.map(t => ({ year: +find(x => !isNaN(+x), unnest(t.name.split(' ').map(x => x.split('/')))), ...t }))
  )
);

const games = createSelector(
  tournament,
  t => t.games || []
);

const gamesWithTeams = createSelector(
  teams,
  playersWithNames,
  games,
  (ts, ps, gs) => gs.map(g => ({
    ...g,
    player1: findById(g.p1)(ps),
    player2: findById(g.p2)(ps),
    team1: find(x => findById(g.p1)(x.players), ts),
    team2: find(x => findById(g.p2)(x.players), ts)
  }))
);

const redSpan = x => `<span class="red">${x}</span>`;

const schedule = createSelector(
  gamesWithTeams,
  gs => {
    const ss = groupBy(x => x.date, gs);
    return Object.keys(ss).sort().map(k => {
      const ms = groupBy(x => join('|', [x.team1.name, x.team2.name].sort()), ss[k].filter(x => x.team1 && x.team2));
      return ({
        date: toDate(new Date(k)),
        matches: Object.keys(ms).map(m => {
          const ns = m.split('|');
          const n = ms[m].filter(x => (x.team1.name === ns[0] && x.result[0] === '3') || (x.team2.name === ns[0] && x.result[2] === '3')).length;
          return ({
            team1: ns[0],
            result: (n > 2 ? redSpan(n) : n) + ' - ' + (5 - n > 2 ? redSpan(5 - n) : 5 - n),
            team2: ns[1],
            team1Points: n,
            team2Points: 5 - n,
            winner: n > 2 ? ns[0] : ns[1],
            loser: n > 2 ? ns[1] : ns[0],
          });
        })
      });
    });
  }
);

const getPoints = (m, t, v) => m[t] === v ? m[t + 'Points'] : 0;

const standing = createSelector(
  schedule,
  teams,
  (s, ts) => addIndex(sortWith([descend(prop('points'))], ts.map(t => ({
    team: t.name,
    w: sum(s.map(w => w.matches.filter(m => m.winner === t.name).length)),
    l: sum(s.map(w => w.matches.filter(m => m.loser === t.name).length)),
    points: sum(s.map(w => sum(w.matches.map(m => getPoints(m, 'team1', t.name) + getPoints(m, 'team2', t.name))))),
  }))), 'rank')
);

const historyTable = createSelector(
  history,
  playersWithNames,
  (h, ps) => sortWith([descend(prop('date'))], h.map(x => x.games)).map(g => ({
    id: g.id,
    date: toDate(new Date(g.date)),
    player1: `${getNameById(g.p1)(ps)} (${g.p1Rating} ${(g.p1Diff > 0 ? '+ ' : '- ') + Math.abs(g.p1Diff)} = ${g.p1Rating + g.p1Diff})`,
    player2: `${getNameById(g.p2)(ps)} (${g.p2Rating} ${(g.p2Diff > 0 ? '+ ' : '- ') + Math.abs(g.p2Diff)} = ${g.p2Rating + g.p2Diff})`,
    result: g.result
  }))
);

export const successSelector = a => mapStateWithSelectors({ success: success(a) });
export const lookupSelector = mapStateWithSelectors({ lookup, lang });
export const langSelector = mapStateWithSelectors({ lang });
export const catsSelector = mapStateWithSelectors({ cats, cat: form('cat'), lang });
export const productsSelector = mapStateWithSelectors({ products: filteredProducts, productFilter: filter('product'), lookup, lang, product: form('product'), cats: catsDD });
export const ratingsSelector = mapStateWithSelectors({ cats, form, lang });
export const playersSelector = mapStateWithSelectors({ players: filteredPlayers, lookup });
export const tournamentsSelector = mapStateWithSelectors({ tournaments: tournamentsWithYears, lookup });
export const tournamentSelector = mapStateWithSelectors({ tournament: tournamentWithPlayers, lookup, players: filteredPlayers, gamesWithTeams });
export const historySelector = mapStateWithSelectors({ history: historyTable, lookup, players: playersWithNames });
export const scheduleSelector = mapStateWithSelectors({ schedule, tournament });
export const standingSelector = mapStateWithSelectors({ standing, tournament });
