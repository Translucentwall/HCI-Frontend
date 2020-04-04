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
            <el-col class="body_top_left column" :span="9">
              <el-row>
                <el-col :span="9">
                  <div class="reference citation_box" :style="{opacity: academicEntityVO.refSum<0?'0':'1'}">
                    <div class="citation_title">Reference</div>
                    <div class="citation_count">{{academicEntityVO.refSum}}</div>
                  </div>
                </el-col>
                <el-col :span="12" :offset="3">
                  <a class="graph_entry" type="primary" :href="'/graph/' + this.$route.params.type + '/' + this.$route.params.id">Relation Graph>>></a>
                </el-col>
                <el-col :span="24">
                  <span>给词云占地儿</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="column" v-if="academicEntityVO.authors!=null" :span="6">
              <strong>Authors:</strong>
              <div class="list">
                <!--              <ol>-->
                <!--                <li v-for="author in academicEntityVO.authors">{{author.name}}</li>-->
                <!--              </ol>-->

                <el-tag
                  v-for="author in academicEntityVO.authors"
                  :key="author.id"
                  :type="author.name"
                  @click="toOtherEntity('author', author.id)"
                >
                  {{author.name}}
                </el-tag>
              </div>
            </el-col>
            <el-col class="column" v-if="academicEntityVO.affiliations!=null" :span="9">
              <strong>Affiliations:</strong>
              <!--            <el-row justify="space-around">-->
              <!--              <el-col v-for="(affiliation,index) in academicEntityVO.affiliations" :key="index">-->
              <!--                <el-tag>{{affiliation.name}}</el-tag>-->
              <!--              </el-col>-->
              <!--            </el-row>-->
              <div class="list">
                <!--              <ol>-->
                <!--                <li v-for="affiliation in academicEntityVO.affiliations">{{affiliation.name}}</li>-->
                <!--              </ol>-->
                <el-tag
                  v-for="affiliation in academicEntityVO.affiliations"
                  :key="affiliation.id"
                  :type="affiliation.name"
                  @click="toOtherEntity('affiliation', affiliation.id)"
                >
                  {{affiliation.name.length>30?affiliation.name.substr(0,30)+'...':affiliation.name}}
                </el-tag>
              </div>
            </el-col>
            <el-col class="column" v-if="academicEntityVO.conferences!=null" :span="6">
              <strong>Issues:</strong>
              <div class="list">
                <!--              <ol>-->
                <!--                <li v-for="conference in academicEntityVO.conferences">{{conference.name}}</li>-->
                <!--              </ol>-->
                <el-tag
                  v-for="conference in academicEntityVO.conferences"
                  :key="conference.id"
                  :type="conference.name"
                  @click="toOtherEntity('issue', conference.id)"
                >
                  {{conference.name}}
                </el-tag>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="22"  :offset="1" class="significantPaper_wrap">
          <strong class="significantPaper_title">Significant Papers</strong>
    <!--      representative work-->
    <!--      <ul>-->
    <!--        <li v-for="significantPaper in academicEntityVO.significantPapers">-->
    <!--          {{significantPaper.title}}:{{significantPaper.author_simpleAffiliationVOS}}:{{significantPaper.publicationYear}}-->
    <!--        </li>-->
    <!--      </ul>-->
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

    export default {
        name: "Entity",
        components: {Card},
        data(){
            return{
                id: 0,
                type: 0,
                typeDic: {"author":1, 'affiliation':2, 'issue':3, 'term': 4, 'paper':5},
                academicEntityVO: {},
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
                    window.scrollTo(0,0);
                    loadingInstance.close();
                })
                .catch(()=>{
                    this.$alert('Fail to get entity，please search again', 'Tips',{
                        type: 'error',
                        confirmButtonText: 'confirm'
                    }).then(()=>{
                        window.location.href = '/home';
                    })
                });
        },
        methods: {
            toOtherEntity: function (type, id) {
                window.location.href='/entity/' + type + '/' + id;
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
  .graph_entry{
    color: #409eff;
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
  }
  .el-tag:hover{
    color: #000000;
    text-decoration: underline;
  }
</style>
