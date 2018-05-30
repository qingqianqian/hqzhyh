import React from 'react';
import { compose } from 'recompose';
import { pick } from 'ramda';
import { connect } from 'no-redux';
import actions from 'utils/actions';
import { withLoad, tap, withParams, withNewId } from 'utils';
import { tournamentSelector } from 'utils/selectors';
import { Table } from 'utils/comps';
import { withRouter } from "react-router-dom";
import { Button } from 'semantic-ui-react';

const Games = ({ tournament, gamesWithTeams: games, history, id, newId }) =>
  <div>
    <div class="f">
      <h1 class="fg1">Matches - {tournament.name}</h1>
      <Button primary onClick={() => history.push(`/game/${id}/+${newId}`)}>Add</Button>
    </div>
    <hr/>
    <Table name="games" link={x => `/game/${id}/${x}`} data={(games || []).map(pick(['id', 'date', 'team1', 'player1', 'team2', 'player2']))} />
  </div>

export default compose(
  connect(tournamentSelector, actions),
  withParams,
  withLoad('players'),
  withLoad('tournament', 'id'),
  withNewId('tournament.games'),
  withRouter
)(Games)