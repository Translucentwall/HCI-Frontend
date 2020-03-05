<template>
  <div class="rank-list">
    <div :class="size" v-model="mode">
      <span>{{title}}</span>
      <a v-if="size==='small'" :href="to">>>></a>
    </div>
    <div v-if="size==='large'" style="display: flex;margin: 20px 30px 0 12px">
      <span style="font-weight: bold;font-size: 20px">Year:</span>
      <div style="margin: -2px 30px 15px 30px">
        <vue-slider
          v-model="year"
          :width="600"
          :min="2013"
          :max="2019"
          :interval="1"
          :lazy="true"
          :marks="true"
          :drag-on-click="true"
          :process-style="{ backgroundColor: '#b04c50' }"
          :tooltip-style="{ backgroundColor: '#b04c50', borderColor: '#b04c50' }">
          <template v-slot:dot="{ value, focus }">
            <div :class="['custom-dot', { focus }]"></div>
          </template>
          <template v-slot:step="{ label, active }">
            <div :class="['custom-step', { active }]"></div>
          </template>
        </vue-slider>
      </div>
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
                column1: 700,
                column2: 0,
                sortable: 'custom',
                year: [2013,2019],
                yearData: [2013, 2014, 2015, 2016, 2017, 2018, 2019]
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
            mode: 'change',
            year: function () {
                this.$emit('changeYear', this.year);
            }
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
  .large{
    padding: 24px 0 18px 0;
    font-size: 30px;
    font-weight: bold;
  }
  .custom-dot {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-color: #b04c50;
    transition: all .3s;
  }
  .custom-dot:hover {
    transform: rotateZ(45deg);
  }
  .custom-dot.focus {
    border-radius: 50%;
  }
  .custom-step {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 0 3px #ccc;
    background-color: #ffffff;
  }
  .custom-step.active {
    box-shadow: 0 0 0 3px #b04c50;
    background-color: #ffffff;
  }
</style>
