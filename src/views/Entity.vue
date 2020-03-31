<template>
<div>
  <div class = "body_top">
    <div class="top-img">
      <img src="../assets/background-medium.jpg" alt="This is a background pic."/>
    </div>
  </div>
  <div class="body-bottom">
    <el-row>
      <el-col class="body-left">
        <div>
          <span>{{academicEntityVO.name}}</span>
          <el-button type="primary" round>Entry</el-button>
        </div>
        <div>
<!--          cloud-->
        </div>
      </el-col>
      <el-col class="body-rank" v-if="academicEntityVO.authors!=null">
        <ul>
          <li v-for="author in academicEntityVO.authors">
            {{author.id}}:{{author.name}}
          </li>
        </ul>
      </el-col>
      <el-col class="body-rank" v-if="academicEntityVO.affiliations!=null">
        <ul>
          <li v-for="affiliation in academicEntityVO.affiliations">
            {{affiliation.id}}:{{affiliation.name}}
          </li>
        </ul>
      </el-col>
      <el-col class="body-rank" v-if="academicEntityVO.conferences!=null">
        <ul>
          <li v-for="conference in academicEntityVO.conferences">
            {{conference.id}}:{{conference.name}}
          </li>
        </ul>
      </el-col>
    </el-row>
    <div>
<!--      representative work-->
      <ul></ul>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "Entity",
      data(){
          return{
            simplePaperVO:{},
            academicEntityVO:{},

          }
      },
      mounted() {
      },
      computed:{

      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
