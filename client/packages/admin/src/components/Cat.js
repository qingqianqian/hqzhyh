import React from 'react';
import { compose, withProps } from 'recompose';
import { pick, find } from 'ramda';
import { connect } from 'no-redux';
import { Button } from 'semantic-ui-react';
import actions from 'utils/actions';
import { catsSelector } from 'utils/selectors';
import { Table, TextBox } from 'utils/comps';
import { tap, withLoad, withDetail, withSuccess } from 'utils';

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
  withDetail('cat'),
  withLoad('setCat_f', 'cat'),
  withSuccess('cat', () => alert('Saved'), () => alert('Error happened!'))
)(Cat)