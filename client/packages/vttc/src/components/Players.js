import React from 'react';
import { range, is } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { playersSelector } from 'utils/selectors';
import { cdurl, withLoad, withLang, getNameById, findById } from 'utils';
import { withRouter } from "react-router-dom";

const s1 = s => ({
  width: '130px',
  height: '130px',
  marginRight: '16px',
  //borderRadius: '500rem',
  background: `url(/images/${s === 'M' ? 'male' : 'female'}.png) no-repeat scroll 0 0`
});

const Players = ({ lookup, players }) =>
  <div class="p16 fv">
    <div class="ph16">
      <h1>Players</h1>
      <div class="ui divider"></div>
    </div>
    <div class="fw w100">
      {players.map((x, i) =>
        <div class="f w50 p16">  
          <div class="card w100 f p16">
            <img src={cdurl(lookup, 'players', x.id)} style={s1(x.sex)} />
            <div class="fv">
              <div class="fw8">{x.firstName} {x.lastName}</div>
              <div>Rating: {x.rating}</div>
            </div>
          </div>
        </div>
      )}  
    </div>
  </div>

export default compose(
  connect(playersSelector, actions),
  withLoad('getPlayers'),
  withLang
)(Players);
