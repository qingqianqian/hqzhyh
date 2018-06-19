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
import { Button, Dropdown } from 'semantic-ui-react';

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

  const optionsCurrency = [
    { key: 'rmb', text: '人民币', value: 'rmb' },
    { key: 'cad', text: '加元', value: 'cad' },
    { key: 'usd', text: '美金', value: 'usd' },
   ]  

   const optionsPayRmb = [
    { key: 'erweima', text: '扫描二维码', value: 'erweima' },
    { key: 'zhifubao', text: '支付宝', value: 'zhifubao' },
   ]  
   const optionsPayCad = [
    { key: 'eTransfer', text: 'E-Transfer', value: 'eTransfer' },
    { key: 'deposit', text: '柜台付款', value: 'deposit' },
   ]  


const Signup = p =>
<div  class="f jcc">
  <div class="p16 fv w30">
    <div class="tac"><h1>注册成为会员</h1></div>
    <hr/>
    <br/>
    姓名：<TextBox name="firstName" fluid />
    邮箱：<TextBox name="email" fluid />
    密码：<TextBox name="password" fluid />
    确认密码：<TextBox name="password1" fluid />
    选择货币：<Dropdown placeholder='选择货币' fluid selection options={optionsCurrency} />
    <br/>
    所付金额：
    <br/><br/>
    选择付款方式：
    <Dropdown placeholder='选择付款方式' fluid selection options={optionsPayCad} />

   <br/>
   <br/>
   <br/>
   <br/>
    <Button primary>提交</Button>
  </div>
</div>
export default compose(
  connect(lookupSelector)
)(Signup);
