<template>
<div>
  <div class = "body_top">
    <div class="top-img">
      <img src="../assets/background-new2.jpg" alt="This is a background pic."/>
    </div>
    <div class="system-name-wrap">
      <span>Online grAph System for acdemIcS</span>
    </div>
  </div>
  <div class="body_bottom">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item><span>{{academicEntityVO.name}}</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="body_bottom_body">
      <el-row>
        <el-col :span="22" :offset="1" class="name">
          <span>{{academicEntityVO.name}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="body_bottom_top" :span="22" :offset="1">
          <el-row>
            <el-col>
            <el-tabs v-model="activeName" type="border-card">
              <el-tab-pane v-if="academicEntityVO.authors!=null" name="author">
                <span slot="label"><i class="el-icon-s-custom"></i> Authors</span>
                <el-row>
                  <el-col class="column" v-if="academicEntityVO.authors!=null" :span="24">
                    <strong>Authors:</strong>
                    <div class="list">
                      <el-tag
                        v-for="author in academicEntityVO.authors"
                        :key="author.id"
                        :title="author.name"
                        @click="toOtherEntity('author', author.id)"
                      >
                        {{author.name}}
                      </el-tag>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane v-if="academicEntityVO.affiliations!=null" name="affiliation">
                <span slot="label"><i class="el-icon-s-home"></i> Affiliations</span>
                <el-row>
                  <el-col class="column" :span="24">
                    <strong>Affiliations:</strong>
                    <div class="list">
                      <el-tag
                        v-for="affiliation in academicEntityVO.affiliations"
                        :key="affiliation.id"
                        :title="affiliation.name"
                        @click="toOtherEntity('affiliation', affiliation.id)"
                      >
                        {{affiliation.name.length>25?affiliation.name.substr(0,25)+'...':affiliation.name}}
                      </el-tag>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane v-if="academicEntityVO.conferences!=null" name="conference">
                <span slot="label"><i class="el-icon-time"></i> Conferences</span>
                <el-row>
                  <el-col class="column" :span="24">
                    <strong>Issues:</strong>
                    <div class="list">
                      <el-tag
                        v-for="conference in academicEntityVO.conferences"
                        :key="conference.id"
                        :title="conference.name"
                        @click="toOtherEntity('issue', conference.id)"
                      >
                        {{conference.name}}
                      </el-tag>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane name="cloud">
                <span slot="label"><i class="el-icon-cloudy"></i> Cloud</span>
                <el-row>
                  <el-col :span="24" v-if="academicEntityVO.terms.length===0">
                    <strong>没有云图</strong>
                  </el-col>
                  <el-col :span="24" id="cloud-wrap" v-if="academicEntityVO.terms.length>0">
                    <strong>Terms Cloud: </strong>
                    <div class="svg" id="cloud"></div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane name="graph">
                <span slot="label"><i class="el-icon-connection"></i> Relation Graph</span>
                这里是关系图
              </el-tab-pane>
            </el-tabs>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="body_top_left column" :span="6">
              <el-row>
                <el-col :span="8">
                  <div class="reference citation_box" v-if="academicEntityVO.refSum>=0">
                    <div class="citation_title">Reference</div>
                    <div class="citation_count">{{academicEntityVO.refSum}}</div>
                  </div>
                </el-col>
                <el-col :span="16" class="entry_wrap">
                  <router-link :to="'/graph/' + this.$route.params.type + '/' + this.$route.params.id">
                    <el-tooltip :content="'Relation Graph'" placement="bottom-start" effect="dark" :open-delay="400">
                      <img src="../assets/graph-entry.png" class="graph_entry">
                    </el-tooltip>
                  </router-link>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="22" :offset="1" class="significantPaper_wrap">
          <strong class="significantPaper_title">Significant Papers</strong>
          <Card
          v-for="(significantPaper,index) in academicEntityVO.significantPapers"
          :key="index"
          :simple-paper-v-o="significantPaper"
          ></Card>
        </el-col>
        <el-col :span="22" :offset="1" class="more"><a class="more-text" @click="search">More information about <strong>{{academicEntityVO.name}} ...</strong></a></el-col>
      </el-row>
    </div>
  </div>
</div>
</template>

<script>
    import {getAcademicEntity} from "../api/analogApi";
    import Card from "../components/Card";
    import {Loading} from "element-ui";
    import * as d3 from 'd3';
    import * as d3_cloud from 'd3-cloud';

    export default {
        name: "Entity",
        components: {Card},
        data(){
            return{
                id: 0,
                type: 0,
                activeName: 'author',
                typeDic: {"author":1, 'affiliation':2, 'issue':3, 'term': 4, 'paper':5},
                academicEntityVO: {terms:[]}
                }
        },
        mounted() {
            this.id=this.$route.params.id;
            this.type=this.typeDic[this.$route.params.type];
            if(this.type===1){
              this.activeName = 'affiliation'
            }
            if(this.id===undefined || this.type===undefined){
                window.location.href = '/home';
            }
            let loadingInstance = Loading.service({ fullscreen: true, text:'loading...'});
            this.academicEntityVO = getAcademicEntity(this.id,this.type);
            let that = this;
            setTimeout(function () {
              loadingInstance.close();
              console.log(document.getElementById('cloud-wrap').offsetWidth);
              that.renderCloud();

              },100);
            // getAcademicEntity(this.id,this.type)
            //     .then(res => {
            //         this.academicEntityVO = res;
            //         let that = this;
            //         setTimeout(function () {
            //             if(res.terms&&res.terms.length > 0){
            //                 that.renderCloud();
            //                 loadingInstance.close();
            //             }else{
            //                 loadingInstance.close();
            //             }
            //         },100)
            //     })
            //     .catch(()=>{
            //         this.$alert('Fail to get entity，please search again', 'Tips',{
            //             type: 'error',
            //             confirmButtonText: 'confirm',
            //             showClose: false
            //         }).then(()=>{
            //             window.location.href = '/home';
            //         })
            //     });
        },
        methods: {
            toOtherEntity: function (type, id) {
                window.location.href='/entity/' + type + '/' + id;
            },
            renderCloud: function () {
                let data = this.academicEntityVO.terms;
                data.sort(function (a, b) {
                    return b.hot-a.hot;
                });
                let maxHot = Math.max.apply(Math,data.map(item => { return item.hot }));
                let width = 500;
                // let width = document.getElementById('cloud-wrap').offsetWidth;
                let height = data.length>100||data[0].name.length>15?400:300;
                let color = d3.scaleOrdinal(d3.schemeCategory10);
                let svg = d3.select('#cloud')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);
                // if(data.length>20){
                    data=data.slice(0,50);
                // }

                const layout = d3_cloud()
                    .size([width, height])
                    .words(data)
                    .padding(function (d) {
                        if((d.hot+1)/(maxHot+1)>0.8){
                            return 12;
                        }else{
                            return 6;
                        }
                    })
                    .rotate(function(d) {
                        if(d.hot===maxHot){
                            return 30;
                        }else{
                            return (d.hot+1)/(maxHot+1)>0.8?30:0;
                        }
                    })
                    .font('Impact')
                    .fontSize(function(d) {
                        if((d.hot+1)/(maxHot+1)>0.8){
                            return 10+(d.hot+1)/(maxHot+1)*10;
                        }else{
                            return 2+(d.hot+1)/(maxHot+1)*14;
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
                                return 12+(d.hot+1)/(maxHot+1)*12;
                            }else{
                                return 2+(d.hot+1)/(maxHot+1)*14;
                            }
                        })
                        .style('font-family', 'Impact')
                        .attr('text-anchor', 'middle')
                        .attr('transform', function(d) {
                            return 'translate('+[d.x, d.y]+')rotate('+d.rotate+')';
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

            },
            search: function () {
                let typeDic2= {1:"Author", 2:'Affiliation', 3:'Publication'}
                window.location.href = '/search/'+typeDic2[this.type]+'/'+this.academicEntityVO.name;
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
    position: relative;
  }
  img{
    width:100%
  }
  .system-name-wrap{
    position: absolute;
    top: 36px;
    left: 50px;
    font-family: 'Arial Rounded MT Bold', serif;
    font-size: 40px;
    color: #ffffff;
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
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
  }
  .name{
    text-align: left;
    font-size: 30px;
    font-weight: bold;
  }
  .citation_box{
    width: 80px;
    height: 50px;
    background-color: #000000;
    color: #ffffff;
    padding: 10px 0;
    border-radius: 3px;
    text-align: center;
  }
  .citation_title{
    font-size: 14px;
    font-weight: bold;
  }
  .citation_count{
    font-size: 28px;
  }
  /*.entry_wrap{*/
  /*  margin-top: 48px;*/
  /*}*/
  .graph_entry{
    width: 3vw;
  }
  #cloud-wrap{
    text-align: left;
  }
  .significantPaper_wrap{
    margin-top: 20px;
    text-align: left;
  }
  .significantPaper_title{
    font-size: 24px;
  }
  .column{
    padding: 2px;
    text-align: left;
    height: 100%;
  }
  .list{
    margin-top: 10px;
    text-align: center;
    justify-content: space-between;
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
  .more{
    margin-top: 10px;
    text-align: left;
  }
  .more-text{
    text-decoration: underline;
  }
  .more-text:hover{
    color: #409eff;
  }
</style>
