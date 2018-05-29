import React from 'react';
import { compose } from 'recompose';
import { pick } from 'ramda';
import { connect } from 'no-redux';
import actions from 'utils/actions';
import { withLoad, tap, withParams } from 'utils';
import { tournamentSelector } from 'utils/selectors';
import { Table } from 'utils/comps';
import { withRouter } from "react-router-dom";
import { Button } from 'semantic-ui-react';

const Schedules = ({ tournament, history, id }) =>
  <div>
    <div class="f">
      <h1 class="fg1">Schedule - {tournament.schedules}</h1>
      <Button primary onClick={() => history.push(`/schedule/${id}/0`)}>Add</Button>
    </div>
    <hr/>
    <Table name="schedules" link={x => `/schedule/${id}/${x}`} data={(tournament.schedules || []).map(x => ({ 'id': x.id, 'date': x.date }))} />
  </div>

export default compose(
  connect(tournamentSelector, actions),
  withParams,
  withLoad('tournament', 'id'),
  withRouter
)(Schedules)