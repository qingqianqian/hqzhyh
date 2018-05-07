import { reduce, prop, sortWith, ascend, descend } from 'ramda';
import { createSelector, mapStateWithSelectors } from 'no-redux';
import { findById, getNameById, tap } from '.';

const isLoading = s => s.isLoading;
const lastAction = s => s.lastAction || '';
const error = s => s.error;
const lookup = s => s.lookup || {};
const form = s => s.form || {};
const lang = s => s.lang || {};
const cats = s => s.cats || [];
const products = s => s.products || [];
const players = s => s.players || [];
const filter = s => s.filter || {};

const playerFilter = createSelector(
  form,
  f => (f.pf || '').toLowerCase()
);

const productFilter = createSelector(
  filter,
  f => f.product || ''
);

const success = a => createSelector(
  isLoading,
  lastAction,
  error,
  (il, la, e) => !il && la.toLowerCase() === a + 'set' && !e
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
  productFilter,
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
  playerFilter,
  (ps, f) => sortWith([descend(prop('rating'))])(ps.filter(p => (p.firstName + ' ' + p.lastName).toLowerCase().indexOf(f) > -1))
);

export const successSelector = a => mapStateWithSelectors({ success: success(a) });
export const lookupSelector = mapStateWithSelectors({ lookup, lang });
export const langSelector = mapStateWithSelectors({ lang });
export const catsSelector = mapStateWithSelectors({ cats, form, lang });
export const productsSelector = mapStateWithSelectors({ products: filteredProducts, productFilter, lookup, form, lang, cats: catsDD });
export const ratingsSelector = mapStateWithSelectors({ cats, form, lang });
export const playersSelector = mapStateWithSelectors({ players: filteredPlayers, lookup });