import React from 'react';
import { compose, withProps } from 'recompose';
import { pick, find, is, range } from 'ramda';
import { connect } from 'no-redux';
import { Button } from 'semantic-ui-react';
import actions from 'utils/actions';
import { gameEditSelector } from 'utils/selectors';
import { Table, TextBox, DoubleSelect, Select } from 'utils/comps';
import { tap, withLoad, withEdit, withSuccess, withParams, getPropById } from 'utils';

const Game = ({ tournament, game, putGame, postGame, id }) =>
  <div>
    <h1>Match - {tournament.name} - {game.date}</h1>
    <hr />
    <TextBox name="game.id" disabled />
    <TextBox name="game.date" />
    <div>Date: {game.schedule.date}</div>
    <div>Home Team: {game.team1}</div>
    <Select name={`game.p1`} options={getPropById('players')(game.team1)(tournament.teams)} />
    <div>Away Team: {game.team2}</div>
    <Select name={`game.p2`} options={getPropById('players')(game.team2)(tournament.teams)} />
    <div>Result: {game.result}</div>
    <hr />
  </div>

export default compose(
  connect(gameEditSelector, actions),
  withParams,
  withLoad('tournament', 'id1'),
  withEdit('game', 'tournament.games'),
  withSuccess('game', () => alert('Saved'), () => alert('Error happened!'))
)(Game)

//<Button primary onClick={() => id[0] == '+' ? postGame(game, { id1: tournament.id }) : putGame(game, { id1: tournament.id, id: game.id })}>Save</Button>
