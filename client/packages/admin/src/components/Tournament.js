import React from 'react';
import { compose, withProps } from 'recompose';
import { pick, find } from 'ramda';
import { connect } from 'no-redux';
import { Button } from 'semantic-ui-react';
import actions from 'utils/actions';
import { tournamentSelector } from 'utils/selectors';
import { Table, TextBox } from 'utils/comps';
import { tap, withLoad, withEdit, withSuccess } from 'utils';

const Tournament = ({ tournament, putTournament, postTournament }) =>
  <div>
    <h1>Tournament - {+tournament.id ? tournament.name : 'Add New'}</h1>
    <hr />
    <TextBox name="tournament.id" disabled />
    <TextBox name="tournament.name" />
    <hr />
    <Button primary onClick={() => +tournament.id ? putTournament(tournament) : postTournament(tournament)}>Save</Button>
  </div>

export default compose(
  connect(tournamentSelector, actions),
  withEdit('tournament'),
  withSuccess('tournament', () => alert('Saved'), () => alert('Error happened!'))
)(Tournament)