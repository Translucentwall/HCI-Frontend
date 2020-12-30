<template>
  <div>
    <div class="body_top">
      <div class="system-name-wrap">
        <span @click="goHome">OASIS</span>
      </div>
    </div>
    <div class="body_main">
      <div class="main-wrap">
        <div class="title">高级搜索</div>
        <div class="input-wrap">
          <div class="first">
            <el-dropdown class="first-mode" trigger="click" @command="handleMode">
              <el-button class="mode-button" type="primary">
                {{searchModeInChinese[first.mode]}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="moreCommand('Title', -1)">{{searchModeInChinese['Title']}}</el-dropdown-item>
                <el-dropdown-item :command="moreCommand('Author', -1)">{{searchModeInChinese['Author']}}</el-dropdown-item>
                <el-dropdown-item :command="moreCommand('Publication', -1)">{{searchModeInChinese['Publication']}}</el-dropdown-item>
                <el-dropdown-item :command="moreCommand('Keyword', -1)">{{searchModeInChinese['Keyword']}}</el-dropdown-item>
                <el-dropdown-item :command="moreCommand('Year', -1)">{{searchModeInChinese['Year']}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input
              class="first-input input"
              v-model="first.content"
              placeholder="请键入搜索内容...">
            </el-input>
          </div>
          <div class="more">
            <div class="more-line" v-for="(item, index) in more" :key="index">
              <el-dropdown class="more-mode" trigger="click" @command="handleMode">
                <el-button class="mode-button" type="primary">
                  {{searchModeInChinese[item.mode]}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="moreCommand('Title', index)">{{searchModeInChinese['Title']}}</el-dropdown-item>
                  <el-dropdown-item :command="moreCommand('Author', index)">{{searchModeInChinese['Author']}}</el-dropdown-item>
                  <el-dropdown-item :command="moreCommand('Publication', index)">{{searchModeInChinese['Publication']}}</el-dropdown-item>
                  <el-dropdown-item :command="moreCommand('Keyword', index)">{{searchModeInChinese['Keyword']}}</el-dropdown-item>
                  <el-dropdown-item :command="moreCommand('Year', -1)">{{searchModeInChinese['Year']}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown class="more-prefix" trigger="click" @command="handlePrefix">
                <el-button class="prefix-button" type="primary">
                  {{item.prefix}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="moreCommand('AND', index)">And</el-dropdown-item>
                  <el-dropdown-item :command="moreCommand('OR', index)">Or</el-dropdown-item>
                  <el-dropdown-item :command="moreCommand('NOT', index)">Not</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-input
                class="more-input input"
                v-model="item.content"
                placeholder="请键入搜索内容...">
              </el-input>
              <i v-if="index>0" class="el-icon-circle-close" style="color: #ff6347" @click="deleteLine(index)"></i>
              <i v-if="index===more.length-1" class="el-icon-circle-plus-outline" style="color: #055" @click="addLine(index)"></i>
            </div>
          </div>
        </div>
        <div class="option-wrap">
          <el-button class="reset" @click="reset">重置</el-button>
          <el-button class="search" @click="search">搜索</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from '../components/Search'
  export default {
    name: "AdvanceSearch",
    data(){
      return{
        searchModeInChinese:Search.data().searchModeInChinese,
        first: {
          mode: 'Title',
          content: ''
        },
        more: [{
          mode: 'Title',
          prefix: 'AND',
          content: ''
        },{
          mode: 'Title',
          prefix: 'AND',
          content: ''
        }]
      }
    },
    methods: {
      goHome: function(){
        window.location.href = '/home';
      },
      handleMode: function(command) {
        if(command.index===-1){
          this.first.mode = command.command;
        } else{
          this.more[command.index].mode = command.command;
        }
      },
      handlePrefix: function(command) {
        if(command.index===-1){
          this.first.prefix = command.command;
        } else{
          this.more[command.index].prefix = command.command;
        }
      },
      moreCommand: function (command, index) {
        return{
          'command': command,
          'index': index
        }
      },
      addLine: function(){
        this.more.push({
          mode: 'Title',
          prefix: 'AND',
          content: ''
        })
      },
      deleteLine: function (index) {
        console.log(1)
        this.more.splice(index, 1);
        console.log(this.more)
      },
      reset: function () {
        this.first.mode = 'Title';
        this.first.content = '';
        this.more.forEach(function (item) {
          item.mode = 'Title';
          item.prefix = 'AND';
          item.content = '';
        })
      },
      search: function () {
        let loc = '/search/Advanced/';
        if(this.first.content !== ''){
          loc = loc + this.first.mode + ':' + this.first.content;
        }
        this.more.forEach(function (item) {
          if(loc === '/search/Advanced/'&&item.content !== ''){
            loc = loc + item.mode + ':' + item.content;
          }else if(loc !== '/search/Advanced/'&&item.content !== ''){
            loc = loc + ' '+ item.prefix + ' ' + item.mode + ':' + item.content;
          }
        })
        if(loc === '/search/Advanced/'){
          this.$message({
            message: '请输入有效搜索内容',
            type: 'error',
            duration: 2000
          })
        }else{
          window.location.href = loc;
        }
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
  .body_main{
    text-align: left;
    display: flex;
    justify-content: center;
  }
  .main-wrap{
    width: 750px;
  }
  .title{
    margin-top: 10px;
    font-size: 24px;
  }
  .first{
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .more-line{
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  .more-line:last-child{
    margin-bottom: 20px;
  }
  .first-mode{
    margin-right: 40px;
  }
  .more-mode{
    margin-right: 40px;
  }
  .more-prefix{
    margin-right: 40px;
  }
  .mode-button{
    background-color: #055;
    width: 164px;
    border: none;
  }

  .prefix-button{
    background-color: #055;
    width: 100px;
    border: none;
  }
  .input{
    border: 2px solid #c4c7ce;
    border-radius: 4px;
    padding: 0 2px;
  }
  .first-input{
    width: 440px;
  }
  .more-input{
    width: 300px;
  }
  .el-icon-circle-close{
    margin-left: 20px;
    font-size: 34px;
    cursor: pointer;
  }
  .el-icon-circle-plus-outline{
    margin-left: 10px;
    font-size: 34px;
    cursor: pointer;
  }
  .option-wrap{
    text-align: right;
    margin-bottom: 100px;
  }
  .reset{
    background-color: #B04C50;
    border: none;
  }
  .search{
    background-color: #245;
    border: none;
  }
</style>
