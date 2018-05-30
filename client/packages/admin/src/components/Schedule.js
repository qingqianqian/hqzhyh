import React from 'react';
import { compose, withProps } from 'recompose';
import { pick, find, is, range } from 'ramda';
import { connect } from 'no-redux';
import { Button } from 'semantic-ui-react';
import actions from 'utils/actions';
import { scheduleEditSelector } from 'utils/selectors';
import { Table, TextBox, DoubleSelect, Select } from 'utils/comps';
import { tap, withLoad, withEdit, withSuccess, withParams, getPropById } from 'utils';

const Schedule = ({ tournament, schedule, putSchedule, postSchedule, id }) =>
  <div>
    <h1>Schedule - {tournament.name} - {schedule.date}</h1>
    <hr />
    <TextBox name="schedule.id" disabled />
    <TextBox name="schedule.date" />
    {range(0, 8).map(n =>
      <div class="f aic">
        <div class="pr8">Table {n + 1}: </div>  
        <Select name={`schedule.matches[${n}].home`} options={tournament.teams} />
        <div class="ph8">VS</div>
        <Select name={`schedule.matches[${n}].away`} options={tournament.teams} />
      </div>
    )}
    <hr />
    <Button primary onClick={() => id[0] == '+' ? postSchedule(schedule, { id1: tournament.id }) : putSchedule(schedule, { id1: tournament.id, id: schedule.id })}>Save</Button>
  </div>

export default compose(
  connect(scheduleEditSelector, actions),
  withParams,
  withLoad('tournament', 'id1'),
  withEdit('schedule', 'tournament.schedules', { matches: [] }),
  withSuccess('schedule', () => alert('Saved'), () => alert('Error happened!'))
)(Schedule)
