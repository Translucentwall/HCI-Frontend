<template>
  <div class="rank-list">
    <div class="table-title" v-model="mode">
      <span>{{title}}</span>
      <a v-if="size==='small'" :href="to">>>></a>
    </div>
    <el-table
      :data="data"
      size="medium"
    >
      <el-table-column
        v-if="size!=='small'"
        type="index"
        label="Rank"
        :width="60">
      </el-table-column>
      <el-table-column
        key="column1"
        prop="name"
        :label="name"
        :width="column1">
      </el-table-column>
      <el-table-column
        :sortable="sortable"
        prop="value"
        :label="rankName"
        :width="column2">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "RankList",
        data(){
            return{
                to: '',
                title: '',
                name: '',
                rankName: '',
                column1: 0,
                column2: 0,
                sortable: 'custom'
            }
        },
        props:{
            size: {
                type: String,
                default: 'large'
            },
            mode: {
                type: String,
                default: ''
            },
            data: {
                type: Array,
                default: () => {}
            }
        },
        mounted(){
            if(this.size === 'small'){
                this.column1 = 120;
                this.column2 = 150;
                this.sortable = false;
            }
            this.change(this.mode);
        },
        watch: {
            mode: 'change'
        },
        methods: {
            change: function(value){
                switch (value) {
                    case '1': {
                        this.title = 'Rank of Paper by Cited';
                        this.name = 'Title';
                        this.rankName = 'Cited Number';
                        this.to = '/rank?mode=1';
                        break;
                    }
                    case '2': {
                        this.title = 'Rank of Author by Paper';
                        this.name = 'Author';
                        this.rankName = 'Paper Number';
                        this.to = '/rank?mode=2';
                        break;
                    }
                    case '3': {
                        this.title = 'Rank of Author by Cited';
                        this.name = 'Author';
                        this.rankName = 'Cited Number';
                        this.to = '/rank?mode=3';
                        break;
                    }
                    case '4': {
                        this.title = 'Rank of Affiliation by Paper';
                        this.name = 'Affiliation';
                        this.rankName = 'Paper Number';
                        this.to = '/rank?mode=4';
                        break;
                    }
                    case '5': {
                        this.title = 'Rank of Publication by Paper';
                        this.name = 'Publication';
                        this.rankName = 'Paper Number';
                        this.to = '/rank?mode=5';
                        break;
                    }
                    case '6': {
                        this.title = 'Rank of Keyword by Paper';
                        this.name = 'Keyword';
                        this.rankName = 'Paper Number';
                        this.to = '/rank?mode=6';
                        break;
                    }
                    default: {
                        this.title = 'Rank of Paper by Cited';
                        this.name = 'Name';
                        this.rankName = 'Cited Number';
                        this.to = '/rank?mode=1';
                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped>
  a{
    font-size: 12px;
    color: #409eff;
    text-decoration-line: underline;
  }
  .rank-list{
    padding-top: 16px;
  }
  .disappear{
    display: none;
  }
</style>
