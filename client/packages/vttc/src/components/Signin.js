import React from 'react';
import { range, is, pick } from 'ramda';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import ImageSlider from './ImageSlider';
import actions from 'utils/actions';
import { lookupSelector } from 'utils/selectors';
import { cdurl, withLoad, withLang, getNameById, findById } from 'utils';
import { withRouter } from "react-router-dom";
import { TextBox, Table } from 'utils/comps';
import { Button } from 'semantic-ui-react';

const Sunday = 1;
const Monday = 1;
const Tuesday = 1;
const Wednesday = 1;
const Thursday = 1;
const Friday = 1;
const Saturday = 1;

/* const Calendar = ({ lookup }) =>
  <div class="p16 fv">
    <h1>Calendar</h1>
    <hr/>
    <Table name="calendar" data={[{Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday}]} link>
      <td key="id" hidden/>   
    </Table>
  </div> */

const Signin = p =>
<div  class="f jcc">
  <div class="p16 fv w30">
    <div class="tac"><h1>登录</h1></div>
    <hr/>
    <br/>
    用户名：<TextBox name="userName" fluid />
    密码：<TextBox name="password" fluid />
    <br/>
    <Button primary>登录</Button>

  </div>
</div>
export default compose(
  connect(lookupSelector)
)(Signin);
