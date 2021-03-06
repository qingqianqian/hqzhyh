import React from 'react';
import { compose, withProps } from 'recompose';
import { pick, find } from 'ramda';
import { connect } from 'no-redux';
import { Button } from 'semantic-ui-react';
import actions from 'utils/actions';
import { playerSelector } from 'utils/selectors';
import { Table, TextBox } from 'utils/comps';
import { tap, withLoad, withEdit, withSuccess } from 'utils';

const Player = ({ player, putPlayer, postPlayer }) =>
  <div>
    <h1>Player - {+player.id ? player.name : 'Add New'}</h1>
    <hr />
    <TextBox name="player.id" disabled />
    <TextBox name="player.firstName" />
    <TextBox name="player.firstName_ch" />
    <TextBox name="player.lastName" />
    <TextBox name="player.lastName_ch" />
    <hr />
    <Button primary onClick={() => +player.id ? putPlayer(player) : postPlayer(player)}>Save</Button>
  </div>

export default compose(
  connect(playerSelector, actions),
  withEdit('player'),
  withSuccess('player', () => alert('Saved'), () => alert('Error happened!'))
)(Player)