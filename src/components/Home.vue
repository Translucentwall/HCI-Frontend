<template>
  <div style="text-align: center">
    <div v-for="item in results">
      <Card :title="item.title" :author="item.author" :publisher="item.publisher" :publication="item.publication" :keywords="item.keywords"></Card>
    </div>
  </div>
</template>

<script>
  import Card from "./Card";
  import {search} from  "../api/api"
  export default {
    components: {Card},
    data(){
      return{
        results: []
      }
    },
    mounted() {
      this.results = search();
    }
  }
</script>

<style>
  .el-menu{
    text-align: center;
  }
</style>
