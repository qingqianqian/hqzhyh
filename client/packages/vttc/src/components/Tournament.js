import React from 'react';
import { range, is, pick } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import actions from 'utils/actions';
import { tournamentSelector } from 'utils/selectors';
import { cdurl, withLoad, withDetail, withParams, withListener, getNameById, findById, tap } from 'utils';
import { withRouter } from 'react-router-dom';
import { TextBox, Table } from 'utils/comps';
import TMenu from './TMenu';

const Tournament = ({ lookup, tournament, id }) =>
  <div class="p16 f">
    <TMenu id={id} />
    <div class="p32 fv">
      <h1>{tournament.name}</h1>
      <hr/>
      {(tournament.teams || []).map(t =>
        <div class="pt8">
          <div class="pt8 fs24 darkgreen">{t.name}</div>
          <Table name="team" data={pick(['id', 'firstName', 'lastName' ,'sex', 'rating'], (t.players || []))}>
            <td key="id" hidden />  
            <td key="sex" title="Gender" />  
          </Table>
        </div>  
      )}
    </div>
  </div>  

export default compose(
  connect(tournamentSelector, actions),
  withParams,
  withLoad('players'),
  withLoad('tournament', 'id'),
  withListener('click', p => tap(p))
)(Tournament);
