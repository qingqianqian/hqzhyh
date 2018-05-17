import { reduce, prop, sortWith, ascend, descend, unnest, find, isEmpty } from 'ramda';
import { createSelector, mapStateWithSelectors } from 'no-redux';
import { findById, getNameById, tap } from '.';

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
const history = s => (s.history || []).map(x => x.games.map(g => ({ id: g.id, date: g.date, player1: g.p1, player2: g.p2, result: p.result })));

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

const filteredPlayers = createSelector(
  players,
  form('player'),
  (ps, f) => sortWith([descend(prop('rating'))])(ps.filter(p => isEmpty(f) || (p.firstName + ' ' + p.lastName).toLowerCase().indexOf(f) > -1))
);

const teams = createSelector(
  tournament,
  t => t.teams || []
);

const tournamentWithPlayers = createSelector(
  tournament,
  players,
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
  players,
  games,
  (ts, ps, gs) => gs.map(g => ({
    ...g,
    player1: findById(g.p1, ps),
    player2: findById(g.p2, ps),
    team1: find(x => findById(g.p1, x.players), ts),
    team2: find(x => findById(g.p2, x.players), ts)
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
export const tournamentSelector = mapStateWithSelectors({ tournament: tournamentWithPlayers, lookup, players: filteredPlayers });
export const historySelector = mapStateWithSelectors({ history, lookup, players });
