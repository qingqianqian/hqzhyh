import React from 'react';
import { compose, withProps } from 'recompose';
import { pick, find } from 'ramda';
import { connect } from 'no-redux';
import { Button } from 'semantic-ui-react';
import actions from 'utils/actions';
import { tourSelector } from 'utils/selectors';
import { Table, TextBox } from 'utils/comps';
import { tap, withLoad, withEdit, withSuccess, withParams } from 'utils';
import { withRouter } from "react-router-dom";

const Tournament = ({ tournament, history, postTour, patchTour }) =>
  <div>
    <h1>Tournament - {+tournament.id ? tournament.name : 'Add New'}</h1>
    <hr />
    {+tournament.id ?
    <div>  
      <Button primary onClick={() => history.push(`/teams/${tournament.id}`)}>Teams</Button>
      <Button primary onClick={() => history.push('/teams/0')}>Schedules</Button>
    </div>  
    : null}  
    <TextBox name="tournament.id" disabled />
    <TextBox name="tournament.name" fluid />
    <hr />
    <Button primary onClick={() => +tournament.id ? patchTour(tournament) : postTour(tournament)}>Save</Button>
  </div>

export default compose(
  connect(tourSelector, actions),
  withParams,
  withEdit('tournament'),
  withSuccess('tour', () => alert('Saved'), () => alert('Error happened!')),
  withRouter
)(Tournament)