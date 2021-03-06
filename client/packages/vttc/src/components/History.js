import React from 'react';
import { range, is, pick, find } from 'ramda';
import { connect } from 'no-redux';
import { compose, withProps } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { historySelector } from 'utils/selectors';
import { tap, cdurl, withLoad, withLang, getNameById, findById, withParams, withListener } from 'utils';
import { withRouter } from "react-router-dom";
import { TextBox, Table } from 'utils/comps';

const History = ({ lookup, history, player }) =>
  <div class="p16 fv">
    <div class="f">
      <h1 class="fg1">History - {player.name} ({player.rating})</h1>
    </div>  
    <div class="ui divider"></div>
    <Table name="history" data={history}>
      <td key="id" hidden />
    </Table>
  </div>

export default compose(
  connect(historySelector, actions),
  withParams,
  withLoad('players'),
  withLoad('history', 'id', true),
  withProps(p => ({ player: findById(p.id)(p.players) || {} }))
)(History);
