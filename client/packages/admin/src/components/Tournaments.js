import React from 'react';
import { compose } from 'recompose';
import { pick } from 'ramda';
import { connect } from 'no-redux';
import actions from 'utils/actions';
import { withLoad, tap } from 'utils';
import { tournamentsSelector } from 'utils/selectors';
import { Table } from 'utils/comps';
import { withRouter } from "react-router-dom";
import { Button } from 'semantic-ui-react';

const Tournaments = ({ tournaments, history }) =>
  <div>
    <div class="f">
      <h1 class="fg1">Tournaments</h1>
      <Button primary onClick={() => history.push('/tournaments/0')}>Add</Button>
    </div>
    <hr/>
    <Table name="tournaments" data={tournaments.map(x => ({ 'id': x.id, 'name': x.name }))} />
  </div>

export default compose(
  connect(tournamentsSelector, actions),
  withLoad('tournaments'),
  withRouter
)(Tournaments)