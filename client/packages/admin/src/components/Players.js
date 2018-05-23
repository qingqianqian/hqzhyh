import React from 'react';
import { compose } from 'recompose';
import { pick } from 'ramda';
import { connect } from 'no-redux';
import actions from 'utils/actions';
import { withLoad, tap } from 'utils';
import { playersSelector } from 'utils/selectors';
import { Table } from 'utils/comps';
import { withRouter } from "react-router-dom";
import { Button } from 'semantic-ui-react';

const Players = ({ players, history }) =>
  <div>
    <div class="f">
      <h1 class="fg1">Players</h1>
      <Button primary onClick={() => history.push('/players/0')}>Add</Button>
    </div>
    <hr/>
    <Table name="players" data={players.map(x => ({ 'id': x.id, 'name': x.name, 'name_ch': x.name_ch }))} />
  </div>

export default compose(
  connect(playersSelector, actions),
  withLoad('players'),
  withRouter
)(Players)