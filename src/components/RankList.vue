<template>
  <div>
    <div class="table-title">
      <span>{{title}}</span>
    </div>
    <el-table
      :data="data"
    >
      <el-table-column
        prop="name"
        :label="name"
        width="130">
      </el-table-column>
      <el-table-column
        prop="rank"
        :label="rank"
        width="105">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "RankList",
        data(){
            return{
            }
        },
        props:{
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            rank: {
                type: String,
                default: ''
            },
            data: {
                type: Array,
                default: () => {}
            }
        }
    }
</script>

<style scoped>

</style>
