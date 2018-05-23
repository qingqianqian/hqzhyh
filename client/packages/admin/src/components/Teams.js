import React from 'react';
import { compose } from 'recompose';
import { pick } from 'ramda';
import { connect } from 'no-redux';
import actions from 'utils/actions';
import { withLoad, tap } from 'utils';
import { teamsSelector } from 'utils/selectors';
import { Table } from 'utils/comps';
import { withRouter } from "react-router-dom";
import { Button } from 'semantic-ui-react';

const Teams = ({ teams, history }) =>
  <div>
    <div class="f">
      <h1 class="fg1">Teams</h1>
      <Button primary onClick={() => history.push('/teams/0')}>Add</Button>
    </div>
    <hr/>
    <Table name="teams" data={teams.map(x => ({ 'id': x.id, 'name': x.name }))} />
  </div>

export default compose(
  connect(teamsSelector, actions),
  withLoad('teams', 'id'),
  withRouter
)(Teams)