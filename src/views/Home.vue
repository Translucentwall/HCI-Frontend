<template>
  <div style="text-align: center">
    <div class="body-top">
      <div class="img-wrap">
        <img src="../assets/background-new.jpg" alt="This is a background picture." />
      </div>
      <div class="search-wrap">
        <el-dropdown class="search-mode" trigger="click" @command="handleMode">
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
          <div class="result-title-wrap">
            <div class="result-title">
              Show results for <span class="emphasize content">{{resultTitleContent}}</span> in <span class="emphasize">{{resultTitleMode}}</span>:
            </div>
            <div class="sort-mode-wrap">
              <span class="sort-mode-before">sort by:</span>
              <el-dropdown class="sort-mode" trigger="click" @command="handleSortMode">
                <el-button class="sort-mode-button" type="primary">
                  {{sortMode}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="Relevance">Relevance</el-dropdown-item>
                  <el-dropdown-item command="Newest">Newest</el-dropdown-item>
                  <el-dropdown-item command="Oldest">Oldest</el-dropdown-item>
                  <el-dropdown-item command="Title A-Z">Title A-Z</el-dropdown-item>
                  <el-dropdown-item command="Title Z-A">Title Z-A</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>

          <div class="result-content">
            <Card
              v-for="(item, index) in results"
              :key="index"
              :title="item.title"
              :author="item.author"
              :affiliation="item.affiliation"
              :publication="item.publication"
              :keywords="item.keywords"
              v-on:search="search"
            >
            </Card>
          </div>
          <el-button class="result-more">load more...</el-button>
        </el-col>
        <el-col :span="5">
          <RankList
            :size="tableSize"
            :mode="tableMode"
            :data="tableData">
          </RankList>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Card from "../components/Card";
  import {searchPaper, getRank} from "../api/api"
  import RankList from "../components/RankList";
  export default {
      components: {RankList, Card},
      data(){
          return{
              displayBottom: false,
              mode: 'All',
              results: [],
              searchContent: '',
              currentPage: 1,
              sortMode: 'Relevance',
              resultTitleMode: '',
              resultTitleContent: '',
              tableSize: 'small',
              tableMode: '0',
              tableData: []
          }
      },
      mounted() {
          let content = sessionStorage.getItem('searchContent');
          if(content !== null){
              this.search();
          }
      },
      methods: {
          handleMode(command) {
              this.mode = command;
          },
          handleSortMode(command) {
              this.sortMode = command;
          },
          search(){
              let content = sessionStorage.getItem('searchContent');
              if(content !== null){
                  this.searchContent = content;
                  this.mode = sessionStorage.getItem('searchMode');
                  sessionStorage.removeItem('searchContent');
                  sessionStorage.removeItem('searchMode');
              }
              this.results = searchPaper(this.searchContent, this.mode, this.currentPage, this.sortMode);
              this.resultTitleMode = this.mode;
              this.resultTitleContent = this.searchContent;
              switch (this.mode) {
                  case "All": {
                      this.tableMode = '1';
                      break;
                  }
                  case "Title": {
                      this.tableMode = '1';
                      break;
                  }
                  case "Author": {
                      this.tableMode = '2';
                      break;
                  }
                  case "Affiliation": {
                      this.tableMode = '4';
                      break;
                  }
                  case "Publication": {
                      this.tableMode = '5';
                      break;
                  }
                  case "Keyword": {
                      this.tableMode = '6';
                      break;
                  }
                  default: {
                      this.tableMode = '1';
                      break;
                  }
              }
              this.tableData = getRank().rankList;
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
  .result-title-wrap{
    font-size: 24px;
    text-align: left;
    margin: 0 0 5px 20px;
    display: flex;
    justify-content: space-between;
    line-height: 48px;
  }
  .result-title{
    display: flex;
  }
  .sort-mode-before{
    font-size: 15px;
    font-weight: bold;
  }
  .sort-mode{
    margin-right: 50px;
  }
  .sort-mode-button{
    color: #000000;
    background-color: #ffffff;
    border: 0;
  }
  .sort-mode-button:hover{
    color: #000000;
    background-color: #ffffff;
    border: 0;
  }
  .sort-mode-button:focus{
    color: #000000;
    background-color: #ffffff;
    border: 0;
  }
  .result-content{
    margin-bottom: 30px;
  }
  .result-more{
    padding-left: 15px;
    padding-right: 15px;
  }
  .emphasize{
    color: #b04c50;
    margin: 0 8px;
  }
  .content{
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
