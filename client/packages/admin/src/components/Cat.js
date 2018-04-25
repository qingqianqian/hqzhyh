import React from 'react';
import { compose, withProps } from 'recompose';
import { pick, find } from 'ramda';
import { connect } from 'no-redux';
import { Button } from 'semantic-ui-react';
import actions from 'utils/actions';
import { catsSelector } from 'utils/selectors';
import { Table, TextBox } from 'utils/comps';
import { tap, withLoad } from 'utils';

const Cat = ({ cat, id, form, putCat, postCats }) =>
  <div>
    <h1>Category - {+id ? cat.name : 'Add New'}</h1>
    <hr />
    <TextBox name="cat.id" disabled />
    <TextBox name="cat.name" />
    <TextBox name="cat.name_ch" />
    <hr />
    <Button primary onClick={() => +id ? putCat(form.cat) : postCats(form.cat)}>Save</Button>
  </div>

export default compose(
  connect(catsSelector, actions),
  withProps(p => ({ cat: find(x => x.id == p.match.params.id, p.cats) || {}, id: p.match.params.id })),
  withLoad('setCat_f', 'cat')
)(Cat)