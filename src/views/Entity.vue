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
          <span>{{academicEntityVO.name}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="body_bottom_top" :span="22" offset="1">
          <el-row>
            <el-col class="body_top_left column" :span="9">
              <el-row>
                <el-col :span="9" :offset="3">
                  <span class="refSum" v-if="academicEntityVO.refSum >= 0">被引用数：{{academicEntityVO.refSum}}</span>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" round @click="toDetail">Entry</el-button>
                </el-col>
                <el-col :span="21" :offset="3">
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
          <span class="significantPaper_title">Significant Papers</span>
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
                simplePaperVO: {},
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
            toDetail: function(){
                window.location.href='/graph/' + this.$route.params.type + '/' + this.$route.params.id;
            },
            toOtherEntity: function (type, id) {
                window.location.href='/entity/' + type + '/' + id;
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
  .significantPaper_wrap{
    margin-top: 20px;
    text-align: left;
  }
  .significantPaper_title{
    color: #b04c50;
    font-size: 30px;
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
  }
</style>
