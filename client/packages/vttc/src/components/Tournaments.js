import React from 'react';
import { range, is, pick } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { tournamentsSelector } from 'utils/selectors';
import { cdurl, withLoad, withLang, getNameById, findById } from 'utils';
import { withRouter } from "react-router-dom";
import { TextBox, Table } from 'utils/comps';

const Tournaments = ({ lookup, tournaments }) =>
  <div class="p16 fv">
    <h1>Tournaments</h1>
    <hr/>
    <Table name="tournaments" data={tournaments} link>
      <td key="id" hidden/>   
    </Table>
  </div>

export default compose(
  connect(tournamentsSelector, actions),
  withLoad('tournaments')
)(Tournaments);
