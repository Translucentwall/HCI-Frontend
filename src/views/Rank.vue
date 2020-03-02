<template>
  <div>
    <div class="body-top">
      <div class="top-img">
        <img src="../assets/background-medium.jpg" alt="This is a background pic."/>
      </div>
    </div>
    <div class="body-bottom">
      <el-row>
        <el-col :span="6" class="rank-select-wrap">
          <el-menu
            :default-active="tableMode"
            class="el-menu-demo"
            mode="vertical"
            @select="handleSelect"
            active-text-color="#b04c50"
          >
            <el-menu-item index="1"><div class="rank-select-item">Rank of Paper by Cited</div><div><i class="el-icon-arrow-right"></i></div></el-menu-item>
            <el-menu-item index="2"><div class="rank-select-item">Rank of Author by Paper</div><div><i class="el-icon-arrow-right"></i></div></el-menu-item>
            <el-menu-item index="3"><div class="rank-select-item">Rank of Author by Cited</div><div><i class="el-icon-arrow-right"></i></div></el-menu-item>
            <el-menu-item index="4"><div class="rank-select-item">Rank of Affiliation by Paper</div><div><i class="el-icon-arrow-right"></i></div></el-menu-item>
            <el-menu-item index="5"><div class="rank-select-item">Rank of Publication by Paper</div><div><i class="el-icon-arrow-right"></i></div></el-menu-item>
            <el-menu-item index="6"><div class="rank-select-item">Rank of Keyword by Paper</div><div><i class="el-icon-arrow-right"></i></div></el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="17">
          <div class="body-bottom-right">
            <span class="demonstration">
              <RankList
                :size="tableSize"
                :mode="tableMode"
                :data="tableData"
              >
              </RankList>
            </span>
            <el-pagination
              @current-change="showRank"
              :current-page="currentPage"
              :page-size="1"
              layout="total, prev, pager, next, jumper"
              :total="totalPage">
            </el-pagination>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
    import RankList from "../components/RankList";
    import {getRank} from "../api/api";
    export default {
        name: "Rank",
        components: {RankList},
        data(){
            return{
                tableSize: 'large',
                tableMode: '0',
                tableData: [],
                tableDescending: true,
                currentPage: 1,
                totalPage: 0
            }
        },
        mounted() {
            let mode = window.location.href.split('mode=');
            if (mode.length > 1 && mode[1] !== '') {
                this.tableMode = mode[1][0];
            }else{
                this.tableMode = '1';
            }
            this.tableData = getRank().rankList;
            this.totalPage = getRank().totalPage;
            setTimeout(function () {
                let ascending = document.getElementsByClassName('ascending')[0];
                ascending.addEventListener('click', (e)=>{
                    console.log(e);
                }, false)
                console.log(ascending);
            }, 100);
        },
        methods: {
            handleSelect: function(key, keyPath) {
                this.$router.push('/rank?mode=' + key).catch(err =>{
                    console.log(err);
                });
                this.tableMode = key;
            },
            showRank: function(){
                let mode;
                switch (this.tableMode) {
                    case "1": {
                        mode = 'Paper-Cited';
                        break;
                    }
                    case "2": {
                        mode = 'Author-Paper';
                        break;
                    }
                    case "3": {
                        mode = 'Author-Cited';
                        break;
                    }
                    case "4": {
                        mode = 'Affiliation-Paper';
                        break;
                    }
                    case "5": {
                        mode = 'Publication-Paper';
                        break;
                    }
                    case "6": {
                        mode = 'Keyword-Paper';
                        break;
                    }
                }
                getRank(mode, this.currentPage, this.tableDescending);
                let ascending = document.getElementsByClassName('ascending')[0];
                console.log(ascending);
            }
        }
      }
</script>

<style scoped>
  img{
    width:100%
  }
  .rank-select-wrap{
    /*margin-top: 100px;*/
  }
  .el-menu{
    padding: 50px 0;
  }
  .el-menu-item{
    text-align: left;
    overflow: hidden;
    margin: 0 0 0 90px;
    border-right: 2px solid #ffffff;
    color: #909399;
    display: flex;
    justify-content: space-between;
  }
  .el-menu-item:hover{
    background-color: #ffffff;
    color: #000000;
  }
  .el-menu-item:focus{
    background-color: #ffffff;
  }
  .is-active{
    border-right: 2px solid #b04c50;
  }
  .rank-select-item{
    font-size: 16px;
  }
  i{
    margin-bottom: 4px;
  }
  .body-bottom-right{
    margin:0 0 50px 4vw;
  }
</style>
