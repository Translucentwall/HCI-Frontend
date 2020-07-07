<template>
  <div style="text-align: center">
    <div class="body-top">
      <div class="img-wrap">
        <img src="../assets/background-new.jpg" alt="This is a background picture." />
      </div>
      <div class="system-name-wrap">
        <span>Online grAph System for academIcS</span>
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
          @keydown.13.native="search"
          @keydown.229="handleCN">
        </el-input>
        <el-button class="search-enter" @click="search">
          <i class="el-icon-search"></i>
        </el-button>
      </div>
    </div>
    <div class="body-bottom" v-if="displayBottom">
      <el-row>
        <el-col :span="23">
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item>Search</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="17" :offset="1">
          <div class="result-title-wrap">
            <div class="result-title">
              Results for <span class="emphasize content">{{resultTitleContent}}</span> in <span class="emphasize">{{resultTitleMode}}</span>:
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
              v-for="(item, index) in simplePaperVO"
              :key="index"
              :simple-paper-v-o="item"
            >
            </Card>
          </div>
          <el-button class="result-more" @click="loadMore">load more...</el-button>
        </el-col>
        <el-col :span="6" class="body-bottom-right">
          <RankList
            :size="tableSize"
            :mode="tableMode"
            :data="tableData"
            :page="1">
          </RankList>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Card from "../components/Card";
  import {search, getRank, searchable} from "../api/api"
  import RankList from "../components/RankList";
  import {Loading} from "element-ui";
  export default {
      name: 'Search',
      components: {RankList, Card},
      data(){
          return{
              displayBottom: false,
              mode: 'All',
              simplePaperVO: [],
              searchContent: '',
              currentPage: 1,
              sortMode: 'Relevance',
              resultTitleMode: '',
              resultTitleContent: '',
              tableSize: 'small',
              tableMode: '0',
              tableData: [],
              tableModeDic: {
                  'All': '1',
                  "Title": '1',
                  "Author": '2',
                  "Affiliation": '4',
                  "Publication": '5',
                  "Keyword": '6'
              },
              tableModeDic2: {
                  'All': 'Paper-Cited',
                  "Title": 'Paper-Cited',
                  "Author": 'Author-Paper',
                  "Affiliation": 'Affiliation-Paper',
                  "Publication": 'Publication-Paper',
                  "Keyword": 'Keyword-Paper'
              }
          }
      },
      mounted() {
          let loadingInstance = Loading.service({ fullscreen: true, text:'Server not available, please wait for a moment...'});
          searchable().then(res=>{
              if(res.success){
                  loadingInstance.close();
                  let content = this.$route.params.content;
                  if(content !== null && content !== ''){
                      this.searchBegin();
                  }else{
                      window.location.href = '/home';
                  }
              }
          });
      },
      watch:{
          sortMode: function(){
              this.searchBegin();
          }
      },
      methods: {
          handleMode(command) {
              this.mode = command;
          },
          handleSortMode(command) {
              this.sortMode = command;
          },
          searchBegin: function () {
              let content = this.$route.params.content;
              if (content !== null) {
                  this.searchContent = content;
                  this.mode = this.$route.params.mode;
              }

              this.currentPage = 1;

              this.simplePaperVO.length = 0;
              search(this.searchContent, this.mode, this.currentPage, this.sortMode, 10).then(res => {
                  this.simplePaperVO = res;
                  this.resultTitleMode = this.mode;
                  this.resultTitleContent = this.searchContent;
                  this.displayBottom = true;

                  this.tableMode = this.tableModeDic[this.mode];
                  let tableMode = this.tableModeDic2[this.mode];
                  getRank(tableMode, 1, true, 2013, 2019).then(res => {
                      this.tableData = res.content.rankList;
                  });

              });

          },
          search: function () {
              let blankPattern = /^( )*$/;
              if (blankPattern.test(this.searchContent)){
                  this.$message({
                      message:'请输入有效内容',
                      type: 'error',
                      duration: 2000
                  });
              }else {
                  let pattern = /[%\\/?#=]/;
                  if(pattern.test(this.searchContent)){
                      this.$message({
                          message:'Search content can\'t include %,\\,/,?,#,=',
                          type: 'error',
                          duration: 2000
                      });
                  }else{
                      window.location.href = '/search/'+this.mode+'/'+this.searchContent;
                  }
              }
          },
          loadMore: function () {
              this.currentPage += 1;
              search(this.searchContent, this.mode, this.currentPage, this.sortMode, 10).then(res => {
                  for (let result in res){
                      this.simplePaperVO.push(res[result]);
                  }
              });
          },
          handleCN: function () {
              console.log('我捕获了');
          }
      }
  }
</script>

<style scoped>
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
    /*box-shadow:0 0 50px 20px #ffffff inset;*/
  }
  img{
    width: 100%;
  }
  .system-name-wrap{
    position: absolute;
    top: 36px;
    left: 50px;
    font-family: 'Arial Rounded MT Bold', serif;
    font-size: 40px;
    color: #ffffff;
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
  .breadcrumb{
    margin-left: 50px;
  }
  .result-title-wrap{
    font-size: 24px;
    text-align: left;
    margin: 5px 0 0 20px;
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
  .body-bottom-right{
    border-left: 1px solid #ebeef5;
    padding: 0 30px 50px 8px;
  }
</style>
