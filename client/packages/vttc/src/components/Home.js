import React from 'react';
import { range, is } from 'ramda';
import { Button, Menu, Input, Card, Icon, Dropdown, Image } from 'semantic-ui-react';
import ImageSlider from './ImageSlider';
import { connect } from 'no-redux';
import { compose } from 'recompose';
import actions from 'utils/actions';
import { lookupSelector } from 'utils/selectors';
import { withLoad } from 'utils';

const cards = ['Products', 'News', 'Training', 'Tournaments', 'League'];

const Home = p =>
  <div>
    <ImageSlider n={3} />

    <div class="p16">
      <h2>全球智能区块链商业应用大联盟简介</h2>
      <div>
      当前全球格局发生了重大转变，2018年出现了前所未有的机遇。个人、企业、机构、团体和政府现正面临由当前使用的信息互联网向基于人工智能和区块链的价值互联网过渡。
      <br/><br/>
      为了更好地帮助世界各地的个人、企业和机构、团体抓住机遇，高效低成本地实现从信息互联网升级到价值互联网，决定组建全球智能区块链商业应用大联盟。
      <br/><br/>
      全球智能区块链商业应用大联盟的理念是：应用智能区块链技术和商业模式，提升个人、企业和机构、团体的信用和价值。
      <br/><br/>
      全球智能区块链商业应用大联盟的宗旨是：应用智能区块链技术和商业模式，建立人与人之间、人与物之间的信任，和人与物之间、物与物之间的连接，进一步降低成本，提高效率和效益。
      <br/><br/>
      全球智能区块链商业应用大联盟的总目标是：将世界各地的相关企业、机构、团体和个人通过智能区块链联接起来，并由信息互联网升级到价值互联网，建立起全球信用价值体系、物联网、智慧银行和支付结算系统，促进智慧社区发展，推动智慧教育、智慧服务、智慧建设、智慧生产和供应，提升个人、企业及机构、团体的价值和效益，更好地满足人们日益增长的物质文化需要，达至共同富裕、美满幸福的目标。
      <br/><br/>
      全球智能区块链商业应用大联盟的具体目标是：在未来五至十年内，培育和扶持数以万计的具有创意、创新和创造力的人才和企业，将世界各地数以百万计的企业和企业家，数以千万计的专业人士，数以亿计的项目和产品，数以十亿计的消费者，数以万亿计的现金资产、数以十万亿计的可流动资产，数以百万亿计的可计价资产，数以千万亿计的闲置资产（包括债务），通过智能区块链和信用价值体系联接起来，透过智慧共享、资源分享、供求对接、价值传递，达至各尽所能、发挥优势、各取所需、人人受益、资源合理分配、有效降低成本、极大地提升效率和效益的目的，实现资产价值倍增、人们生活富裕幸福、社会可持续发展的目标。
      <br/><br/>
      实施方法和步骤：成立智能区块链商学院和智能区块链研究院；注册智能区块链商业应用集团公司、专业子公司和各地分公司；筹组智能区块链商业应用投资基金；组建环球智慧银行；发展环球智慧服务和产业；建设环球智慧社区。
      <br/><br/>
      支撑平台：环球合作平台 、加中合作平台等
      <br/><br/>
      支持机构：加中教育协会、加中科技协会、加中专业会计师协会、加拿大金融投资协会等
      <br/><br/>
      大会推广：环球发展大会、环球金融投资博览会、世界华商大会等
      <br/><br/>
      </div>
    </div>  
    {/* <div class="fw ph8 pb16">
      {cards.map((c, i) =>
        <div class="f w20 p8">
          <div class="card fv w100 cp">
            <ImageSlider n={2} name={c} />
            <div class="p8 fs18 tac">{c}</div>
          </div>
        </div>
      )}
    </div> */}
  </div>

export default Home;