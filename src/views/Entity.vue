<template>
<div>
  <div class="body_top">
    <div class="system-name-wrap">
      <!--        <span>Online grAph System for academIcS</span>-->
      <span @click="goHome">OASIS</span>
    </div>
  </div>
  <div class="body_bottom">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item><span>{{academicEntityVO.name}}</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="body_bottom_body">
      <el-row>
        <el-col :span="academicEntityVO.refSum>-1?19:22" :offset="1">
          <div class="entity-title">
            <span class="name">{{academicEntityVO.name}}</span>
            <hot-graph v-if="academicEntityVO.popTrend" :data="academicEntityVO.popTrend" :id="type + '' + id"></hot-graph>
          </div>
        </el-col>
        <el-col :span="3" :offset="0" v-if="academicEntityVO.refSum>-1">
          <div class="reference citation_box">
            <span class="citation_title">被引用数 </span>
            <span class="citation_count">{{academicEntityVO.refSum}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="body_bottom_top" :span="22" :offset="1">
          <el-row>
            <el-col>
            <el-tabs v-model="activeName" type="border-card">
              <el-tab-pane v-if="academicEntityVO.authors&&academicEntityVO.authors.length>0" name="author">
                <span slot="label"><i class="el-icon-s-custom"></i> 作者</span>
                <el-row>
                  <el-col class="column" :span="12" v-for="(author, index) in academicEntityVO.authors" :key="index">
                    <el-row class="entity-wrap">
                      <el-col :span="9">
                        <a class="entity" :title="author.name" :href="'/entity/author/' + author.id">
                          {{author.name}}
                        </a>
                      </el-col>
                      <el-col :span="15">
                        <hot-graph :data="author.popTrend" :id="'1' + author.id"></hot-graph>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane v-if="academicEntityVO.affiliations&&academicEntityVO.affiliations.length>0" name="affiliation">
                <span slot="label"><i class="el-icon-s-home"></i> 机构</span>
                <el-row>
                  <el-col class="column" :span="12" v-for="(affiliation,index) in academicEntityVO.affiliations" :key="index">
                    <el-row  class="entity-wrap">
                      <el-col :span="14">
                        <a class="entity" :title="affiliation.name" :href="'/entity/affiliation/' + affiliation.id">
<!--                          {{affiliation.name.length>25?affiliation.name.substr(0,25)+'...':affiliation.name}}-->
                          {{affiliation.name}}
                        </a>
                      </el-col>
                      <el-col :span="10">
                        <hot-graph :data="affiliation.popTrend" :id="'2' + affiliation.id"></hot-graph>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane v-if="academicEntityVO.conferences&&academicEntityVO.conferences.length>0" name="conference">
                <span slot="label"><i class="el-icon-time"></i> 刊物</span>
                <el-row>
                  <el-col class="column" :span="12" v-for="(conference,index) in academicEntityVO.conferences" :key="index">
                    <el-row class="entity-wrap">
                      <el-col :span="conference.popTrend?12:24">
                        <a class="entity" :title="conference.name" :href="'/entity/issue/' + conference.id">
                          {{conference.name}}
                        </a>
                      </el-col>
                      <el-col :span="12" v-if="conference.popTrend">
                        <hot-graph :data="conference.popTrend" :id="'3' + conference.id"></hot-graph>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane name="cloud" v-if="academicEntityVO.terms&&academicEntityVO.terms.length>0">
                <span slot="label"><i class="el-icon-cloudy"></i> 云图</span>
                <div id="cloud-wrap">
                  <div class="svg" id="cloud"></div>
                </div>
                <div class="cloud_tip" v-if="hasCloud">
                  <em>hover or click to know more ...</em>
                </div>
              </el-tab-pane>
              <el-tab-pane name="graph">
                <span slot="label"><i class="el-icon-connection"></i> 关系图</span>
                <relation-graph v-if="id!==0&&activeName==='graph'" :eid="parseInt(id)" :etype="type" :size="size"></relation-graph>
                <el-tooltip effect="light">
                  <div slot="content">
                    1. 点击节点可以跳转到相应关系图页面<br>
                    2. 长按节点可以拖拽<br>
                    3. 实线代表节点间存在热度关系<br>
                    4. 实线线条越粗代表热度值越大<br>
                    5. 虚线代表节点间无热度关系
                  </div>
                  <i class="el-icon-question graph-helper"></i>
                </el-tooltip>
                <div class="graph_entry">
                  <router-link :to="'/graph/' + this.$route.params.type + '/' + this.$route.params.id">
                    <el-tooltip :content="'进入关系图页面，查看更多关系图'" placement="bottom-start" effect="light" :open-delay="400">
                      <el-button icon="iconfont icon-guanxitu" class="graph-button"></el-button>
                    </el-tooltip>
                  </router-link>
                </div>
                <div class="example">
                  <div class="example-wrap"><span>中心点</span><div class="circle purple"></div></div>
                  <div class="example-wrap"><span>研究方向</span><div class="circle green"></div></div>
                  <div class="example-wrap"><span>作者</span><div class="circle red"></div></div>
                  <div class="example-wrap"><span>机构</span><div class="circle orange"></div></div>
                  <div class="example-wrap"><span>论文</span><div class="circle blue"></div></div>
                </div>
              </el-tab-pane>
            </el-tabs>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="22" :offset="1" class="significantPaper_wrap">
          <div style="display:inline-flex;">
            <strong class="significantPaper_title">代表作</strong>
            <div class="search-button">
              <el-tooltip :content="'去搜索'+this.academicEntityVO.name+'的论文'" placement="right" effect="light" :open-delay="200">
                <i class="el-icon-search" @click="search"></i>
              </el-tooltip>
          </div>
          </div>
          <hr/>
          <div class="filter-list" v-if="(this.academicEntityVO.yearlyTerms && this.academicEntityVO.yearlyTerms.length!==0)||(this.academicEntityVO.yearlyTerms && this.academicEntityVO.yearlyTerms.length!==0)">
            <div style="font-size: 15px">筛选条件：</div>
            <div class="filter-box" v-if="this.academicEntityVO.yearlyTerms && this.academicEntityVO.yearlyTerms.length!==0">
              <el-dropdown type="primary" :hide-on-click="true">
                <span class="el-dropdown-link">
                  年份：
                  <span v-if="yearSelect===-1">全部</span>
                  <span v-else>{{yearSelect}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu class="el-menu">
                  <el-radio-group size="medium" class="radio-group" v-model="yearSelect">
                    <el-radio class="radio-single" :label="-1">全部</el-radio>
                    <el-radio class="radio-single" v-for="(yearlyTerm, index) in academicEntityVO.yearlyTerms" :key="index" :label="yearlyTerm.year">
                      {{yearlyTerm.year}}
                    </el-radio>
                  </el-radio-group>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="filter-box" v-if="this.academicEntityVO.yearlyTerms && this.academicEntityVO.yearlyTerms.length!==0">
              <el-dropdown type="primary" :hide-on-click="true">
                <span class="el-dropdown-link">
                  研究方向：<span v-if="termSelect===-1">全部</span>
                  <span v-else v-for="termItem in showTermItems" v-if="termSelect===termItem.id">
                    {{termItem.name}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu class="el-menu">
                  <el-radio-group size="medium" class="radio-group" v-model="termSelect">
                    <el-radio class="radio-single" :label="-1">全部</el-radio>
                    <el-radio class="radio-single" v-for="(termItem, index) in showTermItems" :key="index" :label="termItem.id">
                      {{termItem.name}}
                    </el-radio>
                  </el-radio-group>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <hr/>
          <Card
            v-for="(significantPaper,index) in academicEntityVO.significantPapers"
            :key="index"
            :simple-paper-v-o="significantPaper"
          ></Card>
        </el-col>
<!--        <el-col :span="22" :offset="1" class="more"><a class="more-text" @click="search">Search papers by <strong>{{academicEntityVO.name}} </strong></a></el-col>-->
      </el-row>
    </div>
  </div>
</div>
</template>

<script>
  import {getAcademicEntity, getSignificantPaper} from "../api/api";
  import Card from "../components/Card";
  import {Loading} from "element-ui";
  import * as d3 from 'd3';
  import * as d3_cloud from 'd3-cloud';
  import RelationGraph from "../components/RelationGraph";
  import HotGraph from "../components/HotGraph";
  import echarts from 'echarts';
  import 'echarts-wordcloud'

      export default {
          name: "Entity",
          components: {HotGraph, RelationGraph, Card},
          data(){
              return{
                  id: 0,
                  type: 0,
                  size: 'small',
                  activeName: 'author',
                  typeDic: {"author":1, 'affiliation':2, 'issue':3, 'term': 4, 'paper':5},
                  academicEntityVO: {},
                  hasCloud: false,
                  yearSelect: -1,
                  termSelect: -1,
                  allTermItems: [],
                  showTermItems: [],
                  significantPapers: []
              }
          },
          watch: {
              activeName: function(){
                  if(this.activeName === 'cloud' && !this.hasCloud && this.academicEntityVO.terms && this.academicEntityVO.terms.length > 0){
                      let that = this;
                      setTimeout(function (){that.renderCloudNew();},100)
                  }
              },
              yearSelect: function () {
                  if(this.yearSelect === -1){
                      this.showTermItems = this.allTermItems;
                  }else{
                      let that = this;
                      this.academicEntityVO.yearlyTerms.forEach(function (yearlyTerm){
                          if(yearlyTerm.year===that.yearSelect){
                              that.showTermItems = yearlyTerm.termItemList;
                          }
                      })
                  }
                  if(this.termSelect === -1){
                      this.renderSignificantPaper();
                  }else{
                    this.termSelect = -1;
                  }
              },
              termSelect: function () {
                  this.renderSignificantPaper();
              }
          },
          mounted() {
              this.id=this.$route.params.id;
              this.type=this.typeDic[this.$route.params.type];
              if(this.id===undefined || this.type===undefined){
                  window.location.href = '/home';
              }
              let loadingInstance = Loading.service({ fullscreen: true, text:'loading...'});
              getAcademicEntity(this.id,this.type)
                  .then(res => {
                      document.title = res.name + ' - ' + document.title
                      res.yearlyTerms.sort(function (a, b) {
                          return b.year-a.year;
                      });
                      this.academicEntityVO = res;
                      if(res.authors&&res.authors[0]){
                          this.activeName = 'author';
                      }else if(res.affiliations&&res.affiliations[0]){
                          this.activeName = 'affiliation';
                      }else if(res.conferences&&res.conferences[0]){
                          this.activeName = 'conference';
                      }else if(res.terms&&res.terms[0]){
                          this.activeName = 'cloud';
                      }else{
                          this.activeName = 'graph';
                      }
                      let allTermItems = [];
                      this.academicEntityVO.yearlyTerms.forEach(function(yearlyTerm){
                          yearlyTerm.termItemList.forEach(function (termItem) {
                              let has = false;
                              allTermItems.forEach(function(term){
                                  if(term.id===termItem.id && term.name===termItem.name){
                                    has = true;
                                  }
                              });
                              if(!has){
                                  allTermItems.push(termItem);
                              }
                          })
                      });
                      this.allTermItems = allTermItems;
                      this.showTermItems = this.allTermItems;
                      loadingInstance.close();
                  })
                  .catch(()=>{
                      this.$alert('从服务器获取该实体信息失败，现为您跳回主页', '出错了',{
                          type: 'error',
                          confirmButtonText: 'confirm',
                          showClose: false
                      }).then(()=>{
                          window.location.href = '/home';
                      })
                  });
          },
          methods: {
              goHome: function(){
                  window.location.href = '/home';
              },
              toOtherEntity: function (type, id) {
                  window.location.href = '/entity/' + type + '/' + id;
              },
              renderCloud: function () {
                  let data = this.academicEntityVO.terms;
                  data.sort(function (a, b) {
                      return b.hot-a.hot;
                  });
                  let maxHot = Math.max.apply(Math,data.map(item => { return item.hot }));
                  let width = document.getElementById('cloud-wrap').offsetWidth;
                  // console.log(document.getElementById('cloud-wrap').offsetWidth);
                  // console.log(document.getElementById('cloud-wrap').innerWidth);
                  // console.log(document.getElementById('cloud-wrap').clientWidth);
                  let height = data.length>20?600:400;
                  let color = d3.scaleOrdinal(d3.schemeCategory10);
                  let svg = d3.select('#cloud')
                      .append('svg')
                      .attr('width', width)
                      .attr('height', height);

                  data=data.slice(0,50);

                  const layout = d3_cloud()
                      .size([width, height])
                      .words(data)
                      .padding(function (d) {
                          if((d.hot+1)/(maxHot+1)>0.8){
                              return 30;
                          }else{
                              return 30;
                          }
                      })
                      .rotate(function(d) {
                          // if(d.hot===maxHot){
                          //     return 30;
                          // }else{
                          //     return (d.hot+1)/(maxHot+1)>0.8?30:0;
                          // }
                          return Math.round(Math.random())*45;
                      })
                      .font('Impact')
                      .fontSize(function(d) {
                          if((d.hot+1)/(maxHot+1)>0.8){
                              return 20+(d.hot+1)/(maxHot+1)*20;
                          }else{
                              return 10+(d.hot+1)/(maxHot+1)*20;
                          }
                      })
                      .on('end', draw);

                  layout.start();
                  function draw(words) {
                      svg.append('g')
                          .attr('transform', 'translate('+ (layout.size()[0] / 2) + ',' + (layout.size()[1] / 2)+ ')')
                          .selectAll('text')
                          .data(words)
                          .enter()
                          .append('text')
                          .on('click', function(d) {
                              window.location.href = '/graph/term/' + d.id;
                          })
                          .style('cursor', 'pointer')
                          .attr('fill', (d, i) => color(i))
                          .style('font-size', function(d) {
                              if((d.hot+1)/(maxHot+1)>0.8){
                                  return 20+(d.hot+1)/(maxHot+1)*20;
                              }else{
                                  return 10+(d.hot+1)/(maxHot+1)*20;
                              }
                          })
                          .style('font-family', 'Impact')
                          .attr('text-anchor', 'middle')
                          .attr('transform', function(d) {
                              return 'translate('+[d.x*1.1, d.y*1.1]+')rotate('+d.rotate+')';
                          })
                          .text(function(d) {
                              return d.name;
                          })
                          .append('title')
                          .text(function(d) {
                              return d.name;
                          });

                      // svg.selectAll('text') // 创建动画
                      //     .style('fill-opacity', 0)
                      //     .transition()
                      //     .duration(100)
                      //     .delay(function(d, i) {
                      //         return i * 100
                      //     })
                      //     .style('fill-opacity', 1);
                  }
                  this.hasCloud = true;
              },
              renderCloudNew: function(){
                  let data = this.academicEntityVO.terms;
                  let height=data.length>=20?600:data.length>=10?400:data.length>=5?300:200;
                  data.sort(function (a, b) {
                    return b.hot-a.hot;
                  });
                  let maxHot = Math.max.apply(Math,data.map(item => { return item.hot }));
                  let echartData = [];
                  echartData.push({name:"",id:-1,value:80})
                  data.forEach(function (d) {
                      echartData.push({
                        name: d.name,
                        id: d.id,
                        value: (d.hot+1)/(maxHot+1)>0.8? 20+(d.hot+1)/(maxHot+1)*20: 20+(d.hot+1)/(maxHot+1)*20
                      })
                  });
                  console.log(echartData);
                  let myChart = echarts.init(document.getElementById('cloud'));
                  let option = {
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b}'
                    },
                    series: [
                      {
                        type: 'wordCloud',
                        gridSize: 2,
                        sizeRange: [20, 80],
                        rotationRange: [0, 0],
                        shape: 'circle',
                        textStyle: {
                          normal: {
                            color: function () {
                              return 'rgb(' + [
                                Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255)
                              ].join(',') + ')';
                            }
                          },
                          emphasis: {
                            shadowBlur: 5,
                            shadowColor: '#333'
                          }
                        },
                        data: echartData
                      }]
                  };
                  myChart.setOption(option);
                  myChart.resize({height:height});
                  myChart.on('click', function (word) {
                      window.location.href = '/graph/term/' + word.data.id;
                  });
              },
              search: function () {
                  let typeDic2= {1:"Author", 2:'Affiliation', 3:'Publication'}
                  let name = this.academicEntityVO.name;
                  let pattern = /[%\\/?+#&=]/;
                  while(pattern.test(name)){
                    name = name.replace(/[%\\/?+#&=]/g, ' ')
                  }
                  window.location.href = '/search/' + typeDic2[this.type] + '/'+name;
              },
              renderSignificantPaper: function () {
                  let that = this;
                  let change = false;
                  this.significantPapers.forEach(function (significantPaper) {
                      if(that.yearSelect===significantPaper.year&&that.termSelect===significantPaper.term){
                          that.academicEntityVO.significantPapers = significantPaper.paper;
                          change = true;
                      }
                  })
                  if (!change){
                      getSignificantPaper(this.id, this.type, this.yearSelect, this.termSelect).then(res=>{
                          this.academicEntityVO.significantPapers = res;
                          this.significantPapers.push({year: this.yearSelect, term: this.termSelect, paper: res})
                      });
                  }
              }
          },
          computed: {
              changeName: function () {
                  if(this.type === 3 && this.academicEntityVO.name !== undefined){
                      let nameItem = this.academicEntityVO.name.split(' ');
                      if(nameItem[1].substr(-1,1)==='1'){
                          nameItem[1] += 'st';
                      }else if(nameItem[1].substr(-1,1)==='2'){
                          nameItem[1] += 'nd';
                      }else if(nameItem[1].substr(-1,1)==='3'){
                          nameItem[1] += 'rd';
                      }else {
                          nameItem[1] += 'th';
                      }
                      if(nameItem[2] === 'ASE'){
                          return nameItem[0] + ' ' + nameItem[1] + ' IEEE/ACM International Conference on Automated Software Engineering (ASE)';
                      }else{
                          return nameItem[0] + ' ' + nameItem[1] + ' IEEE/ACM International Conference on Software Engineering (ICSE)';
                      }
                  }else{
                      return this.academicEntityVO.name;
                  }
              }
          }
      }
</script>

<style scoped>
  .body_top{
    width: 100%;
    background-image: url("../assets/teal_cube_background.jpg");
    background-color: #024349;
    background-repeat: no-repeat;
  }
  .system-name-wrap{
    position: relative;
    width: max-content;
    left: 50px;
    font-family: 'Arial Rounded MT Bold', sans-serif;
    font-size: 40px;
    color: #ffffff;
    cursor: pointer;
  }
  .body_bottom{
    margin: 20px 50px;
  }
  .body_bottom_body{
    margin: 20px 2% 80px 2%;
    box-shadow: 6px 6px 20px 4px #e4e8ef;
    padding: 40px 0 40px;
  }
  .body_bottom_top{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .entity-title{
    display: flex;
  }
  .name{
    text-align: left;
    font-size: 30px;
    font-weight: bold;
    margin-right: 20px;
  }
  .citation_box{
    width: 140px;
    height: 100%;
    background-color: #244;
    color: #ffffff;
    padding: 4px 0;
    border-radius: 3px;
    text-align: center;
    box-sizing: border-box;
  }
  .citation_title{
    font-size: 14px;
    font-weight: bold;
  }
  .citation_count{
    font-size: 28px;
  }
  .entity-wrap{
    margin: 10px 0;
  }
  .entity{
    color: #244;
    text-decoration: none;
    cursor: pointer;
    /*font-style: italic;*/
    font-weight: bold;
  }
  .entity:hover{
    color: #066;
    text-decoration: underline;
    cursor: pointer;
    /*font-style: italic;*/
  }
  #pane-graph{
    position: relative;
  }
  #pane-cloud{
    position: relative;
  }
  .cloud_tip{
    position: absolute;
    top: 0;
    left: 0;
  }
  .graph_entry{
    width: auto;
    position: absolute;
    top: 0;
    right: 0;
  }
  .graph-button{
    background: #244;
    border-radius: 3px;
    border: none;
    color: white;
  }
  .graph-helper{
    position: absolute;
    top: 0;
    left: 0;
    color: #244;
    font-size: x-large;
  }
  .example{
    position: absolute;
    top: 50px;
    right: 0;
  }
  .example-wrap{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 4px 0 0 0.5ex;
  }
  .purple{
    background-color: rgb(106, 0, 95);
  }
  .red{
    background-color: rgb(214, 39, 40);
  }
  .orange{
    background-color: rgb(255, 127, 14);
  }
  .green{
    background-color: rgb(44, 160, 44);
  }
  .blue{
    background-color: rgb(31, 119, 180);
  }
  .circle{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-left: 4px;
  }
  #cloud-wrap{
    width: 100%;
    text-align: left;
  }
  .significantPaper_wrap{
    margin-top: 20px;
    text-align: left;
  }
  .significantPaper_title{
    font-size: 24px;
  }
  .search-button{
    margin-left: 1vw;
    height: 21px;
    margin-block: auto;
    cursor: pointer;
  }
  .radio-group{
    /*padding-left: 1vw;*/
   /*padding-right: 1vw;*/
    display: flex;
    flex-wrap: wrap;
    max-height: 23vw;
    overflow: auto;

  }
  .radio-single{
    margin: 1vw;
  }

  .filter-list{
    display: flex;
  }
  .filter-box{
    display: block;
    margin-left: 20px;
  }
  .column{
    text-align: left;
  }
  .el-tag{
    margin: 0 30px 10px 0;
    /*background-color: #d66881;*/
    /*border-color: #b04c50;*/
    /*color: #ffffff;*/
    cursor: pointer;
  }
  .el-tag:hover{
    color: #000000;
    text-decoration: underline;
  }
  .el-dropdown-link {
    font-size: 15px;
    cursor: pointer;
    color: #244;
    font-family: Noto Sans SC, sans-serif;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .more{
    margin-top: 10px;
    text-align: left;
  }
  .more-text{
    cursor: pointer;
    text-decoration: underline;
  }
  .more-text:hover{
    color: #066;
  }
  .svg{
    width: 100%;
  }
</style>
