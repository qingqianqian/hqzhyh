import React from 'react';
import { compose, withProps } from 'recompose';
import { pick, find, is } from 'ramda';
import { connect } from 'no-redux';
import { Button } from 'semantic-ui-react';
import actions from 'utils/actions';
import { teamSelector } from 'utils/selectors';
import { Table, TextBox, DoubleSelect } from 'utils/comps';
import { tap, withLoad, withEdit, withSuccess, withParams, getPropById } from 'utils';

const Team = ({ tournament, team, players, putTeam, postTeam }) =>
  <div>
    <h1>Team - {+team.id ? team.name : 'Add New'}</h1>
    <hr />
    <TextBox name="team.id" disabled />
    <TextBox name="team.name" />
    <DoubleSelect name="team.players" options={tap(players)} buttonStyle="ui button" />
    <hr />
    <Button primary onClick={() => +team.id ? putTeam(toTeam(team, players), { id1: tournament.id, id: team.id }) : postTeam(toTeam(team, players))}>Save</Button>
  </div>

export default compose(
  connect(teamSelector, actions),
  withParams,
  withLoad('players'),
  withLoad('tournament', 'id1'),
  withEdit('team', ['tournament', 'teams']),
  withSuccess('team', () => alert('Saved'), () => alert('Error happened!'))
)(Team)

const toTeam = (t, ps) => ({
  id: t.id,
  name: t.name,
  players: (t.players || []).map(p => is(Object, p) ? p : {id: +p, rating: getPropById('rating')(+p)(ps) })
})