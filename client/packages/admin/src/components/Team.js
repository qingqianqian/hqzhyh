import React from 'react';
import { compose, withProps } from 'recompose';
import { pick, find } from 'ramda';
import { connect } from 'no-redux';
import { Button } from 'semantic-ui-react';
import actions from 'utils/actions';
import { catsSelector } from 'utils/selectors';
import { Table, TextBox } from 'utils/comps';
import { tap, withLoad, withEdit, withSuccess, withParams } from 'utils';

const Team = ({ team, putTeam, postTeam }) =>
  <div>
    <h1>Team - {+team.id ? team.name : 'Add New'}</h1>
    <hr />
    <TextBox name="team.id" disabled />
    <TextBox name="team.name" />
    <hr />
    <Button primary onClick={() => +team.id ? putTeam(team) : postTeam(team)}>Save</Button>
  </div>

export default compose(
  connect(catsSelector, actions),
  withParams,
  withLoad('tournament', 'id1'),
  withEdit('team', ['tournament', 'teams', '{id}']),
  withSuccess('team', () => alert('Saved'), () => alert('Error happened!'))
)(Team)