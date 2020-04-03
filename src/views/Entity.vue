<template>
<div>
  <div class = "body_top">
    <div class="top-img">
      <img src="../assets/background-medium.jpg" alt="This is a background pic."/>
    </div>
  </div>
  <div class="body-bottom">
    <el-row>
      <el-col class="body-left" :span="10">
        <div>
          <el-col :span="8">
            <span>名字：{{academicEntityVO.name}}</span>
          </el-col>
          <el-col :span="8">
            <span>被引用数：{{academicEntityVO.refsum}}</span>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" round @click="todetail()">Entry</el-button>
          </el-col>
        </div>
        <div>
          <span>给词云占地儿</span>
<!--          cloud-->
        </div>
      </el-col>

<!--      <el-row>-->
<!--        <span>id:{{id}}</span>-->
        <el-col class="body-rank" v-if="academicEntityVO.authors!=null" :span="7">
          <ol>
<!--            <li v-for="n in 10">{{n}}</li>-->
                      <li v-for="author in academicEntityVO.authors">
                        {{author.name}}
                      </li>
          </ol>
        </el-col>
<!--      </el-row>-->

<!--      <el-row>-->
        <el-col class="body-rank" v-if="academicEntityVO.affilications!=null" :span="7">
          <ol>
<!--            <li v-for="n in 10">{{n}}</li>-->
                      <li v-for="affilication in academicEntityVO.affilications">
                        {{affilication.name}}
                      </li>
          </ol>
        </el-col>
<!--      </el-row>-->

<!--      <el-row>-->
        <el-col class="body-rank" v-if="academicEntityVO.conferences!=null" :span="7">
          <ol>
<!--            <li v-for="n in 10">{{n}}</li>-->
                      <li v-for="conference in academicEntityVO.conferences">
                        {{conference.name}}
                      </li>
          </ol>
        </el-col>
<!--      </el-row>-->

    </el-row>
    <div>
      <span>代表作</span>
<!--      representative work-->
      <ul>
        <li v-for="significantPaper in academicEntityVO.significantPapers">
          <Card></Card>
          {{significantPaper.title}}:{{significantPaper.author_simpleAffiliationVOS}}:{{significantPaper.publicationYear}}
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
  import {getAcademicEntity} from "../api/analogApi";
  import Card from "../components/Card";

  export default {
        name: "Entity",
    components: {Card},
    data(){
          return{
            id:0,
            type:0,
            simplePaperVO:{},
            academicEntityVO:{},

          }
      },
      mounted() {
        // this.id=this.$route.params.id;
        // this.type=this.$route.params.type;
        // getAcademicEntity(this.id,this.type).then(res => {
        //   if(res.success){
        //     window.scrollTo(0,0);
        //   }
        // }
        // );
        this.academicEntityVO=getAcademicEntity(1,1);
      },
      computed:{

      },
      methods:{
          todetail(){
            this.$router.push("/home");
          }

      }
    }
</script>

<style scoped>

</style>
