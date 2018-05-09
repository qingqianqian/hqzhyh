import React from 'react';
import { range, is, pick } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import actions from 'utils/actions';
import { tournamentSelector } from 'utils/selectors';
import { cdurl, withLoad, withDetail, withParams, getNameById, findById } from 'utils';
import { withRouter } from "react-router-dom";
import { TextBox, Table } from 'utils/comps';

const Tournament = ({ lookup, tournament }) =>
  <div class="p16 fv">
    <h1>{tournament.name}</h1>
    <hr/>
    {(tournament.teams || []).map(t =>
      <div class="pt8">
        <div class="pt8 fs24 darkgreen">{t.name}</div>
        <Table name="team" data={t.players || []}>
          <td key="rating" title="Start Rating" />  
        </Table>
      </div>  
    )}
  </div>

export default compose(
  connect(tournamentSelector, actions),
  withParams,
  withLoad('players'),
  withLoad('tournament', 'id')
)(Tournament);
