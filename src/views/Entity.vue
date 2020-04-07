<template>
<div>
  <div class = "body_top">
    <div class="top-img">
      <img src="../assets/background-medium.jpg" alt="This is a background pic."/>
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
          <span>{{changeName}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="body_bottom_top" :span="22" :offset="1">
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
                  <a class="graph_entry" type="primary" :href="'/graph/' + this.$route.params.type + '/' + this.$route.params.id">Relation Graph>>></a>
                </el-col>
                <el-col class="column under_entry" v-if="academicEntityVO.authors!=null" :span="24">
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
                <el-col class="column under_entry" v-if="academicEntityVO.author==null&&academicEntityVO.affiliations!==null&&academicEntityVO.conferences!==null" :span="24">
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
            </el-col>
            <el-col class="column" v-if="academicEntityVO.affiliations!=null" :span="9">
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
            <el-col class="column" v-if="academicEntityVO.affiliations===null" :span="9">
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
            <el-col :span="9" id="cloud-wrap" v-if="academicEntityVO.terms.length>0">
              <strong>Terms Cloud: </strong>
              <div class="svg" id="cloud"></div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="22"  :offset="1" class="significantPaper_wrap">
          <strong class="significantPaper_title">Significant Papers</strong>
          <Card
          v-for="(significantPaper,index) in academicEntityVO.significantPapers"
          :key="index"
          :simple-paper-v-o="significantPaper"
          ></Card>
        </el-col>
      </el-row>
    </div>
  </div>
</div>
</template>

<script>
    import {getAcademicEntity} from "../api/api";
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
                typeDic: {"author":1, 'affiliation':2, 'issue':3, 'term': 4, 'paper':5},
                academicEntityVO: {terms:[]}
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
                    this.academicEntityVO = res;
                    let that = this;
                    setTimeout(function () {
                        if(res.terms&&res.terms.length > 0){
                            that.renderCloud();
                            loadingInstance.close();
                        }else{
                            loadingInstance.close();
                        }
                    },100)
                })
                .catch(()=>{
                    this.$alert('Fail to get entity，please search again', 'Tips',{
                        type: 'error',
                        confirmButtonText: 'confirm',
                        showClose: false
                    }).then(()=>{
                        window.location.href = '/home';
                    })
                });
        },
        methods: {
            toOtherEntity: function (type, id) {
                window.location.href='/entity/' + type + '/' + id;
            },
            renderCloud: function () {
                let data = this.academicEntityVO.terms;
                let maxHot = Math.max.apply(Math,data.map(item => { return item.hot }));
                console.log(data.length);
                let width = document.getElementById('cloud-wrap').offsetWidth;
                let height = data.length>100?400:300;
                let color = d3.scaleOrdinal(d3.schemeCategory10);
                let svg = d3.select('#cloud')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);


                const layout = d3_cloud()
                    .size([width, height])
                    .words(data)
                    .padding(5)
                    .rotate(function() {
                        return ~~(Math.random() * 2) * 45;
                    })
                    .font('Impact')
                    .fontSize(function(d) {
                        return 2+(d.hot+1)/(maxHot+1)*22;
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
                            return 2+(d.hot+1)/(maxHot+1)*22;
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

                    svg.selectAll('text') // 创建动画
                        .style('fill-opacity', 0)
                        .transition()
                        .duration(100)
                        .delay(function(d, i) {
                            return i * 100
                        })
                        .style('fill-opacity', 1);
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
  img{
    width:100%
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
    background-color: #b04c50;
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
    color: #409eff;
  }
  .under_entry{
    margin-top: 10px;
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
</style>
