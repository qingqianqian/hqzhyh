import React from 'react';
import { range, is, pick } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { playersSelector } from 'utils/selectors';
import { cdurl, withLoad, withLang, getNameById, findById, withParams } from 'utils';
import { withRouter } from "react-router-dom";
import { TextBox, Table } from 'utils/comps';

const History = ({ lookup, games, id }) =>
  <div class="p16 fv">
      <div class="f">
        <h1 class="fg1">History</h1>
      </div>  
      <div class="ui divider"></div>
    <Table name="history" data={games}>
      <td key="id" hidden />
    </Table>
  </div>

export default compose(
  connect(playersSelector, actions),
  withParams,
  withLoad('games', 'id')
)(History);
