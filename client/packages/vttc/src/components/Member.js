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

  const optionsTime = [
    { key: '6month', text: '6 months', value: '6month' },
    { key: '1year', text: '1 year', value: '1year' },
    { key: '3year', text: '3 year', value: '3year' },
   ]  

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

const Member = p =>
<div  class="f jcc">
  <div class="p16 fv w30">
    <h1>您的积分为6868。请选择您想要的投资/您还不是会员，请先注册会员</h1>
    <hr/>
    <br/>
    投资时间：<Dropdown placeholder='投资时间' fluid selection options={optionsTime} />
    <br/>
    选择货币：<Dropdown placeholder='选择货币' fluid selection options={optionsCurrency} />
    <br/>
    投资金额：<TextBox name="amount" fluid />
    <br/>
    选择付款方式：
    <Dropdown placeholder='选择付款方式' fluid selection options={optionsPayRmb} />
    <br/>
    <br/>
    <br/>

    <Button primary>提交</Button>
  </div>
</div>

export default compose(
  connect(lookupSelector)
)(Member);
