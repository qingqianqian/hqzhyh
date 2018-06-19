import React from 'react';
import { range, is } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { playersSelector } from 'utils/selectors';
import { cdurl, withLoad, withLang, getNameById, findById } from 'utils';
import { withRouter } from "react-router-dom";
import { TextBox } from 'utils/comps';

const s1 = s => ({
  width: '130px',
  height: '130px',
  marginRight: '16px',
  //borderRadius: '500rem',
  background: `url(/images/${s === 'M' ? 'male' : 'female'}.png) no-repeat scroll 0 0`
});

const Policy = ({ lookup, players }) =>
  <div class="p16 fv">
    <div class="ph16">
      <div class="f">
        <h1 class="fg1">用户注册协议</h1>
      </div>  
      <div class="ui divider"></div>
    </div>
  </div>

export default compose(
  connect(playersSelector, actions),
  withLoad('players'),
  withLang
)(Policy);
