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
          @keydown.13.native="search"
          @keydown.229="handleCN">
        </el-input>
        <el-button class="search-enter" @click="search">
          <i class="el-icon-search"></i>
        </el-button>
      </div>
    </div>
    <div class="body-bottom">
      <el-row>
        <el-col :span="24">
          <strong class="rank-wrap-title">Hot Rank</strong>
        </el-col>
        <el-col :span="24">
          <el-row class="rank-wrap">
            <el-col :span="8" class="rank">
              <el-row>
                <el-col :span="24">
                  <strong>Author Hot Rank</strong>
                </el-col>
                <el-row v-for="(data, index) in authorTableData" :key="index">
                  <el-col :span="2">{{index+1}}</el-col>
                  <el-col :span="16" :offset="1"><span>{{data.name}}</span></el-col>
                  <el-col :span="4" :offset="1">index</el-col>
                </el-row>
              </el-row>
            </el-col>
            <el-col :span="8" class="rank">
              <el-col :span="24">
                <strong>Affiliation Hot Rank</strong>
              </el-col>
              <el-row v-for="(data, index) in affiliationTableData" :key="index">
                <el-col :span="2">{{index+1}}</el-col>
                <el-col :span="16" :offset="1"><span>{{data.name}}</span></el-col>
                <el-col :span="4" :offset="1">{{data.value}}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8" class="rank">
              <el-col :span="24">
                <strong>Term Hot Rank</strong>
              </el-col>
              <el-row v-for="(data, index) in termTableData" :key="index">
                <el-col :span="2">{{index+1}}</el-col>
                <el-col :span="16" :offset="1"><span>{{data.name}}</span></el-col>
                <el-col :span="4" :offset="1">{{data.value}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    import {getPopRank} from "../api/api";

    export default {
        name: "Home",
        data(){
            return{
                mode: 'All',
                searchContent: '',
                authorTableData: [],
                affiliationTableData: [],
                termTableData: []
            }
        },
        mounted(){
            getPopRank(1).then(res=>{
                this.authorTableData = res;
            });
            getPopRank(2).then(res=>{
                this.affiliationTableData = res;
            });
            getPopRank(3).then(res=>{
                this.termTableData = res;
            });
        },
        methods: {
            handleMode(command) {
                this.mode = command;
            },
            handleCN: function () {
                console.log('我捕获了');
            },
            search: function () {
                sessionStorage.setItem('searchMode', this.mode);
                sessionStorage.setItem('searchContent', this.searchContent);
                window.location.href = '/search';
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
  .search-enter{
    width: 4vw;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .el-icon-search{
    color: #ffffff;
  }
  .body-bottom{
    margin: 20px;
  }
  .rank-wrap-title{
    text-decoration: underline #b04c50;
    font-size: 36px;
  }
  .rank-wrap:last-child{
    border-right: 1px solid #cccccc;
  }
  .rank{
    margin: 40px 4px;
    padding: 0 4px;
    box-shadow: 6px 6px 20px 4px #e4e8ef;
    text-align: left;
  }
  span{
    overflow:hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
  }

</style>
