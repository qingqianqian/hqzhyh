import React from 'react';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { cdurl, withLoad } from 'utils';
import actions from 'utils/actions';
import { lookupSelector } from 'utils/selectors';
import { range } from 'ramda';

//const s = { position: 'absolute', height: '150px', width: '10%' };
const s = { position: 'absolute', height: '150px', width: '15%' };
const s1 = { ...s, left: 0, background: 'linear-gradient(to left, rgba(42, 27, 112,0) 20%, rgba(42, 27, 112,1) 100%)' };
/* const s2 = { ...s, color: 'white', margin: 80, right: 20, background: 'linear-gradient(to right, rgba(42, 27, 112, 0) 20%, rgba(42, 27, 112, 1) 100%)' };
 */
const s2 = {  ...s, color: 'white', marginTop: 100, right: 10 };
const s3 = { paddingRight: 20};
const s4 = {  position: 'absolute', height: '150px', width: '35%', color: 'white', marginTop: 50, right: 10 };
const s5 = {  color: 'white'};
const n = 9;
const r1 = range(1, n + 1);
const r2 = r1.concat(r1);

const Header = ({ lookup }) =>
  <div class="bgb f">  
    <img src="images/banner.jpg" />
    <div class="fg1 ph8 f marquee">
      <div class="f aic m1">
       {/*  {r2.map(x =>
          <Link to="/">
            <img width="130" height="130" src={cdurl(lookup, 'header', x)} />  
          </Link>
        )} */}      
      </div>
      {/* <div style={s1}></div> */}
      
      <span style={s4}>优惠：新客户注册成为会员即送积分！</span>
      <div style={s2}><span style={s3}><Link to="/signin"><span style={s5}>登录</span></Link></span> <span><Link to="/signup"><span style={s5}>注册</span></Link></span></div>
    </div>  
  </div>  

export default compose(
  connect(lookupSelector, actions),
  withLoad('lookup')
)(Header);