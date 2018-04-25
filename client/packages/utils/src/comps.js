import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from "react-router-dom";
import { is, find, isNil } from 'ramda';
import { toTitleCase, tap } from '.';
import { filterSelector } from './selectors';
import { Input, Dropdown } from 'semantic-ui-react';

const _Table = ({ data, name, filter, setSort, children, history }) => {
  const l = data || [];
  const keys = l.length > 0 ? Object.keys(l[0]) : [];
  //const sort = (filter[name] || {}).sort;
  //const sortby = sort && sort[0];
  //const sortDir = sort && sort[1];

  return (
    <table class="ui celled striped table">
      <thead>
        <tr>
        {keys.map((k, i) =>
          <th key={`th${i}`}
          >
            {k}
          </th>
        )}
        </tr>
      </thead>
      <tbody>
      {l.map((o, i) =>
        <tr key={`tr${i}`} class="cp" onClick={() => history.push('/' + name + '/' + o.id)}>
          {keys.map(k => col(i, k, o, children))}
        </tr>
      )}
      </tbody>
    </table>
  );
}

export const Table = compose(
  connect(filterSelector, {
    setSort: (name, prop, dir) => ({
      type: actionTypes.Set_Sort,
      name, prop, dir
    })
  }),
  withRouter
)(_Table);

const col = (idx, key, obj, children) => {
  if (!is(Array, children))
    children = children ? [children] : [];
  const c = find(x => x.key === key, children) || { props: {} };
  const p = c.props;

  let v = obj[key];
  let cls = '';

  return <td key={`td${key + idx}`} class={cls}>{v}</td>;
}

const prop = (prop, val = '') => (key, children) => {
  const child = find(x => x.key === key, children);
  return (child && child.props[prop]) || val;
}

const title = (key, children) => prop('title', toTitleCase(key))(key, children);

// class={sortby === k ? (sortDir === 1 ? '_asc' : '_desc') : ''}
// onClick={() => setSort(name, k, sortDir === 1 ? 2 : 1)}

const setForm = (n, v, i) => ({ type: 'setForm', path: 'form.' + n, payload: v });

const withInput = isCheck => comp => ({name, index, form, setForm, ...args}) => {
  const [fn, n] = name.split('.');
  let value = form && form[fn] && form[fn][n];
  if (!isNil(index) && is(Array, value)) value = value[index];
  const onChange = (e, i, v) => setForm(name, getElemValue(e, i, v), index);
  return comp({...args, id: fn + '_' + n, name, value, onChange, label: n});
}

const getElemValue =  (e, i, v) => {
  const t = i || e.target;
  let val = t.value;
  if (t.type === 'checkbox') val = t.checked;
  if (typeof val === 'undefined') val = v;
  return val;
};

const withForm = connect(
  s => ({ form: s.form }),
  { setForm }
);

const withAll = compose(withForm, withInput(false));
const withCheck = compose(withForm, withInput(true));

const textBox = p =>
  <div class="pv8">
    <Input {...p} />
  </div>

const select = p =>
  <div class="pv8">
    <Dropdown selection {...p} />
  </div>

export const TextBox = withAll(textBox);
export const Select = withAll(select);