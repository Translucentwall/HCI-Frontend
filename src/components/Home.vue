<template>
  <div style="text-align: center">
    <div class="body-top">
      <div class="img-wrap">
        <img src="../assets/background-new.jpg" alt="This is a background picture." />
      </div>
      <div class="search-wrap">
        <el-dropdown class="search-mode" trigger="click" @command="handleCommand">
          <el-button class="mode-button" type="primary">
            {{mode}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="All">All</el-dropdown-item>
            <el-dropdown-item command="Title">Title</el-dropdown-item>
            <el-dropdown-item command="Author">Author</el-dropdown-item>
            <el-dropdown-item command="Affiliation">Affiliation</el-dropdown-item>
            <el-dropdown-item command="Publication">Publication</el-dropdown-item>
            <el-dropdown-item command="Keyword">Keyword</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-input
          class="search-input"
          v-model="searchContent"
          placeholder="Please input the search content..."
          @keyup.enter.native="search">
        </el-input>
        <el-button class="search-enter" @click="search">
          <i class="el-icon-search"></i>
        </el-button>
      </div>
    </div>
    <div class="body-bottom" v-if="displayBottom">
      <el-row>
        <el-col :span="19">
          <div class="result-title">
            Show results for <span class="emphasize">{{resultTitleContent}} </span> in <span class="emphasize">{{resultTitleMode}}</span>:
          </div>
          <Card
            v-for="item in results"
            :key="item" :title="item.title"
            :author="item.author"
            :publisher="item.publisher"
            :publication="item.publication"
            :keywords="item.keywords">
          </Card>
        </el-col>
        <el-col :span="5">
          <RankList
            :title="tableTitle"
            :name="tableName"
            :rank="tableValueName"
            :data="tableData">
          </RankList>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Card from "./Card";
  import {searchPaper} from  "../api/api"
  import RankList from "./RankList";
  export default {
      components: {RankList, Card},
      data(){
          return{
              displayBottom: false,
              mode: 'All',
              results: [],
              searchContent: '',
              currentPage: 1,
              sortMode: '',
              resultTitleMode: '',
              resultTitleContent: '',
              tableTitle: 'Rank of authors by paper',
              tableName: 'name',
              tableValueName: 'rank',
              tableData: [{
                  rank: '1',
                  name: '小虎'
              }, {
                  rank: '2',
                  name: '小明'
              }, {
                  rank: '3',
                  name: '小狗'
              }, {
                  rank: '4',
                  name: '小龙'
              }]
          }
      },
      mounted() {
          // this.results = search();
      },
      methods: {
          handleCommand(command) {
              this.mode = command;
          },
          search(){
              this.results = searchPaper(this.searchContent, this.mode, this.currentPage, this.sortMode);
              this.resultTitleMode = this.mode;
              this.resultTitleContent = this.searchContent;
              this.displayBottom = true;
              setTimeout(function () {
                  window.scrollTo(100,700);
              }, 100);
          }
      }
  }
</script>

<style>
  .background{
    width: 100%;
    height: 50%;
  }
  .body-top{
    position: relative;
  }
  .img-wrap:after{
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow:0 0 50px 20px #ffffff inset;
  }
  img{
    width: 100%;
  }
  .search-wrap{
    position: absolute;
    top: 40%;
    left: 27vw;
    display: flex;
    border: 2px solid #ffffff;
    border-radius: 4px;
  }
  .search-mode{
    width: 10vw;
  }
  .mode-button{
    width: 10vw;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .search-input{
    width: 30vw;
  }
  .el-input__inner{
    border-radius: 0;
    border: 0;
  }
  .search-enter{
    width: 4vw;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .el-icon-search{
    color: #ffffff;
  }
  .body-bottom{
    margin: 10px 0 100px;
  }
  .result-title{
    font-size: 24px;
    text-align: left;
    margin: 0 0 5px 20px;
  }
  .emphasize{
    color: #b04c50;

  }
</style>
