<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="topBar"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#000000"
    >
      <el-menu-item class="home" index="/home" :style="{margin: this.$route.path==='0 0 0 0'}">主页</el-menu-item>
      <SearchInTopBar></SearchInTopBar>
    </el-menu>
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
                //     console.log(err);
                // });
            }
        }

    }
</script>

<style scoped>
  .topBar{
    background-color: transparent;
    height: auto;
  }
  .topBar .home{
    width: 10%;
    height: auto;
    line-height: 45px;
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
</style>
