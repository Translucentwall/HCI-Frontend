<template>
  <div>
    <div class="body_top">
      <div class="system-name-wrap">
        <span @click="goHome">OASIS</span>
      </div>
    </div>
    <relation-graph v-if="id!==0" :eid="id" :etype="type" :size="size"></relation-graph>
    <el-tooltip class="tip" effect="light">
      <div slot="content">
        1. 点击节点可以跳转到相应关系图页面<br>
        2. 长按节点可以拖拽<br>
        3. 实线代表节点间存在热度关系<br>
        4. 实线线条越粗代表热度值越大<br>
        5. 虚线代表节点间无热度关系<br>
        6. 勾选“显示完整关系图”可查看完整关系图<br>
        7. 筛选框输入内容能够高亮对应的节点
      </div>
      <i class="el-icon-question graph-helper"></i>
    </el-tooltip>
  </div>
</template>
<script>
    import * as d3 from 'd3'
    import {getGraph, getMoreGraph} from "../api/api";
    import {Loading} from "element-ui";
    import RelationGraph from "../components/RelationGraph";

    export default {
        name: 'Graph',
        data(){
            return {
                id: 0,
                type: 1,
                size: 'large',
                typeDic: {"author":1, 'affiliation':2, 'issue':3, 'term': 4, 'paper':5},
            }
        },
        components: {RelationGraph},
        mounted () {
            this.id = parseInt(this.$route.params.id);
            this.type = this.typeDic[this.$route.params.type];
            if (this.id === undefined || this.type === undefined) {
              window.location.href = '/home';
            }
        },
        methods: {
            goHome: function(){
                window.location.href = '/home';
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
    position: fixed;
    z-index: 200;
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
  #svgContainer{
    width: 100%;
    height: 100%;
  }
  #forceDirected{
    width: 100%;
  }
  .every{
    /*margin:15px;*/
    float: left;
    position: relative;
  }
  .svg{
    /*border: 1px solid #cccccc;*/
  }
  .option{
    position: absolute;
    top: 0;
    left: 20px;
    text-align: left;
    min-width: 160px;
  }
  .option_name{
    margin-left: 0.5ex;
  }
  .option .el-input__inner{
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 14px;
    height: 24px;
    padding: 0 5px;
  }
  .search-input{
    width: 16vw;
  }
  .graph-helper{
    position: fixed;
    top:40px;
    right:20px;
    font-size: x-large;
  }
  .center_name{
    color: #000000;
  }
  .center_name:hover{
    color: #409eff;
  }
  .author{
    color: rgb(214, 39, 40);
  }
  .affiliation{
    color: rgb(255, 127, 14);
  }
  .issue{
    color: rgb(214, 214, 8);
  }
  .term{
    color: rgb(44, 160, 44);
  }
  .paper{
    color: rgb(31, 119, 180);
  }
  .tip{
    position: fixed;
    top: 60px;
    right: 20px;
  }
</style>
