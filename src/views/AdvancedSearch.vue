<template>
  <div>
    <div class="body_top">
      <div class="system-name-wrap">
        <span @click="goHome">OASIS</span>
      </div>
    </div>
    <div class="body_main">
      <div class="title">高级搜索</div>
      <div class="input-wrap">
        <div class="first">
          <el-dropdown trigger="click" @command="handleMode">
            <el-button class="mode-button" type="primary">
              {{searchModeInChinese[first.mode]}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="moreCommand('All', -1)">{{searchModeInChinese['All']}}</el-dropdown-item>
              <el-dropdown-item :command="moreCommand('Title', -1)">{{searchModeInChinese['Title']}}</el-dropdown-item>
              <el-dropdown-item :command="moreCommand('Author', -1)">{{searchModeInChinese['Author']}}</el-dropdown-item>
              <el-dropdown-item :command="moreCommand('Publication', -1)">{{searchModeInChinese['Publication']}}</el-dropdown-item>
              <el-dropdown-item :command="moreCommand('Keyword', -1)">{{searchModeInChinese['Keyword']}}</el-dropdown-item>
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
            <el-dropdown trigger="click" @command="handleMode">
              <el-button class="mode-button" type="primary">
                {{searchModeInChinese[item.mode]}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="moreCommand('All', index)">{{searchModeInChinese['All']}}</el-dropdown-item>
                <el-dropdown-item :command="moreCommand('Title', index)">{{searchModeInChinese['Title']}}</el-dropdown-item>
                <el-dropdown-item :command="moreCommand('Author', index)">{{searchModeInChinese['Author']}}</el-dropdown-item>
                <el-dropdown-item :command="moreCommand('Publication', index)">{{searchModeInChinese['Publication']}}</el-dropdown-item>
                <el-dropdown-item :command="moreCommand('Keyword', index)">{{searchModeInChinese['Keyword']}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown trigger="click" @command="handlePrefix">
              <el-button class="mode-button" type="primary">
                {{item.prefix}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="moreCommand('And', index)">And</el-dropdown-item>
                <el-dropdown-item :command="moreCommand('Or', index)">Or</el-dropdown-item>
                <el-dropdown-item :command="moreCommand('Not', index)">Not</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input
              class="first-input input"
              v-model="item.content"
              placeholder="请键入搜索内容...">
            </el-input>
          </div>
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
          mode: 'All',
          content: ''
        },
        more: [{
          mode: 'All',
          prefix: 'And',
          content: ''
        },{
          mode: 'All',
          prefix: 'And',
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
  }
  .mode-button{
    background-color: #ffffff;
    color: #000000;
  }
  .input{
    border: 1px solid #000000;
    border-radius: 4px;
    padding: 0 2px;
  }
  .first-input{
    width: 300px;
  }
</style>
