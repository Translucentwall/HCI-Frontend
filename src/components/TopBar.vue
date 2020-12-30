<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="topBar"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#000000"
    >
      <el-menu-item class="home" index="/home" style="border-bottom-color: #c4c7ce">主页</el-menu-item>
    </el-menu>
    <div class="search">
      <SearchInTopBar
        :search-mode="searchMode"
        :search-content="searchContent"></SearchInTopBar>
      <div class="advanced-entry" @click="goAdvancedSearch">高级搜索</div>

    </div>
  </div>
</template>

<script>
    import SearchInTopBar from "./SearchInTopBar";
    export default {
        name: "TopBar",
      components: {SearchInTopBar},
      data() {
            return {
                activeIndex: '1'
            };
        },
      props: {
        searchMode: {
          type: String,
          default: null
        },
        searchContent: {
          type: String,
          default: null
        }
      },
        mounted(){
            let path = this.$route.path;
            let mode = window.location.href.split('mode=');
            if (mode.length > 1 && mode[1] !== ''){
                path = path + '?mode=' + mode[1][0];
            }
            this.activeIndex = path;
        },
        watch: {
            $route: function () {
                let path = this.$route.path;
                if (path!=='/home') {
                    let mode = window.location.href.split('mode=');
                    if (mode.length > 1 && mode[1] !== '') {
                        path = path + '?mode=' + mode[1][0];
                    }
                }
                this.activeIndex = path;
            }
        },
        methods: {
          handleSelect(key, keyPath) {
            window.location.href = keyPath[keyPath.length - 1];
            // this.$router.push(url).catch(err =>{
            //   console.log(err);
            // });
          },
          goAdvancedSearch: function(){
            window.location.href = '/search/advanced'
          }
        }

    }
</script>

<style scoped>
  .topBar{
    background-color: transparent;
    height: auto;
    display: flex;

  }
  .topBar .home{
    width: 7%;
    height: auto;
    /*line-height: 45px;*/
    margin: 0 1rem;
    border: 2px solid #c4c7ce;
    border-radius: 7px;
    color: #ffffff;
  }
  .topBar .home:hover{
    background: #066;
    color: #ffffff;
  }
  .admin{
    width: 10%;
  }
  .option{
    position: absolute;
    top: 9px;
    left: 20px;
  }
  .option-item{
    color: #909399;
    text-decoration: none;
  }
  .option-item:hover{
    color: #000000;
    text-decoration: underline;
  }
  .advanced-entry{
    margin: 20px 0 0 16px;
    color: #ffffff;
    text-align: right;
    cursor: pointer;
  }
  .advanced-entry:hover{
    text-decoration: underline;
  }
  .search{
    position: absolute;
    top: 15px;
    left: 154px;
  }
</style>
