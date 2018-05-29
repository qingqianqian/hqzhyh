import React from 'react';
import { compose, withProps } from 'recompose';
import { pick, find, is, range } from 'ramda';
import { connect } from 'no-redux';
import { Button } from 'semantic-ui-react';
import actions from 'utils/actions';
import { scheduleEditSelector } from 'utils/selectors';
import { Table, TextBox, DoubleSelect, Select } from 'utils/comps';
import { tap, withLoad, withEdit, withSuccess, withParams, getPropById } from 'utils';

const Schedule = ({ tournament, schedule, putSchedule, postSchedule }) =>
  <div>
    <h1>Schedule - {+schedule.id ? schedule.date : 'Add New'}</h1>
    <hr />
    <TextBox name="schedule.id" disabled />
    <TextBox name="schedule.date" />
    {range(1, 9).map(n =>
        <div>
            <Select/>
        </div>
    )}
    <hr />
    <Button primary onClick={() => +schedule.id ? putSchedule(schedule, { id1: tournament.id, id: schedule.id }) : postSchedule(schedule, { id1: tournament.id })}>Save</Button>
  </div>

export default compose(
  connect(scheduleEditSelector, actions),
  withParams,
  withLoad('tournament', 'id1'),
  withEdit('schedule', ['tournament', 'schedules']),
  withSuccess('schedule', () => alert('Saved'), () => alert('Error happened!'))
)(Schedule)
