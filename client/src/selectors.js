import { reduce } from 'ramda';
import { createSelector, mapStateWithSelectors } from 'no-redux';

const products = s => s.products || [];
const productFilter = s => s.productFilter || {};

const filteredProducts = createSelector(
  products,
  productFilter,
  (ps, f) => reduce((p, c) => p.filter(c), ps, Object.keys(f).map(k => {
    if (k === 'cat') {
      if (f[k] === 'New Arrivals') return p => p;
      if (f[k] === 'On Sale') return p => p.sale;
    }
    return p => p[k] === f[k];
  }))
);

export const productsSelector = mapStateWithSelectors({ products: filteredProducts, productFilter });