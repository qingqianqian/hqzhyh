import React from 'react';
import { range, is, pick } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import actions from 'utils/actions';
import { statsSelector } from 'utils/selectors';
import { cdurl, withLoad, withDetail, withParams, withListener, getNameById, findById, tap } from 'utils';
import { withRouter } from 'react-router-dom';
import { TextBox, Table } from 'utils/comps';
import TMenu from './TMenu';

const Stats = ({ stats, tournament, id }) =>
  <div class="p16 f">
    <TMenu id={id} />
    <div class="p32 fv">
      <h1>Stats - {tournament.name}</h1>
      <hr/>
      <Table name="stats" data={stats}>
      </Table>
    </div>
  </div>

export default compose(
  connect(statsSelector, actions),
  withParams,
  withLoad('tournament')
)(Stats);
