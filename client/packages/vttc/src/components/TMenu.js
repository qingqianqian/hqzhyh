import React from 'react';
import { range, is } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { lookupSelector } from 'utils/selectors';
import { cdurl, withLoad, withLang } from 'utils';
import { Link } from 'react-router-dom';

const TMenu = ({ id }) =>
  <div class="ui vertical menu">
    <Link class="item" to={'/tournaments/' + id}>Teams</Link>
    <Link class="item" to={'/schedule/' + id}>Schedule</Link>
    <Link class="item" to={'/standing/' + id}>Standing</Link>
    <Link class="item" to={'/stats/' + id}>Stats</Link>
  </div>

export default TMenu;