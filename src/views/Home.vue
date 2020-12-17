<template>
  <div class="bg" style="text-align: center">
    <div class="body-top">
      <div class="system-name-wrap">
        <div class="system-name">
          <span>Online grAph System&nbsp;</span><span>for academIcS</span>
        </div>
      </div>
      <Search></Search>
    </div>
  </div>
</template>

<script>
    import {getPopRank, searchable} from "../api/api";
    import {Loading} from "element-ui";
    import Search from "../components/Search";

    export default {
        name: "Home",
        components: {Search},
        data(){
            return{
                authorTableData: [],
                affiliationTableData: [],
                termTableData: []
            }
        },
        mounted(){
            let loadingInstance = Loading.service({ fullscreen: true, text:'Server not available, please wait for a moment...'});
            searchable().then(res=>{
                if(res.success){
                    getPopRank(1).then(res=>{
                        this.authorTableData = res;
                    });
                    getPopRank(2).then(res=>{
                        this.affiliationTableData = res;
                    });
                    getPopRank(4).then(res=>{
                        this.termTableData = res;
                    });
                    loadingInstance.close();
                }
            });
        }
    }
</script>

<style scoped>
  .bg{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background-image: url("../assets/teal_cube_background.jpg");
    background-repeat: no-repeat;
    background-color: #024349;
    background-size: cover;
  }
  .body-top{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    flex: 1 1;
    width: 100%;
  }
  .system-name{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;
    /*position: absolute;*/
    /*top: 20vh;*/
    /*left: 3vw;*/
    font-family: 'Arial Rounded MT Bold', serif;
    font-size: calc(1rem + 2.7vw);
    color: #ffffff;
    height: 38vh;
  }
  .body-top .search-wrap {
    /*top: 38vh;*/
    position: unset;
    left: unset;
    top: unset;
  }
  .body-bottom{
    margin: 30px 30px 60px;
  }
  .rank-wrap-title{
    text-decoration: underline #000000;
    font-size: 36px;
  }
  .rank{
    margin: 20px 0;
    padding: 10px 14px 30px 20px;
    box-shadow: 3px 3px 10px 3px #e4e8ef;
    text-align: left;
    color: #6d6d6d;
  }
  .rank-title{
    text-align: center;
    font-size: 24px;
    margin: 16px 0;
  }
  .rank-item{
    margin: 8px 0 0;
    color: #6d6d6d;
  }
  .data-name-column{
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
  }
  .data-name{
    color: #6d6d6d;
    text-decoration: none;
  }
  .data-name:hover{
    color: #409eff;
    text-decoration: underline;
  }

</style>
